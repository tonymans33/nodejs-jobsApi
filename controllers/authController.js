const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')



const register = async (req, res) => {

    try{
        const user = await User.create({...req.body})
        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({user: user, token: token})
    } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: e.message })
    }

}

const login = async (req, res) => {

    const { email, password } = req.body
    
    if(!email || !password){
        // throw new BadRequestError('Please provide email and password')
        return res.status(StatusCodes.BAD_REQUEST).json({"message" : "Please provide email and password"})

    }

    const user = await User.findOne({email})
    if(!user){
        // throw new UnauthenticatedError('Invalid Credentials')
        return res.status(StatusCodes.UNAUTHORIZED).json({"message" : "Invalid Credentials"})
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        // throw new UnauthenticatedError('Invalid Credentials')
        return res.status(StatusCodes.UNAUTHORIZED).json({"message" : "Invalid Credentials"})
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: user, token: token})
}

module.exports = { register, login }