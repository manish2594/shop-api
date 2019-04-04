const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'This api works for order details'
  });
});
router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(200).json({
    message: 'Order was created',
    data: order
  });
});

router.delete('/', (req, res, next) => {
  res.status(202).json({
    message: 'Order was deleted'
  });
});

module.exports = router;
