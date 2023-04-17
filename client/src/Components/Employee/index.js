import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'flowbite';
import { baseUrl } from '../../BaseUrl'

const Index = () => {

  const [data, setData] = useState("");
  const id = localStorage.getItem("id")

  // all data

  const GetData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/assign/view-department/${id}`);
      setData(res.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    GetData()

  }, [])

  return (
    <div>
   
      <div className="p-4 w-[70%] mx-auto">
        <div className='flex justify-end'>
            <button className='bg-black text-[white] px-3 py-1 rounded' onClick={()=>{localStorage.removeItem("token");window.location="/"}}>logout</button>
        </div>
      <h1 className='text-[30px] my-5'>Your are assign </h1>
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
                       
                      </tr>
                    </>
                  )
                }) : <tr colSpan="4" >
                  <h1 className='text-[30px] font-bold text-center py-4 mx-auto'>Data Not Fount</h1>
                </tr>
              }
            </tbody>
          </table>
        </div>

      </div>

      <div>
      </div>
    </div>
  )
}

export default Index