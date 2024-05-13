import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUsers, removeUser } from '../../Redux/users';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal/Modal';

const TableOne = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const [newUserName, setNewUserName] = useState('')
  const [newUserJob, setNewUserJob] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const deleteHandler = (id) => {
    Swal.fire({
      title: "delete user",
      text: "Are you sure?",
      focusConfirm: false,
      focusCancel: true,
      showCancelButton: true,
      cancelButtonText: 'NO',
      cancelButtonColor: 'red',
      icon: "error"
    }).then(res => {
      if (res.isConfirmed) {
        dispatch(removeUser(id)).then(res => {
          if (res.meta.requestStatus == "fulfilled") {
            Swal.fire({
              title: 'user successfully deleted',
              icon: 'success',
              timer: 3000
            })

          } else {
            Swal.fire({
              title: 'deleteding user was unsuccessful ',
              icon: 'warning',
              timer: 3000
            })
          }
        })
      }
    })
  }

  const createHandler = (e) => {
    e.preventDefault()
    if (newUserName && newUserJob) {
      let userInfo = {
        name: newUserName,
        job: newUserJob
      }
      dispatch(createUser(userInfo))
        .then(res => {
          if (res.payload.status == 201) {
            Swal.fire({
              title: 'user successfully added',
              text: 'though it would not be remaining, due to using a fake API :(',
              icon: 'success',
              timer: 3000
            })
          } else {
            Swal.fire({
              title: 'creating user was unsuccessful',
              text: res.payload.statusText,
              icon: 'error',
              timer: 3000
            })
          }
        })
    } else {
      Swal.fire({
        title: 'invalid name or job!',
        text: 'try using valid values for name and job',
        icon: 'warning',
        timer: 3000
      })
    }
  }
  const [singleUserInfos, setSingleUserInfos] = useState('')

  const viewModal = (user) => {
    setSingleUserInfos(user)
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
  }

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-6">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add New User
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  First name
                </label>
                <input
                  onChange={e => setNewUserName(e.target.value)}
                  value={newUserName}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  job
                </label>
                <input
                  onChange={e => setNewUserJob(e.target.value)}
                  value={newUserJob}
                  type="text"
                  placeholder="Enter your job title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <button onClick={(e) => createHandler(e)} className="flex w-full justify-center rounded bg-primary p-3 mt-9 font-medium text-gray hover:bg-opacity-90">
              Add New User
            </button>
          </div>
        </form>
      </div>


      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Users
        </h4>
        {
          isModalVisible && <Modal {...singleUserInfos} closeModal={()=> console.log('hello')} />
        }
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                avatar
              </h5>
            </div>
            <div className="p-2 xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                first name
              </h5>
            </div>
            <div className="p-2 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                last name
              </h5>
            </div>
            <div className="hidden p-2 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                email
              </h5>
            </div>
            <div className="hidden p-2 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                delete
              </h5>
            </div>
            <div className="hidden p-2 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                view / edit
              </h5>
            </div>
          </div>

          {
            users.length == 0 ? (
              <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                      fill="#FBBF24"
                    ></path>
                  </svg>
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    no users found !
                  </h5>
                  <p className="leading-relaxed text-[#D0915C]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when
                  </p>
                </div>
              </div>
            ) : (
              users.map((user, key) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-6 ${key === users.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                    }`}
                  key={key}
                >
                  <div className="flex items-center justify-center p-2 xl:p-4">
                    <img src={user.avatar} alt="user-avatar" className='w-1/2 rounded-full' />
                  </div>

                  <div className="flex items-center gap-3 p-2 xl:p-4">
                    <div className="flex-shrink-0">
                      <p className="text-black dark:text-white">{user.first_name}</p>
                    </div>
                    <p className="hidden text-black dark:text-white sm:block">
                      {user.firstname}
                    </p>
                  </div>

                  <div className="flex items-center text-center justify-center p-2 xl:p-4">
                    <p className="text-black dark:text-white">{user.last_name}</p>
                  </div>

                  <div className="hidden items-center justify-center p-2 sm:flex xl:p-4">
                    <p className="text-black dark:text-white line-clamp-1">{user.email}</p>
                  </div>

                  <div className="hidden items-center justify-center p-2 sm:flex xl:p-4">
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center rounded-md border border-rose py-2 px-4 text-center font-medium text-rose opacity-90 hover:opacity-100 lg:px-6 xl:px-8"
                      onClick={() => deleteHandler(user.id)}
                    >
                      delete
                    </Link>
                  </div>

                  <div className="hidden items-center justify-center p-2 sm:flex xl:p-4">
                    <Link
                      to="#"
                      className="inline-flex items-center justify-center rounded-md border py-2 px-4 text-center font-medium opacity-90 hover:opacity-100 lg:px-6 xl:px-8"
                      onClick={() => viewModal(user)}
                    >
                      details
                    </Link>
                  </div>
                </div>
              ))
            )
          }

        </div>
      </div>
    </DefaultLayout>
  );
};

export default TableOne;
