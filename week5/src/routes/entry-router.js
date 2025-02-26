import express from 'express';
import {body} from "express-validator";
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
  .post(
     authenticateToken,
     body('entry_date').trim().isDate(),
     body('mood').trim().optional().isLength({max: 20}),
     body('weight').trim().optional().isFloat({gt: 30, lt: 200}),
     body('sleep_hours').trim().optional().isInt({gt: 0, lt: 24}),
     body('notes').optional().isLength({max : 1000}),  
     postEntry)
  .get(authenticateToken, getEntries);
entryRouter
  .route('/:id')
  .delete(authenticateToken, checkAuthEntries, deleteEntry)
  .put(authenticateToken, checkAuthEntries, updateEntry);
export default entryRouter;
