const {nanoid}=require("nanoid");
const URL=require("../models/url");


async function handleGenerateShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortId=nanoid(6);
    await URL.create({
        shortID: shortId,
        redirectURL:body.url,
        visitedHistory:[],
    });

    return res.json({id: `http://localhost:8000/url/${shortId}`})
}

async function handleGetAnalytics(req,res){
    const shortID=req.params.shortid;
    const result=await URL.findOne({shortID});
    return res.json({
        totalCLicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports={
    handleGenerateShortURL,
    handleGetAnalytics,
}