import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const UserInfo = () => {
   const [userInformation, setUserInformation] = useState([]);
   const [updateInfo, setUpdateInfo] = useState({});
   const [email, setEmail] = useState('');
   const [userName, setUserName] = useState('');
   const [isEdit, setIsEdit] = useState(false);
   const id = uuidv4();

   const userInfo = {
      id,
      userName,
      email,
   };

   // reset input function
   const resetFrom = () => {
      setEmail('');
      setUserName('');
   };

   // add user function
   const handleAddUser = (e) => {
      e.preventDefault();
      if (email === '' || userName === '') {
         alert('UserName or Email can not leave empty');
      } else if (userInformation.some((item) => item.email === email)) {
         return alert('email already exit') || setEmail('');
      } else {
         //  const newUserInfo = [userInfo, ...userInformation];
         //  setUserInformation(newUserInfo);
         const newUserInfo = [...userInformation, userInfo];
         userInformation.push(userInfo);
         setUserInformation(newUserInfo);
         resetFrom();
         setIsEdit(false);
      }
   };

   // edit info
   const editUserInfo = (id) => {
      const updateUser = userInformation.find((item) => item.id === id);
      setUserName(updateUser.userName);
      setEmail(updateUser.email);
      setIsEdit(true);
      console.log(updateUser);
   };

   // update info
   const handleUpdate = (e) => {
      e.preventDefault();
      setUpdateInfo(userInfo);

      // setIsEdit(false);
      resetFrom();
   };

   // delete userInfo
   const deleteUserInfo = (id) => {
      const updateUser = userInformation.filter((item) => item.id !== id);
      setUserInformation(updateUser);
   };

   return (
      <div className='container'>
         <div className='row justify-content-center my-5'>
            <div className='col-md-5 p-5'>
               <div className='text-center text-uppercase'>
                  {isEdit ? <h5>Edit User</h5> : <h5>Add User</h5>}
               </div>
               <form>
                  <div className='form-group my-3'>
                     <label>User Name</label>
                     <input
                        type='text'
                        name='userName'
                        id=''
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='form-control py-2 px-3 rounded-0'
                        placeholder='Enter Name'
                     />
                  </div>
                  <div className='form-group my-3'>
                     <label>User Email</label>
                     <input
                        type='email'
                        name='email'
                        id=''
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control py-2 px-3 rounded-0'
                        placeholder='Enter Email'
                     />
                  </div>
                  <div className='form-group'>
                     {/* <button
                        onClick={!isEdit ? handleAddUser : handleUpdate}
                        className={
                           !isEdit
                              ? 'py-2 px-5 rounded-1 btn btn-primary fw-bolder'
                              : 'py-2 px-5 rounded-1 btn btn-success fw-bolder'
                        }>
                        {!isEdit ? 'Add User' : 'Update'}
                     </button> */}
                  </div>
                  {!isEdit ? (
                     <div className='form-group'>
                        <button
                           onClick={handleAddUser}
                           className='form-control py-2 px-3 rounded-0 btn btn-primary fw-bolder'>
                           Add User
                        </button>
                     </div>
                  ) : (
                     <div className='form-group'>
                        <button
                           onClick={handleUpdate}
                           className='form-control py-2 px-3 rounded-0 btn btn-success fw-bolder'>
                           Update User
                        </button>
                     </div>
                  )}
               </form>
            </div>
         </div>

         <div className='text-center mt-5'>
            {userInformation.length === 0 ? (
               <h3 className='text-uppercase fw-bolder my-5'>Add some users</h3>
            ) : (
               <h3 className='text-uppercase fw-bolder mt-5 mb-3'>
                  user information table
               </h3>
            )}

            {userInformation.length !== 0 && (
               <div className='table-responsive'>
                  <table className='table table-bordered'>
                     <thead>
                        <tr>
                           <th>Index</th>
                           <th>User Name</th>
                           <th>Email</th>
                           <th colSpan='2'>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {userInformation.map((item, index) => (
                           <tr key={item.id}>
                              <td>{(index = index + 1)}</td>
                              <td>{item.userName}</td>
                              <td>{item.email}</td>
                              <td
                                 onClick={() => editUserInfo(item.id)}
                                 style={{ cursor: 'pointer' }}
                                 className='bg-primary text-white'>
                                 Edit
                              </td>
                              {/* <td className='bg-warning text-dark'>
                                 <Link
                                    to='/edit_info'
                                    className='d-block'
                                    style={{
                                       textDecoration: 'none',
                                       cursor: 'pointer',
                                    }}
                                    state={{
                                       id: item.id,
                                       userName: item.userName,
                                       email: item.email,
                                    }}>
                                    Edit
                                 </Link>
                              </td> */}
                              <td
                                 onClick={() => deleteUserInfo(item.id)}
                                 style={{ cursor: 'pointer' }}
                                 className='bg-danger text-white'>
                                 Delete
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </div>
   );
};

export default UserInfo;
