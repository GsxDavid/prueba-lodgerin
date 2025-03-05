const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin.routes');
const guestRoutes = require('./guest.routes');
const authRoutes = require('./auth.routes');


router.use('/admin', adminRoutes);
router.use('/guest', guestRoutes);
router.use('/auth', authRoutes);

module.exports = router;
