const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  CompanyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobType: {
    type: [String],
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobRequirements: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: [String],
    required: true,
  },
  Document: {
    type: String,
    required: true
  },
});

jobPostSchema.statics.paginate = async function (page, limit) {

  try {
    const skip = (page - 1) * limit;


    const total = await this.countDocuments();


    const jobs = await this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)


    const totalPages = Math.ceil(total / limit);

    return {
      jobs,
      currentPage: page,
      totalPages,
      totalJobs: total,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  }
  catch (e) {
    res.status(500).send({ apiStatus: false, data: e.message, message: "service unavalibale" })

  }
};



const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
