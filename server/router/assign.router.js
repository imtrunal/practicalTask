const router = require('express').Router();
const { verifyManager } = require("../middleware/manager.middleware")

const {
    insertAssign,
    viewDepartmentByEmployee,
    viewEmployeeByDepartment
} = require("../controller/assign.controller")

router.post("/insert/:department_id/:emp_id", verifyManager, insertAssign);
router.get("/view-department/:emp_id", viewDepartmentByEmployee)
router.get("/view-employee/:dep_id", viewEmployeeByDepartment)

module.exports = router