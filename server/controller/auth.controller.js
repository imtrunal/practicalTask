const Auth = require("../model/auth.model")
const status = require("http-status")
const bcrypt = require("bcrypt")

exports.signUp = async (req, res) => {
    try {

        const data = await Auth.findOne({ email: req.body.email });

        if (data) {

            res.status(status.OK).json(
                {
                    message: "EMAIL ALREADY REGISTRATION !",
                    status: false,
                    code: 409
                }
            )

        }
        else {

            let password = req.body.password;
            let confirmPassword = req.body.confirmPassword

            let hobbies = req.body.hobbies;
            const myArray = hobbies.split(",");

            if (password == confirmPassword) {

                if (password.length >= 8) {

                    const userDetails = new Auth({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        hobbies: myArray,
                        role: req.body.role,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
                    })
                    const saveData = await userDetails.save()

                    res.status(status.CREATED).json(
                        {
                            message: "SIGNUP SUCCESSFULLY !",
                            status: true,
                            code: 201,
                            data: saveData
                        }
                    )

                } else {

                    res.status(status.OK).json(
                        {
                            message: "PASSWORD LENGTH MUST BE MORE THAN 8 DIGITS!",
                            status: false,
                            code: 411
                        }
                    )

                }

            } else {

                res.status(status.OK).json(
                    {
                        message: "PASSWORD & CONFIRM PASSWORD DOES NOT MATCH!",
                        status: false,
                        code: 401
                    }
                )

            }

        }

    } catch (error) {
        console.log("signUp::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.signIn = async (req, res) => {
    try {

        const data = await Auth.findOne({ email: req.body.email })

        if (data) {

            bcrypt.compare(req.body.password, data.password, async (err, comparePassword) => {

                if (comparePassword) {

                    const token = await data.generateauthtoken()
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 300000 * 3),
                        httpOnly: true
                    })

                    const updateToken = await Auth.findByIdAndUpdate({ _id: data._id },
                        {
                            $set: { token: token }
                        })

                    res.status(status.OK).json(
                        {
                            message: "LOGIN SUCCESSFULLY !",
                            status: true,
                            code: 200,
                            token: token,
                            role: data.role,
                            id: data._id
                        }
                    )

                } else {

                    res.status(status.OK).json(
                        {
                            message: "INVALID CREDENCIAL !",
                            status: false,
                            code: 401
                        }
                    )

                }

            })
        } else {

            res.status(status.OK).json(
                {
                    message: "EMAIL DOES NOT REGISTER !",
                    status: false,
                    code: 401
                }
            )

        }
        
    } catch (error) {
        console.log("signUp::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.viewAllEmployee = async (req, res) => {
    try {

        const findData = await Auth.find({ role: 1 })

        if(findData[0] == undefined) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "EMPLOYEE DOES NOT FOUND !",
                    status: false,
                    code: 404
                }
            )

        } else {

            res.status(status.OK).json(
                {
                    message: "EMPLOYEE VIEW SUCCESSFULLY !",
                    status: true,
                    code: 200,
                    data: findData
                }
            )

        }
        
    } catch (error) {
        console.log("viewAllEmployee::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}