import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../BaseUrl'


const Index = () => {

    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        gender:"",
        hobbies:"",
        role:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const Onsubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${baseUrl}/auth/sign-up`, data)
            console.log("helloo", res)
            if (res.data.status) {
                setTimeout(() => {
                    window.location = "/"
                }, 2000);
            }
            else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    return (
        <div>
            <div className='w-[100%] '>
                <form className='lg:w-[35%] md:w-[45%] sm:w-[55%] w-[70%] m-auto bg-gray-300 md:px-12 px-10 py-10  my-28 rounded-lg'>
                    <h1 className='text-[30px] font-bold'>SignUp</h1>
                    <div className="gap-6 mb-6">
                        <div className='flex gap-4'>
                            <div className='my-3'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 text-start">FirstName</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="firstName" placeholder="Enter firstName" onChange={handleInput} value={data.firstName}/>
                            </div>
                            <div className='my-3'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 text-start">LastName</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='lastName' placeholder="Enter lastName" onChange={handleInput} value={data.lastName}/>
                            </div>
                        </div>
                        <div className='my-3 flex gap-4 '>
                            <div className="flex items-center mb-4">
                                <input  type="radio" value="1" name="gender" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " onChange={handleInput} />
                                <label  className="ml-2 text-[16px] font-medium text-gray-900 dark:text-gray-300">Male</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input type="radio" value="2" name="gender" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " onChange={handleInput} />
                                <label  className="ml-2 text-[16px] font-medium text-gray-900 dark:text-gray-300">Female</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input type="radio" value="3" name="gender" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " onChange={handleInput} />
                                <label  className="ml-2 text-[16px] font-medium text-gray-900 dark:text-gray-300">Other</label>
                            </div>
                        </div>
                        <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Hobbies</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='hobbies' onChange={handleInput} placeholder="Enter Hobbies" value={data.hobbies}/>
                        </div>
                        <div className='my-3 flex gap-4 '>
                            <div className="flex items-center mb-4">
                                <input  type="radio" value="2" name="role" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " onChange={handleInput} />
                                <label  className="ml-2 text-[16px] font-medium text-gray-900 dark:text-gray-300">Manager</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input  type="radio" value="1" name="role" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " onChange={handleInput}/>
                                <label  className="ml-2 text-[16px] font-medium text-gray-900 dark:text-gray-300">Employee</label>
                            </div>
                        </div>
                        <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Email</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='email' placeholder="Enter Email" onChange={handleInput} value={data.email} />
                        </div>
                        <div className='flex gap-4'>
                            <div className='my-3'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Password</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='password' placeholder="Enter Password" onChange={handleInput} value={data.password}/>
                            </div>
                            <div className='my-3'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 text-start">ConfirmPassword</label>
                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='confirmPassword' placeholder="Enter Comfirm Password" onChange={handleInput} value={data.confirmPassword}/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "  onClick={Onsubmit}>Sign Up</button>

                    <div className='my-2'>
                        <Link to="/">You Are already Member ? <span className='underline'>SignIn Now</span></Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Index