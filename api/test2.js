  update: async param => {
    let finnalyResult;

    try {
      const entity = param.entity;

      console.log('productsService update: ', entity);

      const foundGateway = await Model.findOne(products, {
        where: {
          id: param.id
        },
        include: [
          {
            model: productsProperties,
            as: 'productsProperties'
          }
        ]
      }).catch(error => {
        throw preCheckHelpers.createErrorCheck(
          { typeCheck: TYPE_CHECK.GET_INFO, modelStructure: { parent: 'productss' } },
          error
        );
      });

      if (foundGateway) {
        let whereFilter = {
          id: { $ne: param.id },
          categoriesId: entity.categoriesId || foundGateway.categoriesId,
          productsName: entity.productsName || foundGateway.productsName
        };

        whereFilter = await filterHelpers.makeStringFilterAbsolutely(['productsName'], whereFilter, 'products');

        const infoArr = Array.from(
          await Promise.all([
            preCheckHelpers.createPromiseCheckNew(
              Model.findOne(products, {
                attributes: ['id'],
                where: whereFilter
              }),
              entity.productsName || entity.categoriesId ? true : false,
              TYPE_CHECK.CHECK_DUPLICATE,
              { parent: 'api.products.productsName' }
            )
          ])
        );

        if (!preCheckHelpers.check(infoArr)) {
          throw new ApiErrors.BaseError({
            statusCode: 202,
            type: 'getInfoError',
            message: 'Không xác thực được thông tin gửi lên'
          });
        }

        await sequelize.transaction(async t => {
          if (entity.url && entity.url !== foundGateway.url) {
            entity.url = entity.url + '-' + param.id;
          }

          if (entity.productsProperties && entity.productsProperties.length > 0) {
            const oldProductsProperties = foundGateway.productsProperties
              ? JSON.parse(JSON.stringify(foundGateway.productsProperties))
              : [];

            const newProductsProperties = entity.productsProperties;

            const updateProductsProperties = [];
            const deleteProductsPropertiesId = [];

            console.log('oldProductsProperties', oldProductsProperties);
            console.log('newProductsProperties', newProductsProperties);

            oldProductsProperties.forEach(oldAtt => {
              const findProductsProperties = newProductsProperties.find(newAtt => {
                return (
                  Number(oldAtt.propertiesId) === Number(newAtt.propertiesId) &&
                  oldAtt.value === newAtt.value &&
                  !newAtt.findStatus === true
                );
              });

              if (findProductsProperties) {
                findProductsProperties.findStatus = true;
                if (JSON.stringify(oldAtt.image || {}) !== JSON.stringify(findProductsProperties.image || {})) {
                  updateProductsProperties.push({
                    id: oldAtt.id,
                    image: findProductsProperties.image
                  });
                }
              } else {
                deleteProductsPropertiesId.push(oldAtt.id);
              }
            });

            const createProductsProperties = newProductsProperties.filter(e => !e.findStatus);

            console.log('updateProductsProperties', updateProductsProperties);
            console.log('deleteProductsPropertiesId', deleteProductsPropertiesId);
            console.log('createProductsProperties', createProductsProperties);

            if (updateProductsProperties.length > 0) {
              await Promise.all(
                updateProductsProperties.map(async e => {
                  await Model.update(
                    productsProperties,
                    { ..._.omit(e, ['id']) },
                    {
                      transaction: t,
                      where: { id: e.id }
                    }
                  );
                })
              );
            }

            if (deleteProductsPropertiesId.length > 0) {
              await Model.destroy(productsProperties, {
                transaction: t,
                where: { id: { $in: deleteProductsPropertiesId } }
              });
            }

            if (createProductsProperties.length > 0) {
              await Model.bulkCreate(
                productsProperties,
                createProductsProperties.map(e => {
                  return {
                    productsId: foundGateway.id,
                    ...e
                  };
                }),
                {
                  transaction: t
                }
              );
            }
          }

          let minPrice = null;
          let maxPrice = null;

          if (entity.subProducts && entity.subProducts.length > 0) {
            minPrice = entity.subProducts[0].dealPrice;
            maxPrice = entity.subProducts[0].dealPrice;

            await Promise.all(
              entity.subProducts.map(async e => {
                if (Number(e.flag) === 1) {
                  if (Number(e.id) > 0) {
                    await Model.update(
                      subProducts,
                      {
                        ...e
                      },
                      {
                        where: {
                          id: e.id
                        },
                        transaction: t
                      }
                    );
                  } else {
                    const createSubProducts = await Model.update(
                      subProducts,
                      { productsId: foundGateway.id, ...e },
                      {
                        where: {
                          id: e.id
                        },
                        transaction: t
                      }
                    );

                    e.id = createSubProducts.id;
                  }
                }

                if (e.dealPrice > maxPrice) {
                  maxPrice = e.dealPrice;
                }
                if (e.dealPrice < minPrice) {
                  minPrice = e.dealPrice;
                }
                if (e.subProductsProperties && e.subProductsProperties.length > 0) {
                  await Model.destroy(subProductsProperties, {
                    where: { subProductsId: e.id },
                    transaction: t
                  });
                  await Model.bulkCreate(
                    subProductsProperties,
                    e.subProductsProperties.map(subProductsPropertiesElement => {
                      return {
                        subProductsId: e.id,
                        ...subProductsPropertiesElement
                      };
                    }),
                    {
                      transaction: t
                    }
                  );
                }
              })
            );
          }

          await Model.update(
            products,
            {
              url: entity.url,
              minPrice: minPrice,
              maxPrice: maxPrice
            },
            {
              where: { id: foundGateway.id },
              transaction: t
            }
          ).catch(error => {
            throw new ApiErrors.BaseError({
              statusCode: 202,
              type: 'crudError',
              error
            });
          });

          await Model.update(products, entity, { where: { id: Number(param.id) }, transaction: t }).catch(error => {
            throw new ApiErrors.BaseError({
              statusCode: 202,
              type: 'crudError',
              error
            });
          });
        });
        finnalyResult = await Model.findOne(products, { where: { Id: param.id } }).catch(error => {
          throw new ApiErrors.BaseError({
            statusCode: 202,
            type: 'crudInfo',
            message: viMessage['api.message.infoAfterEditError'],
            error
          });
        });

        if (!finnalyResult) {
          throw new ApiErrors.BaseError({
            statusCode: 202,
            type: 'crudInfo',
            message: viMessage['api.message.infoAfterEditError']
          });
        }
      } else {
        throw new ApiErrors.BaseError({
          statusCode: 202,
          type: 'crudNotExisted',
          message: viMessage['api.message.notExisted']
        });
      }
    } catch (error) {
      ErrorHelpers.errorThrow(error, 'crudError', 'productsService');
    }

    return { result: finnalyResult };
  },