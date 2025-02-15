const express = require("express");
const urlroute = require("./routes/url");
const { connectTOMongoDb } = require("./connect")
const app = express();
const PORT = 8000;
const URL = require("./models/url")
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/url", urlroute);
connectTOMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("mongo connected"));

app.listen(PORT, () => console.log("server started"));

app.get('/:shortid', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
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