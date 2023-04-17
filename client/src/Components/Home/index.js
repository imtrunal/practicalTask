import React, { useEffect, useState } from 'react'
import Sidebar from "../Sidebar/index"
import axios from 'axios';
import 'flowbite';
import { baseUrl } from '../../BaseUrl'
import { Link } from 'react-router-dom';

const Index = () => {

  const [data, setData] = useState("");
  const [page, setPage] = useState("1");
  const [open, setOpen] = useState(0);
  const [id, setId] = useState("");
  const [updateData, setUpdateData] = useState({
    departmentName: "",
    categoryName: "",
    location: ""
  })
  const token = localStorage.getItem("token")

  const handleInput = (e) => {
    const { name, value } = e.target
    setUpdateData({ ...data, [name]: value })
  }



  // all data

  const GetData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/department/view-all?page=${page}&limit=5`, {
        headers: {
          Authorization: token
        }
      });
      setData(res.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  //  get by id

  const departmentById = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/department/view-by-id/${id}`)
      setUpdateData(res.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  // upadte
  const Onsubmit = async (e) => {
    e.preventDefault()
    console.log("updateData", updateData)
    try {
      const res = await axios.put(`${baseUrl}/department/update/${id}`, updateData, {
        headers: {
          Authorization: token
        }
      })
      window.location = "/dashboard"
    } catch (error) {
      console.log("error", error)
    }
  }



  // delete department

  const DeleteDepartment = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/department/delete/${id}`, {
        headers: {
          Authorization: token
        }
      });
      GetData()
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    GetData()

  }, [])
  useEffect(() => {
    GetData()
  }, [page])
  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
      <div className='flex justify-end'>
            <button className='bg-black text-[white] px-3 py-1 rounded' onClick={()=>{localStorage.removeItem("token");window.location="/"}}>logout</button>
        </div>
        <h1 className='text-[30px] my-10 font-bold'>Department List</h1>
        <div className='w-[30%] flex justify-center ml-auto my-2'>
          <div className='my-4'>
            <Link to="/add" className='bg-black text-[white] px-3 py-1 rounded' >add</Link>
          </div>
          <div className='w-[50%] py-3'>
            <p>enter page </p>
          </div>
          <input type='text' placeholder='enter page Number' className="w-[20%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="page" onChange={(e) => setPage(e.target.value)} value={page} />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs  uppercase bg-black text-[white] ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Department name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
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
                          {val.departmentName}
                        </td>
                        <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          {val.categoryName}
                        </td>
                        <td className="px-6 py-4">
                          {val.location}
                        </td>
                        <td className="px-6 py-4">
                          {val.salary}
                        </td>
                        <td className="px-6 py-4 flex gap-3">
                          <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className='block text-white bg-blue-700 hover:bg-blue-800 rounded text-sm px-3 py-1 mx-1 text-center' onClick={() => { setOpen(1); setId(val._id); departmentById(val._id) }}>Update</button>
                          <button className='bg-red-900  text-[white] px-3 py-1 mx-1 rounded' onClick={() => DeleteDepartment(val._id)}>Delete</button>
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

      </div>

      <div>


        {/* update modal box start */}
        {
          open === 1 &&
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-[100%]">
                    <div className="flex justify-center">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <form className='w-[100%] m-auto bg-gray-300 md:px-12 px-10 py-10 mt-5 rounded-lg'>
                          <h1 className='text-[30px] font-bold'>Edit Department</h1>
                          <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Department Name</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='departmentName' onChange={handleInput} value={updateData.departmentName} >
                              <option selected>Choose a Department</option>
                              <option value="HR">HR</option>
                              <option value="IT">IT</option>
                              <option value="sales">Sales</option>
                              <option value="product">Product</option>
                              <option value="Marketing">marketing</option>
                            </select>
                          </div>
                          <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Category Names</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='categoryName' onChange={handleInput} value={updateData.categoryName} >
                              <option selected>Choose a Category</option>
                              <option value="Google ITsoln pvt name">Google ITsoln pvt name</option>
                              <option value="ipangram">ipangram</option>
                              <option value="facebook">facebook</option>
                              <option value="wipro">wipro</option>
                              <option value="wallmart">wallmart</option>
                            </select>
                          </div>
                          <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Location</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='location' onChange={handleInput} placeholder="Enter location" value={updateData.location} />
                          </div>
                          <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Salary</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='salary' onChange={handleInput} placeholder="Enter salary" value={updateData.salary} />
                          </div>
                          <button type="submit" className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={Onsubmit}>Edit</button>
                        </form>
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



      </div>
    </div>
  )
}

export default Index