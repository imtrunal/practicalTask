const Assign = require("../model/assign.model")
const Department = require("../model/department.model")
const Auth = require("../model/auth.model")
const status = require("http-status")

exports.insertAssign = async (req, res) => {
    try {

        const findDepartmentData = await Department.findOne({ _id: req.params.department_id })

        if (findDepartmentData == null) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "DEPARTMENT DOES NOT FOUND !",
                    status: false,
                    code: 404
                }
            )

        } else {

            const findEmployeeData = await Auth.findOne({ _id: req.params.emp_id, role: 1 })

            if (findEmployeeData == null) {

                res.status(status.NOT_FOUND).json(
                    {
                        message: "EMPLOYEE DOES NOT FOUND !",
                        status: false,
                        code: 404
                    }
                )

            } else {

                const findAssignData = await Assign.findOne({ departmentId: req.params.department_id, employeeID: req.params.emp_id })

                if (findAssignData) {

                    res.status(status.NOT_FOUND).json(
                        {
                            message: "EMPLOYEE ALREADY EXIST IN THIS DEPARTMENT !",
                            status: false,
                            code: 404
                        }
                    )

                } else {

                    const assignDetails = new Assign({
                        departmentId: req.params.department_id,
                        employeeID: req.params.emp_id
                    })
                    const saveData = await assignDetails.save()

                    res.status(status.CREATED).json(
                        {
                            message: "SUCCESSFULLY ASSIGNED DEPARTMENT TO EMPLOYEE !",
                            status: true,
                            code: 201,
                            data: saveData
                        }
                    )

                }

            }

        }

    } catch (error) {
        console.log("insertAssign::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.viewDepartmentByEmployee = async (req, res) => {
    try {

        const findAssignData = await Assign.find({ employeeID: req.params.emp_id })

        if (findAssignData[0] == undefined) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "NOT A SINGLE DEPARTMENT HAS BEEN ASSIGNED TO YOU!",
                    status: false,
                    code: 404
                }
            )

        } else {

            const dataArr = []
            for (const findDepartmentData of findAssignData) {

                const findDepartment = await Department.findOne({ _id: findDepartmentData.departmentId })

                const response = {
                    departmentName : findDepartment.departmentName,
                    categoryName: findDepartment.categoryName,
                    location: findDepartment.location,
                    salary: findDepartment.salary
                }
                dataArr.push(response)

            }

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT VIEW SUCCESSFULLY !",
                    status: true,
                    code: 200,
                    data: dataArr
                }
            )

        }

    } catch (error) {
        console.log("viewDepartmentByEmployee::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }
}

exports.viewEmployeeByDepartment = async (req, res) => {
    try {

        const findAssignData = await Assign.find({ departmentId: req.params.dep_id })

        if (findAssignData[0] == undefined) {

            res.status(status.NOT_FOUND).json(
                {
                    message: "NOT A SINGLE DEPARTMENT HAS BEEN ASSIGNED TO EMPLOYEE!",
                    status: false,
                    code: 404
                }
            )

        } else {

            const dataArr = []
            for (const findEmployeeData of findAssignData) {

                const findEmployee = await Auth.findOne({ _id: findEmployeeData.employeeID })
                console.log("findEmployee", findEmployee);

                const response = {
                    firstName : findEmployee.firstName,
                    lastName: findEmployee.lastName,
                    gender: findEmployee.gender,
                    hobbies: findEmployee.hobbies,
                    email: findEmployee.email,
                    password: findEmployee.password
                }
                dataArr.push(response)

            }

            dataArr.sort(function(a, b) {
                if (a.firstName < b.firstName) {
                  return 1;
                }
                if (a.firstName > b.firstName) {
                  return -1;
                }
                return 0;
              });

            res.status(status.OK).json(
                {
                    message: "DEPARTMENT VIEW SUCCESSFULLY !",
                    status: true,
                    code: 200,
                    data: dataArr
                }
            )

        }

    } catch (error) {
        console.log("viewDepartmentByEmployee::error", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: false,
            code: 500
        })
    }

}