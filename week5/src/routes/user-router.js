import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import { authenticateToken, checkAuthUsers } from '../middleware/authentication.js';
const userRouter = express.Router();

// all routes to /api/users
userRouter.route('/')
  // only logged in user can fetch the user list
  .get(authenticateToken, getUsers)
  .post(addUser);

// all routes to /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(authenticateToken, checkAuthUsers, editUser)
  .delete(deleteUser);

export default userRouter;