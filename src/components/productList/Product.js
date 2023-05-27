import React from 'react'
import './product.scss'
import { Link } from 'react-router-dom';


const Product = ({ img, name, description, price, id, url }) => {
    return (
        <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'>
            <Link to={`${url ? `/${url}` : ''}/${id}`}>
                <div className='cardProduct'>
                    <div className='contentImg'>
                        <img src={img} alt={name} />
                    </div>
                    <div className='body'>
                        <h2 className='name'>{name}</h2>
                        <p className='text'>{description}</p>
                        <h3 className='price'>Q{price}</h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Product