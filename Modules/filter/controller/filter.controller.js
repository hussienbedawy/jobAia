const jobPostingModel = require('../../../DB/models/JobPost.model') 

class filter {
    static filterFun = async (req, res) => {
        try {
            const query = {} 
            for (const key in req.query) {
                if (req.query.hasOwnProperty(key)) {
                    const values = req.query[key].split(',') 
                    if (key === 'minExperience' || key === 'maxExperience') {
                        query['experience'] = query['experience'] || {} 
                        query['experience'][key === 'minExperience' ? '$gte' : '$lte'] = Number(values[0]) 
                    } else {
                        query[key] = { $in: values.map(value => isNaN(value) ? new RegExp(value, 'i') : Number(value)) } 
                    }
                }
            }
            const filterResult = await jobPostingModel.find(query) 
            if (filterResult.length === 0) {
                return res.status(404).send({ apistatus: false, data: {}, message: 'there are no jobs having all the filtered criteria that you have chosen' }) 
            }
            res.status(200).send({ apistatus: true, data: filterResult, message: 'jobs are found' }) 
        } catch (e) {
            res.status(500).send({ apistatus: false, data: e.message, message: 'there is an error in the filter' }) 
        }
    }
}

module.exports = filter 