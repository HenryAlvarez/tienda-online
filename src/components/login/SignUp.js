import React, { useState } from 'react';
import { auth, firestore } from '../../firebase';
import { Button } from 'antd';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    try {
      // Crear la cuenta de usuario en Firebase Authentication
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Agregar los datos del usuario a la colección "users" en Firestore
      await firestore.collection('users').doc(user.uid).set({
        name,
        email,
        phone,
        address
      });

      console.log('Usuario registrado exitosamente');
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error al registrar el usuario:', error);
    }
  };

  return (
    <div>
      <h3 className='text-center mb-3'>Sign Up</h3>
      <form>
        <div className='row mb-3'>
          <div className='col-6 px-1'>
            <label>
              Email:
              <input className='form-control' type="email" value={email} onChange={handleEmailChange} />
            </label>
          </div>
          <div className='col-6 px-1'>
            <label>
              Password:
              <input className='form-control' type="password" value={password} onChange={handlePasswordChange} />
            </label>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-6 px-1'>
            <label>
              Name:
              <input className='form-control' type="text" value={name} onChange={handleNameChange} />
            </label>
          </div>
          <div className='col-6 px-1'>
            <label>
              Phone:
              <input className='form-control' type="text" value={phone} onChange={handlePhoneChange} />
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 px-1'>
            <label>
              Address:
              <input className='form-control' type="text" value={address} onChange={handleAddressChange} />
            </label>
          </div>
        </div>

        <div className='mt-3 d-flex justify-content-center'>
          <Button style={{minWidth:'150px'}} className='mx-1' type="primary" onClick={handleSignUp}>Crear Cuenta</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
