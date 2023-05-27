import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../../firebase';
import { useParams } from 'react-router-dom';
import './infoProduct.scss';
import { Modal } from 'antd';
import Formulario from '../form/Formulario';
import Login from '../login/Login';

const InfoProduct = ({ url }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const getProductById = async (productId) => {
      try {
        const productRef = firestore.collection(`${url}`).doc(productId);
        const doc = await productRef.get();

        if (doc.exists) {
          const data = doc.data();
          const product = {
            id: doc.id,
            ...data
          };
          setProduct(product);
        } else {
          console.log('No se encontró el producto');
        }
      } catch (error) {
        console.log('Error al obtener el producto:', error);
      }
    };

    getProductById(id);
  }, [id, url]);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className='infoProduc'>
      <div className='row d-flex align-items-center'>
        <div className='col-12 col-md-6'>
          <div className='contentImg'>
            {product && <img src={product.img} alt={product.name} />}
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='content'>
            {product && <h3>{product.name}</h3>}
            {product && <p className='mt-3'>{product.description}</p>}
            {product && <h3 className='mt-3'>Q {product.price}</h3>}
            <button onClick={handleModal}>Comprar Ahora</button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal title={user ? `Compra de ${product && product.name}` : null} open={isModalOpen} onCancel={handleModal} centered footer={null}>
          {user ? (
            <Formulario handleModal={handleModal} code={product && product.code} monto={product && product.price} />
          ) : (
            <Login />
          )}
        </Modal>
      )}
    </div>
  );
};

export default InfoProduct;
