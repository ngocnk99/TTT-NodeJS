export default models => {
  // eslint-disable-next-line no-empty-pattern
  const { menuPositions, menus, users, userGroups, districts, provinces, userTokens, userGroupRoles } = models;

  menus.belongsTo(menus, {
    foreignKey: 'parentId',
    as: 'parent'
  });
  menus.belongsTo(menuPositions, {
    foreignKey: 'menuPositionsId',
    as: 'menuPositions'
  });
  menus.belongsTo(users, {
    foreignKey: 'userCreatorsId',
    as: 'userCreators'
  });

  menus.hasMany(userGroupRoles, {
    foreignKey: 'menusId',
    as: 'userGroupRoles'
  });

  menuPositions.belongsTo(users, {
    foreignKey: 'userCreatorsId',
    as: 'userCreators'
  });

  users.belongsTo(userGroups, {
    foreignKey: 'userGroupsId',
    as: 'userGroups'
  });
  userGroupRoles.belongsTo(menus, {
    foreignKey: 'menusId',
    as: 'menus'
  });
  userGroupRoles.belongsTo(userGroups, {
    foreignKey: 'userGroupsId',
    as: 'userGroups'
  });

  districts.belongsTo(provinces, {
    foreignKey: 'provincesId',
    as: 'provinces'
  });

  userGroups.belongsTo(users, {
    foreignKey: 'userCreatorsId',
    as: 'userCreators'
  });

  users.hasMany(userTokens, {
    foreignKey: 'usersId',
    as: 'userTokens'
  });

  userTokens.belongsTo(users, {
    foreignKey: 'usersId',
    as: 'users'
  });
};
