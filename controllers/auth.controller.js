import dotenv from 'dotenv';
import users from '../models/users.model';
import jwt from 'jsonwebtoken';
import encoder from '../utility/passwordEnc';

dotenv.config()
const authController = {};
let refreshTokens = []

authController.login = (req, res) => {
  const useremail = req.body.email
  const user = {email: useremail}

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  // res.json({ accessToken: accessToken, refreshToken: refreshToken })

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

authController.signup = (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(400).json({
      status: 'error',
      error: 'Email and password field cannot be empty'
    });
    return;
  }
  const hashedPassword = encoder.hash(req.body.password, 9);
  req.body.password = hashedPassword;
  // inside the database operation, store the jwt
  users.createUser(req.body).then((result) => {
    const { _id: userId } = result;
    // create a token to send back to the user
    const token = jwt.sign({
      sub: userId
    }, process.env.TOKENKEY, { expiresIn: 1440 });
    // response body to send to frontend
    const responseBody = {
      status: 'Success',
      data: {
        message: 'Your account has been successfully created',
        token,
        userId
      }
    };
    return res.status(201).json(responseBody);
  })
    .catch((err) => {
      res.status(401).json(err.message);
    });
}

authController.logout = (req, res) => {
  refreshTokens = refreshTokens.filter(token => token!==req.body.token)
  res.sendStatus(204)
}



const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
}

// handleSubmit = (e) => {
//   const uri = this.props.item;
//   const id = this.props.id
//   e.preventDefault();
//   const data = {
//     comment: this.comment.value
//   }
//   const url = `https://teamworksng.herokuapp.com/api/v1/${uri}/${id}/comment`;
//   fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer "+ ls.get('token')
//     },
//     mode: 'cors'
//   })
//   .then( res => res.json())
//   .then ( response => {
//     this.setState({display: ''})
//     this.props.addComment(this.comment.value);
//     this.comment.value = '';
//   });
// }

export default authController;