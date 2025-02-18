const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics } = require("../controllers/url");
const router = express.Router();
const URL = require("../models/url"); // Import the URL model


router.post('/', handleGenerateShortURL)

router.get('/analytics/:shortid', handleGetAnalytics);

router.get('/:shortid', async (req, res) => {
    const shortID = req.params.shortid;
    const entry = await URL.findOneAndUpdate({shortID},
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            },
        },
    );
    res.redirect(entry.redirectURL)
})

module.exports = router;