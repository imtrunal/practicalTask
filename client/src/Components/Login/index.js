import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from "../../BaseUrl"


const Index = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const Onsubmit = async (e) => {
        e.preventDefault()
        try {
          const res =  await axios.post(`${baseUrl}/auth/sign-in`, data)
           localStorage.setItem("token",res.data.token)
           localStorage.setItem("role",res.data.role)
           localStorage.setItem("id",res.data.id)
           console.log("hello",res)
            setTimeout(() => {
                if(res.data.code==200)
                {
                    if(res.data.role=="1")
                {
                    window.location="/employe-deatil"
                }
                else
                {
                    window.location="/dashboard"
                }
                }

            }, 2000);
            if(res.data.status == false){
                alert(res.data.message)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div>
            <div className='w-[100%] '>
                <form className='lg:w-[25%] md:w-[35%] sm:w-[50%] w-[60%] m-auto bg-gray-300 md:px-16 px-10 py-10 lg:my-60 my-40 rounded-lg'>
                    <h1 className='text-[30px] font-bold'>SignIn</h1>
                    <div className="gap-6 mb-6">
                        <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Email</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name="email" placeholder="Enter Email" onChange={handleInput} value={data.email} />
                        </div>
                        <div className='my-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Password</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " name='password' placeholder="Enter Password" onChange={handleInput} value={data.password} />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={Onsubmit}>Login</button>

                    <div className='my-2'>
                        <Link to="/sign-up">Your Member ? <span className='underline'>Signup Now</span></Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Index