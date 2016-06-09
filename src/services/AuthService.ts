import jwt = require('jwt-simple');
import moment = require('moment');

declare var sails: Sails.Instance;

class AuthService {
  createJWT(user) {
    return jwt.encode({
      sub: user.id,
      iat: moment()
        .unix(),
      exp: moment()
        .add(14, 'days')
        .unix()
    }, sails.config.jwt.TOKEN_SECRET);
  }

  verifyJWT(token) {

  }
}

export = new AuthService();
