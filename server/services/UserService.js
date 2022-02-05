const User = require("../data-access/User");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getUserById(id) {
    return this.userModel.findUserById(id);
  }
}

module.exports = new UserService(User);
