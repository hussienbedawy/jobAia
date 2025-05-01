const AuthRoutes = require("../Modules/Auth/Auth.routes");

const ApplicationRoutes = require("../Modules/Application/Application.routes");

const FeedbackRoutes = require("../Modules/Feedback/Feedback.routes");

const JobPostRoutes = require("../Modules/JobPost/JobPost.routes");

const searchRoute = require("../Modules/search/search.routes")

const  ProfileRoutes = require("../Modules/Profile/Profile.routes")

const filterRoute = require('../Modules/filter/filter.routes')
module.exports= {
    AuthRoutes,
    ApplicationRoutes,
    FeedbackRoutes,
    JobPostRoutes,
    searchRoute,
    ProfileRoutes,
    filterRoute
} 