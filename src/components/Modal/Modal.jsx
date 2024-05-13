import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/users';

export default function modal(user, closeModal) {

    const [newUserName, setNewUserName] = useState('')
    const [newUserJob, setNewUserJob] = useState('')
    const dispatch = useDispatch()

    let { id, first_name, last_name, avatar } = user
    console.log(closeModal);

    const formSubmitHandler = event => {
        event.preventDefault()
        if (newUserName && newUserJob) {
            let userInfo = {
                name: newUserName,
                job: newUserJob
            }
            dispatch(updateUser(id, userInfo))
        }
        // closeModal()
    }
    return (
        <>

            {/* <!-- Main modal --> */}
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden bg-black bg-opacity-30  flex content-center justify-center pb-5 top-0 left-0 items-center w-full md:inset-0 h-full max-h-full backdrop-blur-sm fixed inset-0 z-[999] place-items-center transition-opacity duration-300" >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-slate-700 rounded-lg shadow ">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-500 rounded-t">
                            <h3 className="text-xl font-semibold text-slate-300">
                                user infos
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => {}}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5">
                            <img className='mx-auto rounded-full' src={`${avatar}`} alt="user avatar" />
                            <form onSubmit={event => formSubmitHandler(event)} className="space-y-4" action="#">
                                <div>
                                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-slate-300">first name *</label>
                                    <input type="text" name="firstName" id="firstName" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  bg-slate-600" placeholder={`${first_name}`} onChange={e => setNewUserName(e.target.value)} value={newUserName} required />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-slate-300">last name</label>
                                    <input type="text" name="firstName" id="lastName" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  bg-slate-600" placeholder={`${last_name}`} />
                                </div>
                                <div className='pb-5'>
                                    <label htmlFor="job" className="block mb-2 text-sm font-medium text-slate-300">job title *</label>
                                    <input type="text" name="job" id="job" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  bg-slate-600" placeholder={`Enter new job`} onChange={e => setNewUserJob(e.target.value)} value={newUserJob} required />
                                </div>


                                <button type="submit" className="w-full text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex content-center justify-center"><FiEdit className='text-base me-2 ' /> submit changes</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

