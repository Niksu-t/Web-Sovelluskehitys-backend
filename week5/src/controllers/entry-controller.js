
import {
  deleteEntryByIds,
  insertEntry,
  editEntry,
  selectEntriesByUserId,
} from '../models/entry-model.js';

// Adds entry to the databse
const postEntry = async (req, res) => {
  const newEntry = req.body;
  console.log(req.body);
  newEntry.user_id = req.user.user_id;
  try {
    // calls the model function to insert the entry to the database
    await insertEntry(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error'});
  }
  res.status(201).json({message: 'Entry added.'});
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res) => {
  const entries = await selectEntriesByUserId(req.user.user_id);
  res.json(entries);
};

// Updates entry by id
const updateEntry = async (req, res) => {
  console.log('Edit entry', req.params.id);
  const entryId = req.params.id;
  const entry = req.body;
  try {
    // calls model function to edit the entry
    editEntry(entryId, entry);
  } catch (error) {
    console.log(req.params.id);
    console.error(error);
    res.status(500).json({message: 'Database error'});
  };
};

// Deletes entry by id
const deleteEntry = async (req, res) => {
  console.log('Delete entry', req.params.id);
  const entryId = req.params.id;
  try {
    await deleteEntryByIds(entryId);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error'});
  }
};
export {postEntry, getEntries, updateEntry, deleteEntry};
