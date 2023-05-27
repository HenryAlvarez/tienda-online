import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Button } from 'antd';
import SignUp from './SignUp'; // Importar el componente SignUp

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false); // Estado para mostrar/ocultar el componente SignUp
  const [msgSignUp, setMsgSignUp] = useState(false); // Estado para mostrar/ocultar el componente SignUp

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        // Si se produce un error de "usuario no encontrado", mostrar el componente SignUp
        if (error.code === 'auth/user-not-found') {
          setMsgSignUp(true);
        } else {
          console.log('Error al iniciar sesión:', error);
        }
      });
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <div>
      {showSignUp ? (
        <SignUp />
        ) : (
          <form>
          <h3 className='text-center mb-3'>Login</h3>
          <div className='row'>
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

          {msgSignUp && <div class="alert alert-danger mt-3" role="alert">
            Aun no tienes cuenta, debes crear una cuenta.
          </div>}

          <div className='mt-3 d-flex justify-content-center'>
            <Button style={{ minWidth: '150px' }} className='mx-1' type="primary" onClick={handleLogin}>Login</Button>
            <Button style={{ minWidth: '150px' }} className='mx-1' onClick={handleSignUpClick}>Create Account</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
