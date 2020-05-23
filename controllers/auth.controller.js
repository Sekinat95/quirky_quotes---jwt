import dotenv from 'dotenv';
import users from '../models/users.model';
import jwt from 'jsonwebtoken';

dotenv.config()
const authController = {};
let refreshTokens = []

authController.login = (req, res) => {
  const useremail = req.body.email
  const user = {email: useremail}

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  //res.json({accessToken: accessToken, refreshToken: refreshToken})
  res.accessToken =  accessToken
  res.refreshToken = refreshToken
  users.findByEmail(req.body.email).then((result) => {
    res.status(200).render('loginsub', {
      content: result
    });
  })
}


//middleware to authenticate token
const authenticateToken = (req, res, next)=>{
   const authHeader = req.headers['authorization'] // has the format: Bearer TOKEN
   const token = authHeader && authHeader.split(' ')[1] //split bearer and token with a space. get token(second param)
  // Bearer TOKEN
  if(token==null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) return res.sendStatus(403)

      req.user = user
      next()
  })
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
}



export default authController;