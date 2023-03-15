import ValidateJoi, { noArguments } from '../utils/validateJoi';
import viMessage from '../locales/vi';

import regexPattern from '../utils/regexPattern';
import { parseSort } from '../utils/helper';

// mobile, userGroupsId, address,  status, dateUpdated, dateCreated, dateExpire
const DEFAULT_SCHEMA = {
  username: ValidateJoi.createSchemaProp({
    string: noArguments,
    label: viMessage['api.users.username'],
    allow: null
  }),
  password: ValidateJoi.createSchemaProp({
    string: noArguments,
    label: viMessage['api.users.password'],
    allow: null
  }),
  image: ValidateJoi.createSchemaProp({
    object: noArguments,
    label: viMessage.image,
    allow: null
  }),
  fullname: ValidateJoi.createSchemaProp({
    string: noArguments,
    label: viMessage['api.users.fullname'],
    allow: null
  }),
  usersCode: ValidateJoi.createSchemaProp({
    string: noArguments,
    label: viMessage['api.users.usersCode'],
    allow: [null, '']
  }),
  email: ValidateJoi.createSchemaProp({
    string: noArguments,
    label: viMessage['api.users.email'],
    allow: ['', null]
  }),
  mobile: ValidateJoi.createSchemaProp({
    string: noArguments,
    label: viMessage['api.users.mobile'],
    allow: ['', null]
  }),

  address: ValidateJoi.createSchemaProp({
    string: noArguments,
    label: viMessage['api.users.address'],
    allow: ['', null]
  }),
  userGroupsId: ValidateJoi.createSchemaProp({
    number: noArguments,
    label: viMessage.userGroupsId
  }),

  status: ValidateJoi.createSchemaProp({
    number: noArguments,
    label: viMessage.status,
    allow: null
  }),
  dateUpdated: ValidateJoi.createSchemaProp({
    date: noArguments,
    label: viMessage['api.users.dateUpdated']
  }),
  dateCreated: ValidateJoi.createSchemaProp({
    date: noArguments,
    label: viMessage['api.users.dateCreated']
  }),
  dateExpire: ValidateJoi.createSchemaProp({
    date: noArguments,
    label: viMessage['api.users.dateExpire']
  })
};

export default {
  authenCreate: (req, res, next) => {
    console.log('validate authenCreate');

    const {
      username,
      image,
      password,
      fullname,
      email,
      mobile,
      userGroupsId,
      address,

      status,
      dateExpire
    } = req.body;

    const user = {
      username,
      image,
      password,
      fullname,
      email,
      mobile,
      userGroupsId,
      address,

      status,
      dateExpire
    };

    const SCHEMA = Object.assign(
      ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
        username: {
          regex: /\w/i,
          max: 50,
          required: true
        },
        password: {
          min: 6,
          max: 100
        },
        fullname: {
          max: 100
        },
        email: {
          regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          max: 100
        },
        mobile: {
          regex: /^[0-9]+$/i,
          max: 15
        },
        userGroupsId: {
          required: noArguments
        },
        status: {
          required: noArguments
        }
      })
    );

    // console.log('input: ', input);
    ValidateJoi.validate(user, SCHEMA)
      .then(data => {
        res.locals.body = data;
        next();
      })
      .catch(error => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
  },
  authenUpdate: (req, res, next) => {
    console.log('validate authenUpdate');

    const {
      username,
      image,
      password,
      fullname,
      email,
      mobile,
      userGroupsId,
      address,

      status,
      dateExpire
    } = req.body;

    const user = {
      username,
      image,
      password,
      fullname,
      email,
      mobile,
      userGroupsId,
      address,

      status,
      dateExpire
    };

    const SCHEMA = Object.assign(
      ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
        username: {
          regex: /\w/i,
          max: 100
        },
        fullname: {
          max: 100
        },
        email: {
          regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          max: 100
        },
        mobile: {
          regex: /^[0-9]+$/i,
          max: 15
        }
      })
    );

    ValidateJoi.validate(user, SCHEMA)
      .then(data => {
        res.locals.body = data;
        next();
      })
      .catch(error => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
  },
  authenUpdate_status: (req, res, next) => {
    // console.log("validate authenCreate")
    const userCreatorsId = req.auth.userId || 0;

    const { status, dateUpdated } = req.body;
    const userGroup = { status, dateUpdated, userCreatorsId };

    const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
      status: {
        required: noArguments
      }
      // dateUpdated: {
      //   required: noArguments
      // }
    });

    ValidateJoi.validate(userGroup, SCHEMA)
      .then(data => {
        res.locals.body = data;
        next();
      })
      .catch(error => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
  },
  authenFilter: (req, res, next) => {
    console.log('validate authenFilter');
    const { filter, sort, range, attributes } = req.query;

    res.locals.sort = parseSort(sort);
    res.locals.range = range ? JSON.parse(range) : [0, 49];
    res.locals.attributes = attributes;
    if (filter) {
      const {
        id,
        username,
        image,
        password,
        fullname,
        email,
        mobile,
        userGroupsId,
        address,

        status,
        dateExpire,
        FromDate,
        ToDate
      } = JSON.parse(filter);

      const user = {
        id,
        username,
        image,
        password,
        fullname,
        email,
        mobile,
        userGroupsId,
        address,

        status,
        dateExpire,
        FromDate,
        ToDate
      };

      console.log(user);
      const SCHEMA = {
        ...DEFAULT_SCHEMA,
        id: ValidateJoi.createSchemaProp({
          string: noArguments,
          label: viMessage['api.users.id'],
          regex: regexPattern.listIds
        }),

        userGroupsId: ValidateJoi.createSchemaProp({
          string: noArguments,
          label: viMessage.userGroupsId,
          regex: regexPattern.listIds
        }),
        FromDate: ValidateJoi.createSchemaProp({
          date: noArguments,
          label: viMessage.FromDate
        }),
        ToDate: ValidateJoi.createSchemaProp({
          date: noArguments,
          label: viMessage.ToDate
        })
      };

      // console.log('input: ', input);
      ValidateJoi.validate(user, SCHEMA)
        .then(data => {
          if (id) {
            ValidateJoi.transStringToArray(data, 'id');
          }
          if (userGroupsId) {
            ValidateJoi.transStringToArray(data, 'userGroupsId');
          }

          res.locals.filter = data;
          console.log('locals.filter', res.locals.filter);
          next();
        })
        .catch(error => {
          next({ ...error, message: 'Định dạng gửi đi không đúng' });
        });
    } else {
      res.locals.filter = {};
      next();
    }
  },
  authenRequestForgetPass: (req, res, next) => {
    console.log('validate authenUpdate');

    const { email, mobile } = req.body;
    const user = { email, mobile };

    const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
      email: {
        regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
        max: 200
      },
      mobile: {
        regex: /^[0-9]+$/i,
        max: 15
      }
    });

    ValidateJoi.validate(user, SCHEMA)
      .then(data => {
        res.locals.body = data;
        next();
      })
      .catch(error => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
  }
};
