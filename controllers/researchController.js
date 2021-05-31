const Research = require('../models/research');

//add ResearchPapers
exports.addResearchPapers = async (req, res, next) => {

    const { phoneNo, email, title,description, tag, uploadDate, isApproved, approvedBy, approvedDate} = req.body;

    const researchPapers = await Research.create({
        contactInfo: {
            phoneNo,
            email
        },
        title,
        description,
        tag,
        uploadDate,
        isApproved,
        approvedBy,
        approvedDate
    })

    res.status(200).json({
        success: true,
        researchPapers,
        message: 'Research Papers Added'
    })
}

//get ResearchPapers
exports.getResearchPapers = async (req, res, next) => {

    const researchPapers = await Research.findById(req.params.id);

    if (!researchPapers){
        return res.status(404).json({
            success: false,
            message: 'Research Papers Not Found'
        })
    }
    
    res.status(200).json({
        success: true,
        researchPapers,
        message: 'Get Research Papers'
    })
}

//update ResearchPapers
exports.updateResearchPapers = async (req, res, next) => {

    let researchPapers = await Research.findById(req.params.id);

    if (!researchPapers){
        return res.status(404).json({
            success: false,
            message: 'Research Papers Not Found'
        })
    }

    researchPapers = await Research.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        researchPapers,
        message: 'Update Successfull'
    })

}

//remove ResearchPapers
exports.deleteResearchPapers = async (req, res, next) => {

}