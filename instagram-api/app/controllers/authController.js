const { STATUSCODE } = require("../config/constant");
const UserService = require("../services/auth.service");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const authService = require("../services/auth.service");
const otpStorageService = require("../services/otpStorage.service");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { getAuthToken, validAuthToken } = require("../helper/jwt");

// email send transporter
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     logger: true,
//     debug: true,
//     secureConnection: false,
//     ignoreTLS: true,
//     auth: {
//         user: 'catalina.jacobs10@ethereal.email',
//         pass: 'vtCrDPKMwgemW6FnWv'
//     }
// });

// const sendOTPVerificationEmail = async({email},res)=>{
//     try{
//         const otp = `${Math.floor(1000 + Math.random() * 9000)}`
//         const mailOptions = {
//             from: process.env.AUTH_EMAIL,
//             to: email,
//             subject: "Verify Your Email",
//             html:`<p>Hello User,</p><p>Your Otp for verification is <b>${otp}</b>. Use this OTP for verify your instagram account and complate signup process.</p><p>Thank You</p>`
//         }
//         let sent = await transporter.sendMail(mailOptions);
//         console.log("mail send.....",sent.messageId)
//         return res.json({msg:"Verification OTP mail sent", otp:otp})
//     }
//     catch(e){
//         return res.status(STATUSCODE.internal)
//     }
// }

// twillo config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require("twilio")(accountSid, authToken);

const signup = async (req, res) => {
  console.log("signup called ...", req.body);
  try {
    let checkUser = await UserService.findOne(["id", "email"], {
      [Op.or]: [
        {
          username: req.body.username,
        },
        {
          email: req.body.email,
        },
      ],
    });
    if (checkUser) {
      return res.status(STATUSCODE.notAcceptable).json({
        msg: "username and email alerady use",
      });
    }
    let data = {
      username: req.body.username,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    let user = await UserService.create(data);
    if (user) {
      // const gotp = await sendOTPVerificationEmail(req.body.email, res)

      // generate otp
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      let toNumber = "+91" + req.body.mobile;

      //save otp in db
      await otpStorageService.create({
        userId: user.id,
        otp: otp,
      });

      //send otp on phone number via sms
      await client.messages
        .create({
          body: `Hi there, Your OTP is <b>${otp}</b> for complate signup process of instagram`,
          from: fromNumber,
          to: toNumber,
        })
        .then((message) => console.log(message.sid));

      return res.status(STATUSCODE.success).json({
        msg: "Data Saved",
        data: user,
      });
    } else {
      return res.status(STATUSCODE.failure).json({
        msg: "Bad Request",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
    });
  }
};

const otpverify = async (req, res) => {
  try {
    console.log(req);
    let user_otp = req.body.otp;
    let userId = req.body.userId;
    let otpObj = await otpStorageService.findOne(["otp"], { userId: userId });

    if (otpObj.otp === user_otp) {
      let userObj = await authService.update(
        { id: req.body.userId },
        { isActive: true }
      );
      if (userObj) {
        return res.status(STATUSCODE.success).json({
          msg: "Verification is Complate. Your Account is Activate now.",
        });
      } else {
        return res.status(STATUSCODE.failure);
      }
    } else {
      return res.status(STATUSCODE.notAcceptable).json({
        msg: "OTP is wrong. Please Enter Correct OTP",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    let user = await authService.findOne(
      ["id", "username", "email", "password", "isActive", "isFirstTime"],
      {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.username },
        ],
      }
    );
    if (user) {
      if (user.isActive) {
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (passwordIsValid) {
          let token = await getAuthToken({
            id: user.id,
            username: user.username,
            email: user.email,
          });

          return res.status(STATUSCODE.success).json({
            msg: "Login Sucessfully",
            data: { user: user, auth_token: token },
          });
        } else {
          res.status(STATUSCODE.notAcceptable).json({
            msg: "Password is Invalid",
          });
        }
      } else {
        res.status(STATUSCODE.notAcceptable).json({
          msg: "User is not Active. Please Verify Your Account.",
        });
      }
    } else {
      res.status(STATUSCODE.failure).json({
        msg: "Username or Email not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const userdetails = async (req, res) => {
  try {
    let user = await UserService.findOne(
      ["id", "username", "firstname", "lastname", "email", "mobile"],
      { id: req.params.userId }
    );
    if (user) {
      return res
        .status(STATUSCODE.success)
        .json({ msg: "Fatch User sucessfull", user: user });
    }
    return res.status(STATUSCODE.failure).json({ msg: "User not found" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let allusers = await UserService.findAll(
      ["id","username", "firstname", "lastname"],
      {
        isActive: 1,
      }
    );
    if (allusers)
      return res
        .status(STATUSCODE.success)
        .json({ msg: "Fatch All users", allusers: allusers });
    return res.status(STATUSCODE.failure).json({ msg: "Font found Users" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

module.exports = {
  signup: signup,
  login: login,
  otpverify: otpverify,
  userdetails: userdetails,
  getAllUsers: getAllUsers,
};
