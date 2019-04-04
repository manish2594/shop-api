const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(200).json({
            message: 'Created Succefully',
            data: result
          });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(result => {
      console.log(result);
      if (result) {
        bcrypt.compare(req.body.password, result.password, (err, hashToken) => {
          if (err) {
            return res.status(401).json({
              error: 'Auth Failed'
            });
          }
          if (hashToken) {
            const token = jwt.sign(
              { _id: result._id, email: result.email },
              'secret',
              {
                expiresIn: '1h'
              }
            );

            return res.status(200).json({
              message: 'login succesfully',
              data: result,
              token: token
            });
          } else {
            return res.status(401).json({
              error: 'Auth Failed'
            });
          }
        });
      } else {
        res.status(401).json({ message: 'login failed' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.delete('/:userId', (req, res, next) => {
  // User()
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'deleted Successfully',
        data: result
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
