
const Application = require("../../../DB/models/Application.model");


const ViewApplication = async (req, res) => {
    try {
        const applications = await Application.find();
        return res.status(200).json(applications);
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}

const CreateApplication = async (req, res) => {
    try {
        const userId = req.params.userId;
        const JobId = req.params.JobId;
        const { firstName,
            lastName,
            mandatoryAddress,
            optionalAddress,
            city,
            state,
            zipCode,
            phoneNabmer,
            alternateNumber,
            jobNeeded,
            otherJob,
            WorkingPeriod,
            workedUs,
            workedUsWhen_month,
            workedUsWhen_day,
            workedUsWhen_year,
            CV } = req.body;

        const newApplication = await Application.create({
            createdBy : userId,
            createdFor: JobId,
            firstName,
            lastName,
            mandatoryAddress,
            optionalAddress,
            city,
            state,
            zipCode,
            phoneNabmer,
            alternateNumber,
            jobNeeded,
            otherJob,
            WorkingPeriod,
            workedUs,
            workedUsWhen_month,
            workedUsWhen_day,
            workedUsWhen_year,
            CV
        });
        const applications = await Application.findById(JobId).populate([{ path: "createdBy", select: "_id" }, { path: "createdFor", select: "_id" }]);
        return res.status(201).json({ massage: "file uploaded successfully", Data: newApplication });
    } catch (err) {
        return res.status(401).json({ message: "something went wrong", err: err.message });
    }
}



module.exports = {
    ViewApplication,
    CreateApplication
}


