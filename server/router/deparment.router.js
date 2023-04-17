const router = require('express').Router();
const { verifyManager } = require("../middleware/manager.middleware")

const {
    insertDepartment,
    updateDepartment,
    deleteDepartment,
    viewDepartmentById,
    viewAllDepartment,
    searchByDepName,
    searchByLocation
} = require("../controller/department.controller")

router.post("/insert", verifyManager, insertDepartment)
router.put("/update/:id", verifyManager, updateDepartment)
router.delete("/delete/:id", verifyManager, deleteDepartment)
router.get("/view-by-id/:id", viewDepartmentById)
router.get("/view-all", viewAllDepartment)
router.get("/search-by-dep_name", searchByDepName)
router.get("/search-by-location", searchByLocation)

module.exports = router