const UserModel = require("../models/user.model");
const Boom = require("@hapi/boom");

class UserService {
  //Promesas y funciones asincronica

  async createUser(user) {
    user.save();
    return user;
  }

  async listUser() {
    return UserModel.find();
  }

  //Funcion que devuelve la promesa
  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(UserModel.find());
      }, 3000);
    });
  }

  async showUser(userId) {
    return UserModel.findById({ _id: userId }).then(
      (UserFind) => {
        if (!UserFind) throw Boom.notFound('No se econtró la persona');
        return UserFind;
      }
    );
  }

  async editUser(userId, name, lastname, email, password, active) {
    return UserModel.findById({ _id: UserId }).then((UserFind) => {
      if (!UserFind) throw Boom.notFound("No se encontro el Usuario");
      return UserModel.updateOne(
        { userId },
        { name, lastname, email, password, active }
      );
    });
  }

  async removeUser(userId) {
    const user_remove = UserModel.findById({ _id: userId });
    if (!userId) throw Boom.notFound("No se encontro el Usuario");
    UserModel.deleteOne(user_remove);
    return UserModel.deleteOne(user_remove);
  }
}

module.exports = UserService;