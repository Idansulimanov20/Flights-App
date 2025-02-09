import React, { useState } from 'react';
import './Menu.css'; 

const Menu = (props) => {
       const [clicked,setClicked]=useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className='menu'>
        <button className='profile' onClick={() => setClicked((prev) => !prev)} >
          {props.title}
        </button>
        {clicked && (
          <div className='idan'>
         <button className='x' onClick={() => setClicked((prev) => !prev)}>❌</button>
         <div className='inputs'>
           <input
             type='text'
             placeholder='Name'
             value={name}
             onChange={(e) => setName(e.target.value)}
           />

           <input
             type='email'
             placeholder='Email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />

           <input
             type='password'
             placeholder='Password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </div>
         <div className='buttons'>
           <button className='signup'>Sign Up</button>
           <button className='login'>Login</button>
         </div>
          </div>
        )}
      </div>
    );
    }
    

export default Menu;