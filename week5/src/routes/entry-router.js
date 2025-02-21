import express from 'express';
import {
  getEntries,
  postEntry,
  editEntry,
  deleteEntry,
} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middleware/authentication.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(authenticateToken, postEntry)
  .get(authenticateToken, getEntries);
entryRouter
  .route('/:id')
  .delete(authenticateToken, deleteEntry)
  .put(authenticateToken, editEntry);
export default entryRouter;
