import React, { useState } from 'react'
import Sidebar from "../Sidebar/index"
import axios from 'axios'
import { baseUrl } from '../../BaseUrl'

const Index = () => {

    const [data, setData] = useState({
        departmentName:"",
        categoryName:"",
        location:""
    })
    const token = localStorage.getItem("token")

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value }) 
    }

    const Onsubmit = async (e) => {
        e.preventDefault()
        if(data.departmentName&&data.categoryName && data.location){
        try {
            const res = await axios.post(`${baseUrl}/department/insert`, data,{
                headers:{
                    Authorization:token
                }
            })
            setTimeout(() => {
                window.location="/dashboard"
            }, 2000);
        } catch (error) {
            console.log("error", error)
        }
    }
        else{
            alert("Please Fill The Field!!")
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className='w-[100%]'>
                <form className='lg:w-[35%] md:w-[45%] sm:w-[55%] w-[70%] m-auto bg-gray-300 md:px-12 px-10 py-10  my-40 rounded-lg'>
                    <h1 className='text-[30px] font-bold'>Add Department</h1>
                        <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Department Name</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='departmentName' onChange={handleInput} value={data.departmentName} >
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
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='categoryName' onChange={handleInput} value={data.categoryName} >
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
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='location' onChange={handleInput} placeholder="Enter location" value={data.location}/>
                        </div>
                        <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Salary</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='salary' onChange={handleInput} placeholder="Enter salary" value={data.salary}/>
                        </div>
                        <button type="submit" className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "  onClick={Onsubmit}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Index