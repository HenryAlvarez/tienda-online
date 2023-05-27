import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/productList/ProductList';

import Header from './components/header/Header'
import InfoProduct from './components/infoProduct/InfoProduct';

function App() {
  
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductList type={1} />} />
          <Route path="/celulares" element={<ProductList type={2} />} />
          <Route path="/celulares/:id" element={<InfoProduct url={'products'} />} />
          <Route path="/computadoras" element={<ProductList type={3} />} />
          <Route path="/computadoras/:id" element={<InfoProduct url={'computadoras'} />} />
          <Route path="/accesorios" element={<ProductList type={4} />} />
          <Route path="/accesorios/:id" element={<InfoProduct url={'accesorios'} />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
