declare var AuthService;
declare var HashService;
declare var sails: Sails.Instance;
declare var User: Sails.Model;

class AuthController {
  login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    sails.log(`login requested for user ${email}`);

    User.findOne({ email })
      .then(user => {
        if (user && password) {
          return HashService.matches(password, user.password)
            .then(match => match ? res.send({ token: AuthService.createJWT(user) }) : res.status(401)
              .send({ message: 'login failed!' }));
        }
        return res.status(401)
          .send(`User with email '${email}' does not exist`);
      })
      .catch(err => res.status(500)
        .send(`Unable to check user ${email}: ${err}`));
  }
}

export = new AuthController();
