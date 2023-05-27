import React, { useState, useEffect } from 'react';
import './header.scss'
import { NavLink, Link } from 'react-router-dom';
import { Dropdown, Modal } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { auth, firestore } from '../../firebase';
import Login from '../login/Login';

const Header = () => {
  const [displayName, setDisplayName] = useState(null);
  const [isModalLogin, setIsModalLogin] = useState(false);

  const handleModalLogin = () => setIsModalLogin(!isModalLogin)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsModalLogin(false)
        const fetchUserDetails = async () => {
          try {
            const userRef = firestore.collection('users').doc(user.uid);
            const doc = await userRef.get();

            if (doc.exists) {
              const userData = doc.data();
              setDisplayName(userData.name);
            }
          } catch (error) {
            console.log('Error al obtener los detalles del usuario:', error);
          }
        };

        fetchUserDetails();
      } else {
        setDisplayName(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Mis Compras
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={handleLogout}>
          Cerrar Sesión
        </div>
      )
    }
  ];


  return (
    <header className="header">
      <div className="logo">
        <Link to={'/'}>
          Tech Store
        </Link>
      </div>
      <nav className="menu">
        <ul>
          <li><NavLink exact to="/" className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "active" : ""
          }>Todos los productos</NavLink></li>
          <li><NavLink to="/celulares" activeClassName="active">Celulares</NavLink></li>
          <li><NavLink to="/computadoras" activeClassName="active">Computadoras</NavLink></li>
          <li><NavLink to="/accesorios" activeClassName="active">Accesorios</NavLink></li>
          {displayName ? (
            <Dropdown menu={{ items }}>
              <li className='d-flex align-items-center'><UserOutlined /> <p className='mx-1'>{displayName}</p> <DownOutlined /></li>
            </Dropdown>
          ) : (
            <li onClick={handleModalLogin}>Iniciar Sesión</li>
          )}
        </ul>
      </nav>
      <Modal
        open={isModalLogin}
        footer={null}
        centered
        onCancel={handleModalLogin}
      >
        <Login />
      </Modal>
    </header>
  );
};

export default Header;
