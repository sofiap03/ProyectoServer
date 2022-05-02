const express = require('express');
const UserService = require('../services/user.service');
const UserModel = require('../models/user.model');
const UserRouter = express.Router();
const service = new UserService();

UserRouter.post('/user', async (req, res) => {
    try {
      const user = UserModel(req.body);
      const data = await service.createUser(user);
      res.status(201).json(data);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  });

  UserRouter.get('/', async (req, res, next) => {
    try {
      const data = await service.find();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  UserRouter.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await service.showUser(userId);
      res.status(302).json(data);
    } catch (error) {
      next(error);
    }
  });

  UserRouter.put('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { name, lastname, email, password, active } = req.body;
      const data = await service.editUser(
        userId, name, lastname, email, password, active
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  UserRouter.delete('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = await service.removeUser(userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

module.exports = UserRouter;