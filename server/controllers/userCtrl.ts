import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validEmail, validPassword } from '../utils/validator'
import User from '../models/User'
import { generateToken } from '../utils/generateToken'
import { IDecodedToken, IReqUser } from '../utils/interface'

const userCtrl = {
  register: async(req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body
      if (!name || !email || !password) {
        res.status(400).json({ msg: 'Please provide required field for registration purpose' })
        return
      }

      if (!validEmail(email)) {
        res.status(400).json({ msg: 'Please provide valid email address for registration purpose' })
        return 
      }

      if (!validPassword(password)) {
        res.status(400).json({ msg: 'Password should be combination of lowercase, uppercase, number, symbol, and minimum 8 characters' })
        return
      }

      const user = await User.findOne({ email })
      if (user) {
        res.status(400).json({ msg: `${email} has been registered to our system before` })
        return
      }

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = new User({
        name,
        email,
        password: passwordHash
      })
      await newUser.save()

      res.status(200).json({
        msg: `${email} has been registered successfully at our system`
      })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  login: async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        res.status(400).json({ msg: 'Please provide required field for login purpose' })
        return
      }

      if (!validEmail(email)) {
        res.status(400).json({ msg: 'Please provide valid email address for login purpose' })
        return
      }

      const user = await User.findOne({ email })
      if (!user) {
        res.status(401).json({ msg: 'Invalid credential' })
        return
      }

      const checkPassword = await bcrypt.compare(password, user.password)
      if (!checkPassword) {
        res.status(401).json({ msg: 'Invalid credential' })
        return
      }

      const accessToken = generateToken({ id: user._id }, 'accessToken')
      const refreshToken = generateToken({ id: user._id }, 'refreshToken')

      res.cookie('slc', refreshToken, {
        httpOnly: true,
        path: '/api/v1/user/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      res.status(200).json({
        msg: `Authenticated as ${user.name}`,
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  logout: async(req: Request, res: Response) => {
    try {
      res.clearCookie('slc', {
        path: '/api/v1/user/refresh_token'
      })

      res.status(200).json({ msg: 'Logout success' })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  refreshToken: async(req: Request, res: Response) => {
    try {
      const { slc: token } = req.cookies

      if (!token) {
        res.status(401).json({ msg: `${process.env.IGNORE_ERR}` })
        return
      }

      const decoded = <IDecodedToken>jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
      if (!decoded.id) {
        res.status(401).json({ msg: `${process.env.IGNORE_ERR}` })
        return
      }

      const user = await User.findById(decoded.id)
      if (!user) {
        res.status(401).json({ msg: `${process.env.IGNORE_ERR}` })
        return
      }

      const accessToken = generateToken({ id: user._id }, 'accessToken')
      const refreshToken = generateToken({ id: user._id }, 'refreshToken')

      res.cookie('slc', refreshToken, {
        path: '/api/v1/user/refresh_token',
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      res.status(200).json({
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  },
  changePassword: async(req: IReqUser, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body

      const user = await User.findById(req.user?._id)
      if (!user) {
        res.status(400).json({ msg: 'An error occured when trying to retrieve user data' })
        return
      }

      const isOldPwMatch = await bcrypt.compare(oldPassword, user.password)
      if (!isOldPwMatch) {
        res.status(400).json({ msg: 'Current password is incorrect' })
        return
      }

      const newPw = await bcrypt.hash(newPassword, 12)
      user.password = newPw
      await user.save()

      res.status(200).json({ msg: 'Password has been changed successfully' })
    } catch (err: any) {
      res.status(500).json({ msg: err.message })
    }
  }
}

export default userCtrl