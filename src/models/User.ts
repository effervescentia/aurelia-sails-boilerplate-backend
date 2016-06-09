declare var HashService;
declare var sails: Sails.Instance;

class User {
  attributes = {
    email: {
      type: 'string',
      unique: true,
      required: true,
      lowercase: true,
      email: true
    },

    password: {
      type: 'string'
    }
  };

  beforeCreate(model, cb) {
    sails.log.debug('checking password');

    if (model.password) {
      HashService.hash(model.password)
        .then(hash => model.password = hash)
        .then(() => cb())
        .catch(cb);
    }
  }
}

export = new User();
