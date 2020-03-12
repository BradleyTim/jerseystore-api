const express = require('express');

const Jersey = require('../models/Jersey');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API - 👋🌎🌍🌏'
    });
});

router.get('/jerseys', async (req, res) => {

    const jerseys = await Jersey.find();

    res.status(200).json({
        jerseys,
    });
});

router.post('/jerseys', async (req, res) => {

    const { name, image_url, price, kit } = req.body;

    console.log(req.body);

    const jersey = new Jersey({
        name,
        image_url,
        price,
        kit,
    });

    try {
        const data = await jersey.save();

        res.status(201).json({
            jersey: data,
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            error: 'server error',
        });
    }
});

module.exports = router;