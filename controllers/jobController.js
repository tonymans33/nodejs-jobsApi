const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {

    try{
        const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt')
        res.status(StatusCodes.OK).json({jobs : jobs, count : jobs.length})
        
    } catch (e){
        return res.status(StatusCodes.BAD_REQUEST).json({message : e.message})
    }
    
}

const getJob = async (req, res) => {

    const {user : { userId }, params: { id: jobId }} = req

    try{
        const job = await Job.findOne({_id: jobId, createdBy : userId})
        res.status(StatusCodes.OK).json({job : job})
    } catch (e){
        return res.status(StatusCodes.NOT_FOUND).json({message : e.message})
    }


}

const createJob = async (req, res) => {

    req.body.createdBy = req.user.userId

    try{
        newJob = await Job.create(req.body)
        res.status(StatusCodes.CREATED).json({job : newJob})
    } catch (e){
        return res.status(StatusCodes.BAD_REQUEST).json({message : e.message})
    }

}

const updateJob = async (req, res) => {

    const {body : {company, position}, user : {userId}, params: {id: jobId} } = req
    if(company === '' || position === ''){
        return res.status(StatusCodes.BAD_REQUEST).json({message : 'Company, position cannot be empty'})
    }

    try { 
        const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {new : true, runValidators: true})
        res.status(StatusCodes.OK).json({job : job})
    }catch (e){
        return res.status(StatusCodes.BAD_REQUEST).json({message : e.message})
    }

}

const deleteJob = async (req, res) => {
    const {user : userId, params : {id : jobId}} = req
    try{
        await Job.findOneAndDelete({_id : jobId, createdBy : userId})
        res.status(StatusCodes.OK).json({message : 'Job has been successfully deleted '})
    }catch (e){
        return res.status(StatusCodes.BAD_REQUEST).json({message : e.message})
    }
}



module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }