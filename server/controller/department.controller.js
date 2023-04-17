const Department = require("../model/department.model")
const Assign = require("../model/assign.model")
const Auth = require("../model/auth.model")
const status = require("http-status")

exports.insertDepartment = async (req, res) => {
    try {

        const findDepartmentData = await Department.findOne({ departmentName: req.body.departmentName, categoryName: req.body.categoryName })

        if (findDepartmentData) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "THIS DEPARTMENT IS ALREADY EXIST !",
                    status: false,
                    code: 404
                }
            )

        } else {

            const departmentDetails = new Department({
                departmentName: req.body.departmentName,
                categoryName: req.body.categoryName,
                location: req.body.location,
                salary: req.body.salary
            })
            const saveData = await departmentDetails.save()

            res.status(status.CREATED).json(
                {
                    message: "DEPARTMENT INSERT SUCCESSFULLY !",
                    status: true,
                    code: 201,
                    data: saveData
                }
            )

        }

    } catch (error) {
        console.log("insertDepartment::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.updateDepartment = async (req, res) => {
    try {

        const findDepartmentData = await Department.findOne({ _id: req.params.id })

        if (findDepartmentData == null) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "DEPARTMENT DOES NOT FOUND !",
                    status: false,
                    code: 404
                }
            )

        } else {

            const updateData = await Department.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    departmentName: req.body.departmentName,
                    categoryName: req.body.categoryName,
                    location: req.body.location,
                    salary: req.body.salary
                }
            })

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT UPDATE SUCCESSFULLY !",
                    status: true,
                    code: 200
                }
            )

        }

    } catch (error) {
        console.log("updateDepartment::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.deleteDepartment = async (req, res) => {
    try {

        const findDepartmentData = await Department.findOne({ _id: req.params.id })

        if (findDepartmentData == null) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "DEPARTMENT DOES NOT FOUND !",
                    status: false,
                    code: 404
                }
            )

        } else {

            await Department.deleteOne({ _id: req.params.id })
            await Assign.deleteMany({ departmentId: req.params.id })

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT DELETE SUCCESSFULLY !",
                    status: true,
                    code: 200
                }
            )

        }

    } catch (error) {
        console.log("deleteDepartment::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.viewDepartmentById = async (req, res) => {
    try {

        const findData = await Department.findOne({ _id: req.params.id })

        if(findData == null) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "DEPARTMENT DOES NOT FOUND !",
                    status: false,
                    code: 404
                }
            )

        } else {

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT VIEW SUCCESSFULLY !",
                    status: true,
                    code: 200,
                    data: findData
                }
            )
            
        }
        
    } catch (error) {
        console.log("viewDepartmentById::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.viewAllDepartment = async (req, res) => {
    try {

        const { page } = req.query;
        const findAllData = await Department.find({}).limit(5 * 1).skip((page - 1) * 5);
        console.log("findAllData", findAllData);

        if (findAllData[0] == undefined) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "DEPARTMENT DOES NOT FOUND !",
                    status: false,
                    code: 404
                }
            )

        } else {

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT VIEW SUCCESSFULLY !",
                    status: true,
                    code: 200,
                    data: findAllData
                }
            )

        }

    } catch (error) {
        console.log("viewAllDepartment::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.searchByDepName = async (req, res) => {
    try {

        var pattern = `^${req.body.departmentName}`
        const { page } = req.query;

        const findDepartmentData = await Department.find({ departmentName: { $regex: pattern, $options: 'i' } }).limit(5 * 1).skip((page - 1) * 5);

        if (findDepartmentData[0] == undefined) {

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT DOES NOT EXISTS !",
                    status: false,
                    code: 404
                }
            )

        } else {

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT VIEW SUCCESSFULLY !",
                    status: true,
                    code: 200,
                    data: findDepartmentData
                }
            )

        }
        
    } catch (error) {
        console.log("searchByDepName::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.searchByLocation = async (req, res) => {
    try {

        var pattern = `^${req.body.location}`
        const { page } = req.query;

        const findDepartmentData = await Department.find({ location: { $regex: pattern, $options: 'i' } }).limit(5 * 1).skip((page - 1) * 5);

        if (findDepartmentData[0] == undefined) {

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT DOES NOT EXISTS !",
                    status: false,
                    code: 404
                }
            )

        } else {

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT VIEW SUCCESSFULLY !",
                    status: true,
                    code: 200,
                    data: findDepartmentData
                }
            )

        }
        
    } catch (error) {
        console.log("searchByLocation::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}
