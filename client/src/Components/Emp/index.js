import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../BaseUrl';
import Sidebar from '../Sidebar/index'

const Employee = () => {
    const [data, setData] = useState();
    const [dept, setDept] = useState();
    const [open, setOpen] = useState(0);
    const [empid, setEmpid] = useState();
    const [deptid, setDeptId] = useState();
    const token = localStorage.getItem("token")

    console.log("token", token);

    const AllEmpData = async () => {
        try {
            const data = await axios.get(`${baseUrl}/auth/view-employee`)
            setData(data.data.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    const GetDepartmentData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/department/view-all`, {
                headers: {
                    Authorization: token
                }
            });
            setDept(res.data.data)
        } catch (error) {
            console.log("error", error)
        }
    }

    const AssignDept = async () => {

        try {

            const response = await axios.post(`${baseUrl}/assign/insert/${deptid}/${empid}`, {}, {
                headers: {
                    Authorization: token
                }
            });
            setOpen(0)
        } catch (error) {
            console.log("errorr", error);
        }
    }

    useEffect(() => {
        AllEmpData();
        GetDepartmentData();
    }, [])
    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className='flex justify-end'>
                    <button className='bg-black text-[white] px-3 py-1 rounded' onClick={() => { localStorage.removeItem("token"); window.location = "/" }}>logout</button>
                </div>
                <h1 className='text-[30px] my-10 font-bold'>Employee List</h1>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs  uppercase bg-black text-[white] ">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-start">
                                    Employee Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hobbies
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data ? data.map((val, index) => {
                                    return (
                                        <>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                <td className="px-6 py-4">
                                                    {val.firstName}  {val.lastName}
                                                </td>
                                                <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.gender == "1" && "Male"}
                                                    {val.gender == "2" && "Female"}
                                                    {val.gender == "3" && "Other"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.hobbies[0] && val.hobbies[0]},{val.hobbies[1] && val.hobbies[1]}
                                                </td>
                                                <td className="px-6 py-4 flex gap-3">
                                                    <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className='block text-white bg-blue-700 hover:bg-blue-800 rounded text-sm px-3 py-1 mx-1 text-center' onClick={() => { setOpen(1); setEmpid(val._id) }}>Assign</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                }) : <tr colSpan="4" >
                                    <h1 className='text-[30px] font-bold text-center'>Data Not Fount</h1>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {/* update modal box start */}
                {
                    open === 1 && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-[100%] flex justify-center" >
                                        <div className="flex justify-self-center">
                                            <div className="mt-3 text-center flex flex-col w-[100%]  justify-self-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-center font-semibold leading-6 text-gray-900" id="modal-title">Select Department </h3>

                                                <div className="mt-2 flex flex-col gap-3 justify-center">
                                                    <select className='w-[100%] rounded' onChange={(e) => { setDeptId(e.target.value) }}>
                                                        <option>choose</option>
                                                        {
                                                            dept && dept.map((val) => {
                                                                return (
                                                                    <option value={val._id}>{val.departmentName}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <button className='bg-[#000] text-[#fff]' onClick={AssignDept}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => { setOpen(0) }}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* update modal box end */}
            </div>
        </>
    )
}

export default Employee