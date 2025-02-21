import {deleteEntryByIds, insertEntry, selectEntriesByUserId} from '../models/entry-model.js';

const postEntry = async (req, res) => {
  // user_id, entry_date, mood, weight, sleep_hours, notes
  // TODO: add try-catch
  const newEntry = req.body;
  console.log(req.body);
  newEntry.user_id = req.user.user_id;
  try {
    await insertEntry(newEntry);

  }catch (error) {
    console.error(error);
    res.status(500).json({message: "Database error"});
  
  res.status(201).json({message: "Entry added."});
  }
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

const editEntry = async (req, res) => {
    const entryId = Number(req.params.id);
    const entry = req.body;
    const userId = req.user.user_id;
    try {
     editEntry(userId, entryId, entry);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Database error"});
    }
};
const deleteEntry = async (req, res) => {
  console.log('Delete entry', req.params.id);
  const entryId = req.params.id;
  const userId = req.user.user_id;
  try {
    await deleteEntryByIds(userId, entryId);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Database error"});
  }
}
export {postEntry, getEntries, editEntry, deleteEntry};