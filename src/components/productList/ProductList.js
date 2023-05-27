import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import Product from './Product';

const ProductList = ({type}) => {
  return (
    <div>
      {type ===1  || type===2 ? <ListCelulares /> : null}
      {type===1 || type===3 ? <ListComputadoras /> : null}
      {type===1 || type===4 ? <ListAccesorios /> : null}
    </div>
  );
};

export default ProductList;


const ListCelulares = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsRef = firestore.collection('products');
        const snapshot = await productsRef.get();
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        });
        setProducts(products);
      } catch (error) {
        console.log('Error al obtener los productos:', error);
      }
    };

    getProducts();
  }, []);


  return (
    <div>
      <h1 className='text-center mt-3'>Celulares</h1>
      <div className='row mt-5'>
        {products.map((product) => (
          <Product
            url={'celulares'}
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            img={product.img}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};



const ListComputadoras = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsRef = firestore.collection('computadoras');
        const snapshot = await productsRef.get();
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        });
        setProducts(products);
      } catch (error) {
        console.log('Error al obtener los productos:', error);
      }
    };

    getProducts();
  }, []);


  return (
    <div>
      <h1 className='text-center mt-3'>Computadoras</h1>
      <div className='row mt-5'>
        {products.map((product) => (
          <Product
            key={product.id}
            url={'computadoras'}
            id={product.id}
            name={product.name}
            description={product.description}
            img={product.img}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};


const ListAccesorios = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsRef = firestore.collection('accesorios');
        const snapshot = await productsRef.get();
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        });
        setProducts(products);
      } catch (error) {
        console.log('Error al obtener los productos:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1 className='text-center mt-3'>Accesorios</h1>
      <div className='row mt-5'>
        {products.map((product) => (
          <Product
            key={product.id}
            url={'accesorios'}
            id={product.id}
            name={product.name}
            description={product.description}
            img={product.img}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};