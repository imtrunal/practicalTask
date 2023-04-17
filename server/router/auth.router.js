const router = require('express').Router();

const {
    signUp,
    signIn,
    viewAllEmployee
} = require("../controller/auth.controller")

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/view-employee", viewAllEmployee)

module.exports = router
