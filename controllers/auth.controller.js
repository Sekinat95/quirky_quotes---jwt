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
    
    if(req.body.email==='admin' && req.body.password=='admin'){
      res.status(200).render('admin', {
        content: result
      });
    }else{
      res.status(200).render('loginsub', {
        content: result
      });
    }
    
  })
}

authController.logout = (req, res) => {
  refreshTokens = refreshTokens.filter(token => token!==req.body.token)
  res.sendStatus(204)
}



const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
}



export default authController;