import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { selectEntriesByIds } from '../models/entry-model.js';

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

const checkAuthEntries = async (req, res, next) => {
    const result =  await selectEntriesByIds(req.user.user_id, req.params.id);
    if(result == false){
      res.sendStatus(401);
    }
    else {
       next();
    };
};
const checkAuthUsers = async (req, res, next) => {
  const userId = req.user.user_id;
  const targetId = req.params.id;
  if(userId != targetId){
    res.sendStatus(401);
  }
  else {
     next();
  };
};

export {authenticateToken, checkAuthEntries, checkAuthUsers};