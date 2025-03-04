const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin.routes');
const guestRoutes = require('./guest.routes');


router.use('/admin', adminRoutes);
router.use('/guest', guestRoutes);

module.exports = router;
