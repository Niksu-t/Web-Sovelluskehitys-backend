import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {selectUserById} from '../models/user-model.js';
import {selectEntriesByIds} from '../models/entry-model.js';

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == undefined) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({message: 'invalid token'});
  }
};

// Authorization check for entries
const checkAuthEntries = async (req, res, next) => {
  // Seacrh the database for the entry with the given id and gets user level from database
  const result = await selectEntriesByIds(req.params.id);
  const admin_result = await selectUserById(req.user.user_id);
  //console.log("Tulokset: ", result.userId, user_level);
  // Checks if the user is the one that created the entry or is an admin
  if (result.userId != req.user.user_id || admin_result.user_level != 1) {
    res.sendStatus(401);
  } else {
    next();
  }
};

// Authorization check for users
const checkAuthUsers = async (req, res, next) => {
  // Setting variables for ease of use
  const userId = req.user.user_id;
  const targetId = req.params.id;
  const result = await selectUserById(req.user.user_id);
  //console.log('Tulokset: ', result);
  // Checks if the user is the same that they are trying to modify or is an admin
  if (userId != targetId || result.user_level != 1) {
    res.sendStatus(401);
  } else {
    next();
  }
};

export {authenticateToken, checkAuthEntries, checkAuthUsers};
