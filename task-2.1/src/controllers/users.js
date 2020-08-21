import * as usersService from '../services/users';
import { getSuccessView, getErrorView } from '../views/users';

export async function getAllUsers(req, res) {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserById(req, res) {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.status(200).json(getSuccessView(user));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAutoSuggestUsers(req, res) {
  const { 'login-substring': loginSubstring, limit } = req.query;
  try {
    const users = await usersService.getAutoSuggestUsers(loginSubstring, limit);
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createUser(req, res) {
  const { login, password, age } = req.body;
  try {
    const newUser = await usersService.createUser({ login, password, age });
    res.status(201).json(getSuccessView(newUser));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function updateUser(req, res) {
  const { id, password, age, isDeleted } = req.body;
  try {
    const newUser = await usersService.updateUser({ id, password, age, isDeleted });
    res.status(201).json(getSuccessView(newUser));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function removeUser(req, res) {
  try {
    await usersService.removeUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}
