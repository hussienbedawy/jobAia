const feedback = require("../../../DB/models/Feedback.model");

const PostComment = async (req, res) => {
    try {
        const userId  = req.params.userId;
        const JobId  = req.params.JobId;
        const {comment, rating} = req.body;
        const newFeetback = await feedback.create({
            createdBy: userId,
            createdFor: JobId,
            comment,
            rating,
        });
        const Feedback = await feedback.findById(newFeetback._id).populate([{path:"createdBy", select: {CompanyName: 1 , email : 1 }}, {path:"createdFor", select: "_id"}]);
        return res.status(200).json({ message: "feetback added successfully", data: Feedback });
    } catch (err) {
        return res.status(401).json({ message: "something went wrong", err: err.message });
    }
}

const GetComments =  async (req, res) => {
    try {
        const feedbacks = await feedback.find({}).populate({path:"createdBy", select: "CompanyName email"});

        return res.status(200).json({ message: "Success", feedbacks});
    } catch (err) {
        return res.status(401).json({ message: "Something went wrong", error: err.message });
    }
}


module.exports = {PostComment, GetComments}
