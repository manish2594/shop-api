const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
  // res.status(200).json({
  //   message: 'Products api works for me'
  // });

  Product.find()
    .select('_id name price')
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ data: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .exec()
    .then(result => {
      res.status(200).json({
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  // res.status(200).json({
  //   message: 'Products api works for me',
  //   id: req.params.id
  // });
});

router.post('/', (req, res, next) => {
  // const product = {
  //   name: req.body.name,
  //   price: req.body.price
  // };
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Products is posted',
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:id', (req, res, next) => {
  Product.update(
    { _id: req.params.id },
    { $set: { name: req.body.name, price: req.body.price } }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ data: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res, next) => {
  Product.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ data: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
