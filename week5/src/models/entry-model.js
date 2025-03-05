import promisePool from '../utils/database.js';

// Inserts new entry to the database
const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ? ,?)',
      [
        entry.user_id,
        entry.entry_date,
        entry.mood,
        entry.weight,
        entry.sleep_hours,
        entry.notes,
      ],
    );
    console.log('inserEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// Selects all entries by user id
const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// Deletes entry by id
const deleteEntryByIds = async (entryId) => {
  try {
    const [rows] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE user_id=? AND entry_id=?',
      [entryId],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// Modifies existing entry.
const editEntry = async ( entryId, entry) => {
  console.log(' Received data: ', entryId, entry);
  try {
    // Updates entry by searching for the entry by id
    const [rows] = await promisePool.query(
      'UPDATE DiaryEntries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE AND entry_id=?',
      [
        entry.entry_date,
        entry.mood,
        entry.weight,
        entry.sleep_hours,
        entry.notes,
        entryId,
      ],
    );
    console.log(rows);
    // Returns the first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// Made speficilally for checking authentification by first searching for the entry by id
const selectEntriesByIds = async (entryId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id=?',
      [entryId],
    );
    console.log(rows[0]);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {
  insertEntry,
  selectEntriesByUserId,
  deleteEntryByIds,
  editEntry,
  selectEntriesByIds,
};
