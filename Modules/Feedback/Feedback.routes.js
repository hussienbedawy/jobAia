const express = require("express");
const router = express.Router();
const {PostComment , GetComments} = require("../Feedback/Controller/Feedback.controller");


router.post("/feedback/:userId/:JobId", PostComment);

router.get("/feedback", GetComments);


module.exports = router;