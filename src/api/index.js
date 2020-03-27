const express = require('express');
const cloudinary = require('cloudinary');
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");

const Jersey = require('../models/Jersey');

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "jerseys",
    format: 'jpeg',
    transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const parser = multer({ storage: storage });

// jersery routes here
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API - LAST SEASON'
    });
});

router.get('/jerseys', async (req, res) => {

    const jerseys = await Jersey.find();

    res.status(200).json({
        jerseys,
    });
});

router.post('/jerseys', parser.single('image'), async (req, res) => {

    const { name, price, kit } = req.body;
    const image_url = req.file.url;

    // console.log(req.body);

    const jersey = new Jersey({
        name,
        image_url,
        price,
        kit,
    });

    try {
        const data = await jersey.save();
        console.log(data);
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