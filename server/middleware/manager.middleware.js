const Auth = require("../model/auth.model")
const status = require('http-status');
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.verifyManager = async (req, res, next) => {

    const Token = req.headers['authorization'];
    // console.log("Token----", Token);

    if (Token === undefined) {

        // console.log("Token:::", Token);
        res.status(status.OK).json(
            {
                message: "NOT GET TOKEN!",
                status: false,
                code: 403
            }
        )

    } else {

        const decoded = jwt.verify(Token, process.env.SECRET_KEY, async (err, playload) => {
            if (err == 'JsonWebTokenError: jwt malformed') {

                res.status(status.OK).json(
                    {
                        message: "NOT GET TOKEN!",
                        status: false,
                        code: 403
                    }
                )

            } else {
                // console.log("playload", playload);
              next()
            }
        });
    }
}