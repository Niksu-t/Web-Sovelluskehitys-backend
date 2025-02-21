import express from 'express';
import {
  getEntries,
  postEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/entry-controller.js';
import {authenticateToken, checkAuthEntries} from '../middleware/authentication.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(authenticateToken, postEntry)
  .get(authenticateToken, getEntries);
entryRouter
  .route('/:id')
  .delete(authenticateToken, checkAuthEntries, deleteEntry)
  .put(authenticateToken, checkAuthEntries, updateEntry);
export default entryRouter;
