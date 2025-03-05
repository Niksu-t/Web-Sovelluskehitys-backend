import express from 'express';
import {
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
  addUser
} from '../controllers/user-controller.js';
import { authenticateToken, checkAuthUsers } from '../middleware/authentication.js';
import {body} from 'express-validator';
import { validationErrorHandler } from '../middleware/error-handler.js';
const userRouter = express.Router();

// all routes to /api/users
userRouter.route('/')
  // only logged in user can fetch the user list
  .get(authenticateToken, getUsers)
  .post(
    body('username', 'username must be 3-20 characters long and alphanumeric').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password', 'minimum password lenght is 8 characters').trim().isLength({min: 8}),
    body('email', 'must be a valid email address').trim().isEmail(),
    validationErrorHandler,
    addUser);

// all routes to /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(authenticateToken, checkAuthUsers, updateUser)
  .delete(deleteUser);

export default userRouter;