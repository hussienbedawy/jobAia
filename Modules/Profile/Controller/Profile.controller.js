const profile = require("../../../DB/models/profile.model");
const skills = require("../../../DB/models/Skills.model");
const Application = require("../../../DB/models/Application.model");

const Postdetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "please provide the id" });
    }
    const {
      phoneNumber,
      cv,
      age,
      minimumSalary,
      jobSearchStatus,
      jobTitle,
      jobCategory,
      jobType,
      skillName,
      workExperience,
      education,
    } = req.body;
    const newprofile = await profile.create({
      phoneNumber,
      cv,
      age,
      minimumSalary,
      jobSearchStatus,
      jobTitle,
      jobCategory,
      jobType,
      workExperience,
      education,
    });
    const skill = await skills.create({ skillName });
    return res
      .status(200)
      .json({
        message: "details added successfully",
        data: newprofile,
        skill,
      });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "something went wrong", err: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "please provide the id" });
    }
    const idSkill = req.params.idSkill;
    if (!idSkill) {
      return res.status(400).json({ message: "please provide the id" });
    }
    const foundProfile = await profile.findById(id).populate({
      path: "personalInfo",
      select: {
        CompanyName: 1,
        email: 1,
        role: 1,
      },
    });
    const foundSkill = await skills.findById(idSkill);
    return res.status(200).json({message: "Profile found successfully", data: foundProfile , skill: foundSkill,});
  } catch (err) {
    return res
      .status(401)
      .json({ message: "something went wrong", err: err.message });
  }
};

const updateDetails = async (req, res) => {
  try {
    const profileId = req.params.id;
    if (!profileId) {
      return res.status(400).json({ message: "Please provide the profile ID" });
    }
    const {
      phoneNumber,
      cv,
      age,
      minimumSalary,
      jobSearchStatus,
      jobTitle,
      jobCategory,
      jobType,
      skillName,
      workExperience,
      education,
    } = req.body;

    const updatedProfile = await profile.findByIdAndUpdate(
      profileId,
      {
        phoneNumber,
        cv,
        age,
        minimumSalary,
        jobSearchStatus,
        jobTitle,
        jobCategory,
        jobType,
        workExperience,
        education,
      },
      { new: true }
    );
    const updatedSkill = await skills.findOneAndUpdate({ skillName });

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res
      .status(200)
      .json({
        message: "Profile updated successfully",
        data: updatedProfile,
        updatedSkill,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", err: err.message });
  }
};
// ================= get user applications using createdBy => hussien =================  
const getUserApplications = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).json({ message: "Please provide the user ID" })
    }

    
    const applications = await Application.find({ createdBy: id })

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this user" })
    }

    return res.status(200).json({
      apiStatus: true, 
      data: applications,
      message: "Applications retrieved successfully"
    
    });
  } catch (e) {
    return res.status(500).json({ apiStatus:false ,data: e.message, message: "Something went wrong"  })
  }
}
// ================= get applicants createdFor => hussien =================  

const getUserApplicants = async (req, res) => {
  try {
    const jobPostId = req.params.jobPostId; // Use the correct parameter name
    if (!jobPostId) {
      return res.status(400).json({ message: "Please provide the job post ID" });
    }

    const applicants = await Application.find({ createdFor: jobPostId });

    if (!applicants || applicants.length === 0) {
      return res.status(404).json({ message: "No applications found for this job post" });
    }

    return res.status(200).json({
      apiStatus: true,
      data: applicants,
      message: "Applications retrieved successfully",
    });
  } catch (e) {
    return res.status(500).json({ apiStatus: false, data: e.message, message: "Something went wrong" });
  }
};

module.exports = { Postdetails, getProfile, updateDetails, getUserApplications, getUserApplicants }