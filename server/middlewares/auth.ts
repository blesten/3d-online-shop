import { IDecodedToken, IReqUser } from './../utils/interface'
import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from './../models/User'

export const isAuthenticated = async(req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      res.status(403).json({ msg: 'Access forbidden.' })
      return
    }

    const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    if (!decoded.id) {
      res.status(403).json({ msg: 'Access forbidden.' })
      return
    }
    
    const user = await User.findById(decoded.id)
    if (!user) {
      res.status(403).json({ msg: 'Access forbidden.' })
      return
    }

    req.user = user
    next()
  } catch (err: any) {
    res.status(500).json({ msg: err.message })
  }
}