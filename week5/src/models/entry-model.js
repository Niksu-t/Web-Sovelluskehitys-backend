import promisePool from '../utils/database.js';

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ? ,?)',
      [entry.user_id, entry.entry_date, entry.mood, entry.weight, entry.sleep_hours, entry.notes],
    );
    console.log('inserEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

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
const deleteEntryByIds = async (userId, entryId) => {
  try {
    const [rows] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE user_id=? AND entry_id=?',
      [userId, entryId],
    );
    console.log(rows);
    return rows[0];
  }catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};
const editEntry = async (userId, entryId, entry) => {
  console.log(' Received data: ', userId, entryId, entry);
  try {
    const [rows] = await promisePool.query(
      'UPDATE DiaryEntries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE user_id=? AND entry_id=?',
      [entry.entry_date, entry.mood, entry.weight, entry.sleep_hours, entry.notes, userId, entryId],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
}
const selectEntriesByIds = async (userId, entryId) => {
  try {
    const [rows] = await promisePool.query(
    'SELECT * FROM DiaryEntries WHERE entry_id=?',
    [entryId],
    );
    console.log(rows[0]);
    const resultUserId = rows[0].user_id;
    if (resultUserId != userId) {
      console.log('User id does not match');
      return false;
    } else {
      console.log('User id matches');
      return true;
    }

  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
  
}

export {insertEntry, selectEntriesByUserId, deleteEntryByIds, editEntry, selectEntriesByIds};