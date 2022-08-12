import React, { useState } from 'react';
import { fake_data } from '../fake_data/fakeData.js';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faTrashAlt,
   faEdit,
   faSearch,
} from '@fortawesome/free-solid-svg-icons';
import '../scss/Style.scss';

const EmployerInfo = () => {
   const [employData, setEmployData] = useState(fake_data);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [position, setPosition] = useState('');
   const [gender, setGender] = useState('');
   const [editId, setEditId] = useState(null);
   const [edit, setEdit] = useState(false);
   const [search, setSearch] = useState('');
   const uniqueId = uuidv4();

   const employId = uniqueId.slice(0, 13);

   //* object of employ data
   const employ_object = {
      employId,
      name,
      email,
      position,
      gender,
   };

   //* reset Form
   const resetForm = () => {
      setName('');
      setEmail('');
      setPosition('');
      setGender('');
   };

   const addNewEmploy = (e) => {
      e.preventDefault();
      // ! check empty input
      if (name === '' || position === '' || gender === '') {
         alert('Empty Input Is Not Allow Submit');
      }
      // ! check duplicate
      else if (!edit && employData.some((item) => item.email === email)) {
         alert('Duplicate email not allow');
         setEmail('');
      }
      //! add employ info
      else if (!edit) {
         const newData = [...employData, employ_object];
         setEmployData(newData);
         setEdit(false);
         resetForm();
      }
      //! update employ info
      else if (employ_object && editId) {
         const updateEmploy = employData.map((item) => {
            if (item.employId === editId) {
               return { ...item, name, email, position, gender };
            }
            return item;
         });
         setEmployData(updateEmploy);
         setEdit(false);
         resetForm();
      }
   };

   //! edit employ info
   const editEmployInfo = (id) => {
      const updateEmploy = employData.find((item) => item.employId === id);
      setEditId(id);
      setName(updateEmploy.name);
      setEmail(updateEmploy.email);
      setPosition(updateEmploy.position);
      setGender(updateEmploy.gender);
      setEdit(true);
   };

   //! delete employ info
   const deleteEmployInfo = (id) => {
      const deleteEmploy = employData.filter((item) => item.employId !== id);
      setEmployData(deleteEmploy);
   };

   // ! search employ
   const handleSearchEmploy = () => {
      const searchEmploy = employData.filter(
         (item) => item.name.toLocaleLowerCase() === search.toLocaleLowerCase()
      );
      setEmployData(searchEmploy);
   };

   return (
      <div className='container'>
         <div className='row justify-content-center my-5'>
            <div className='col-md-5 p-5'>
               <div className='text-center text-uppercase'>
                  <h4
                     className={
                        !edit
                           ? 'fw-bolder text-success'
                           : 'fw-bolder text-primary'
                     }>
                     {!edit ? 'ADD EMPLOY' : 'EDIT EMPLOY'}
                  </h4>
                  {edit && <p>Edit ID: {editId}</p>}
               </div>
               <form>
                  <div className='form-group my-3'>
                     <label>User Name</label>
                     <input
                        type='text'
                        name='name'
                        id=''
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='form-control py-2 px-3 rounded-1'
                        placeholder='Enter Name'
                     />
                  </div>
                  <div className='form-group my-3'>
                     <label>User Email</label>
                     <input
                        type='text'
                        name='email'
                        id=''
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control py-2 px-3 rounded-1'
                        placeholder='Enter Email'
                     />
                  </div>
                  <div className='form-group my-3'>
                     <label>User Position</label>
                     <input
                        type='text'
                        name='position'
                        id=''
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className='form-control py-2 px-3 rounded-1'
                        placeholder='Enter Position'
                     />
                  </div>
                  <div className='form-group my-3'>
                     <label>User Gender</label>
                     <input
                        type='text'
                        name='gender'
                        id=''
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className='form-control py-2 px-3 rounded-1'
                        placeholder='Enter Gender'
                     />
                  </div>
                  <div className='form-group'>
                     <button
                        onClick={addNewEmploy}
                        className={
                           !edit
                              ? 'btn btn-success px-4 border-1 rounded-1'
                              : 'btn btn-primary px-4 border-1 rounded-1'
                        }>
                        {!edit ? 'Add Employ' : 'Update Employ'}
                     </button>
                  </div>
               </form>
            </div>
         </div>

         <div className='text-center mt-5'>
            {employData.length === 0 ? (
               <h3 className='text-uppercase fw-bolder my-5'>Add some users</h3>
            ) : (
               <div>
                  <h3 className='text-uppercase fw-bolder mt-5 mb-3'>
                     Employ information table
                  </h3>
                  <div className='row justify-content-center my-4 rounded-1'>
                     <div className='col-md-5'>
                        <div className='input-group'>
                           <input
                              type='search'
                              name='search'
                              id=''
                              className='form-control py-2'
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder='Search Employ'
                           />
                           <button
                              className='input-group-text btn btn-primary px-4'
                              onClick={handleSearchEmploy}
                              disabled={search === ''}>
                              <FontAwesomeIcon icon={faSearch} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {employData.length !== 0 && (
               <div className='table-responsive'>
                  <table className='table table-bordered mb-5'>
                     <thead>
                        <tr>
                           <th>Index</th>
                           <th>Id</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Position</th>
                           <th>Gender</th>
                           <th colSpan='2'>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {employData.map((item, index) => (
                           <tr key={item.employId} className='text-capitalize'>
                              <td>{(index = index + 1)}</td>
                              <td
                                 className={
                                    edit &&
                                    editId === item.employId &&
                                    'bg-primary text-white'
                                 }>
                                 {item.employId}
                              </td>
                              <td>{item.name}</td>
                              <td className='text-lowercase'>{item.email}</td>
                              <td>{item.position}</td>
                              <td>{item.gender}</td>
                              <td
                                 onClick={() => editEmployInfo(item.employId)}
                                 style={{ cursor: 'pointer' }}
                                 className='bg-primary text-white px-3'>
                                 <FontAwesomeIcon icon={faEdit} />
                              </td>
                              <td
                                 onClick={() => deleteEmployInfo(item.employId)}
                                 style={{ cursor: 'pointer' }}
                                 className='bg-danger text-white px-3'>
                                 <FontAwesomeIcon icon={faTrashAlt} />
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

export default EmployerInfo;
