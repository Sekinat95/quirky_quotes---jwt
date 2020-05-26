// const signupController = (req, res, next) => {
//  // checks if user already exists
//   userModel.findOne(req.body.email)
//   .then((result) =>{
//     if (result) {
//       res.status(400).send('email already exists')
//     } else {
//       const {
//         email, name, password, age, bloodType, genotype, nextofkinNum, emergencyNum,
//         knownIllnesses, state, city, lga, residentialAdd
//       } = req.body;
//       if (!email && !password) {
//         res.status(400).json({
//           status: 'error',
//           error: 'Email and password field cannot be empty'
//         });
//         return;
//       }
//       const hashedPassword = encoder.hash(password, 9);
//       const creationDate = new Date().toLocaleDateString;
//       const dbData = {
//         email,
//         password: hashedPassword,
//         name,
//         age,
//         bloodType,
//         genotype,
//         nextofkinNum,
//         emergencyNum,
//         knownIllnesses,
//         state,
//         city,
//         lga,
//         residentialAdd,
//         creationDate
//       };   
//       // inside the database operation, store the jwt
//       userModel.createUser(dbData)
//       .then((result1) => {
//         // create a token to send back to the user
//         const token = jwt.sign({
//           sub: 'the user id from the dB'
//         }, process.env.TOKENKEY, { expiresIn: 1440 });
//         const { _id: userId } = result1;
//         // the body to send to front end
//         const responseBody = {
//           status: 'Success',
//           data: {
//             message: 'Your account has been successfully created',
//             token,
//             userId
//           }
//         };
//         res.status(200).json(responseBody);
//       });
//     }
//   })
// };