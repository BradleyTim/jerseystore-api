const express = require('express');
const mongoose = require('mongoose');

const Jersey = require('../models/Jersey');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏'
    });
});

router.get('/jerseys', async (req, res) => {

    const jerseys = await Jersey.find();

    res.status(200).json({
        jerseys,
    });
});

module.exports = router;