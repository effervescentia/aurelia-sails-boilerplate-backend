import bcrypt = require('bcrypt');
import Promise = require('bluebird');

class HashService {
  hash(password) {
    return this.genSalt()
      .then(this.genHash(password));
  }

  matches(password, hashword) {
    return this.compare(password, hashword);
  }

  private genSalt() {
    return new Promise((resolve, reject) => bcrypt.genSalt(10, (err, salt) => err ? reject(err) : resolve(salt)));
  }

  private genHash(password) {
    return salt => new Promise((resolve, reject) => bcrypt.hash(password, salt, (err, hashword) => err ? reject(err) : resolve(hashword)));
  }

  private compare(password, hashword) {
    return new Promise((resolve, reject) => bcrypt.compare(password, hashword, (err, match) => err ? reject(err) : resolve(match)));
  }
}

export = new HashService();
