const User = require("../model/user.model");
const catchAsync = require("../../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/appError");
const { promisify }= require("util");
//const sendEmail = require("../../utils/email");
//const crypto = require("crypto");


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync( async (req, res, next) => {

    console.log(req.body);
    
    let filter = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    //console.log(process.env);
    const newUser = await User.create(filter);
    
    console.log('new user ',newUser)

    const token = signToken(newUser._id);

    const cookieOptions = {
        // expires: new Date(Date.now() + Number(process.env.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIES_EXPIRES_IN) * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
    res.cookie("jwtExpire", cookieOptions.expires, cookieOptions);

    console.log("jwt", token, cookieOptions);


    
    res.status(201).json({
        status: "success",
        token,
        data : {
            newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    //console.log(req.body);
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new AppError("Please provide email and pasword", 400));
    }
    
    var user = await User.findOne({ email });

    //console.log(user);

    let correctPassword = await  user.correctPassword(password, user.password)
    
    console.log(correctPassword);

    if (!user || !(await  user.correctPassword(password, user.password))) {
       return next( new AppError('Incorrect email or password', 402));
    }

    const token = signToken(user._id);

    const cookieOptions = {
        // expires: new Date(Date.now() + Number(process.env.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIES_EXPIRES_IN) * 60 * 1000),
        httpOnly: true
    };

    //if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    console.log('Expira: ',cookieOptions.expires);

    res.cookie("jwt", token, cookieOptions);
    res.cookie("jwtExpire", cookieOptions.expires, cookieOptions);

    
    const userR={
        userName:user.userName,
        role:user.role,
        Departament:user.Departament
    }
      console.log(userR);
    
    res.status(200).json({
        status: 'success',
        token,
        userR
    })
}); 

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    
    
    //console.log('xhr request ? -->', req.xhr, ` url: ${req.url}`)

    if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log(req.cookies)
   }

   if (!token) {
       console.log("no token  ", req.cookies.jwt);

        if(req.headers.accept === 'application/json'){
            return next( new AppError('You are not logged in! Please log in to get access.', 401 ))
        }

        else {
            return res.redirect("/user/login")
        }
   }
    
    
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

   const CurrentUser = await User.findById(decoded.id);
   if(!CurrentUser) {
       //return res.redirect("/user/login")
       if(req.headers.accept === 'application/json'){
        return next( new AppError('You are not logged in! Please log in to get access.', 401 ))
    }

    else {
        return res.redirect("/user/login")
    }
   }
  /* 
   if(CurrentUser.changePasswordAfter(decoded.iat)) {
       return next(new AppError('User recently changed password, please log in again', 401));
   }
*/
   req.user = CurrentUser;
   console.log('user', req.user);
   next();
});


exports.restricTo = (role) => {
    return (req, res, next) => {

        console.log(role,req.user.role,next,req.user)
        console.log(role[0] !== req.user.role, role[1] !== req.user.role); 
     if(role[0] !== req.user.role && role[1] !== req.user.role) {

         console.log("redirect");

         if(req.headers.accept === 'application/json'){
            return next( new AppError('You are not logged in! Please log in to get access.', 401 ))
        }

        else {
            return res.redirect("/user/login")
        }
        //return next(new AppError('You dont have permission to perform this action', 401 ))
    }
      next();
    }
}


  

exports.logout = async (req, res) => {
    
    res.clearCookie("jwt");

    res.redirect("/user/login")

}

/*
exports.forgotPassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findOne({ email: req.body.email });
    
    if(!user) {
        return next( new AppError(`There is no user with this email adress:${req.body.email}`));
    }
 
    const resetToken = user.createPasswordResetToken();
    
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;

    const message = `Forgot your password? go to the following link:${resetUrl} 
                    and if you don't hope this email go to contac us to protect your account`;

    try {
        await sendEmail({
            email: user.email,
            subject: '¡¡ o_o YOU ONLY HAVE 10 MIN!! to reset your password',
            message
        });                                 
        console.log('are equal ',process.env.EMAIL_PORT === 2525);
        res.status(200).json({
            status: "success",
            message: 'reset link sended to email'
        })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false});
        console.log(err);
        console.log(process.env.EMAIL_PORT, process.env.EMAIL_HOST );

        return next(new AppError('Theres was an error sending the email, please try again, later', 500))

    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({ 
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt : Date.now() }
    });
    
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token
    });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    
    const user = await User.findOne(req.user._id);
    
    if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
        return next(new AppError('Password incorrect if you forget you password click: forgotPassword', 403));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await  user.save();

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token
    });



}



});

*/

exports.restricByDepartament = (Departament) => {
    return (req, res, next) => {

     if(Departament !== req.user.Departament && req.user.role !== 'master') {
         console.log("redirect");

         if(req.headers.accept === 'application/json'){
            return next( new AppError('You are not logged in! Please log in to get access.', 401 ))
            }

        else {
            return res.redirect("/user/login")
        }
        //return next(new AppError('You dont have permission to perform this action', 401 ))
    }
      next();
    }
}


exports.extendSession = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const CurrentUser = await User.findById(decoded.id);
    const token2 = signToken(CurrentUser._id);
    res.cookie('jwt', token2, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    res.status(200).json({
        status: "success",
        token: token2
    })
})

exports.checkSession = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;
    const tokenExpires = req.cookies.jwtExpire;

    if (Date.now() <= (new Date(tokenExpires).getTime() - 5000) ) {
        return res.status(200).json({
            status: "success",
            session: false
        })
    }
    res.status(200).json({
        status: "success",
        session: true
    })
})




