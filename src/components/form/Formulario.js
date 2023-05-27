import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, firestore } from '../../firebase';

function Formulario({ handleModal, monto, code }) {
    const [compraExitosa, setCompraExitosa] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = firestore.collection('users').doc(user.uid);
                    const doc = await userRef.get();

                    if (doc.exists) {
                        const userData = doc.data();
                        setUserData(userData);
                    }
                }
            } catch (error) {
                console.log('Error al obtener los detalles del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Obtener fecha y hora actuales del sistema
        const fechaActual = new Date();

        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript comienzan desde 0
        const anio = fechaActual.getFullYear();
        const diaFormateado = dia.toString().padStart(2, '0');
        const mesFormateado = mes.toString().padStart(2, '0');
        const fecha = `${diaFormateado}${mesFormateado}${anio}`;

        //const fecha = fechaActual.toLocaleDateString().replace(/\//g, ''); // Eliminar barras de la fecha
        const hora = fechaActual.toLocaleTimeString().replace(/:/g, ''); // Eliminar dos puntos de la hora
        const cuentaNegocio = '4476022542';

        const montoCompleto = monto.toString().padStart(20, '0');

        // Crear objeto con los datos
        const datos = {
            date: fecha,
            time: hora,
            code,
            accountNumber: e.target.numeroCuenta.value,
            nit: e.target.nit.value,
            shippingAddress: e.target.shippingAddress.value,
            total: monto,
            ...userData,
        };

        // Mostrar el objeto en la consola
        console.log(datos);

        const trama = `${fecha}${hora}${datos.code}${cuentaNegocio}${datos.accountNumber}${montoCompleto}`;
        console.log(trama);

        try {
            // Envía la trama a Node.js
            const response = await axios.post(
                'http://localhost:3000/trama',
                { trama },
                { headers: { 'Access-Control-Allow-Origin': '*' } }
            );

            console.log(response.data);

            setCompraExitosa(response.data === '01' ? true : false);

        } catch (error) {
            console.error('Error al enviar la trama a Node.js:', error);
            setCompraExitosa(false);
        }
    };

    return (
        <div>
            {compraExitosa ? <div><div className="alert alert-success" role="alert">
                ¡Su compra se realizó con éxito!
            </div>
                <div className='text-center'>
                    <button style={{ minWidth: '200px' }} className='btn btn-warning' onClick={handleModal}>Aceptar</button>
                </div>
            </div> :
                <form onSubmit={handleSubmit} className='row'>
                    <div className='col-12 mb-3'>
                        <label className='w-100'>
                            Número de cuenta:
                            <input className='form-control' type="number" name="numeroCuenta" required />
                        </label>
                    </div>
                    <div className='col-12'>
                        <div>
                            <h5>Datos de Facturacion</h5>
                        </div>
                    </div>
                    <div className='col-6 mb-3'>
                        <label>
                            Nit:
                            <input className='form-control' type="text" name="nit" required />
                        </label>
                    </div>
                    <div className='col-6 mb-3'>
                        <label>
                            Direccion de Envio:
                            <input className='form-control' type="text" name="shippingAddress" required />
                        </label>
                    </div>
                    <div className='col-12 text-center'>
                        <button style={{ minWidth: '200px' }} className='btn btn-warning' type="submit">Comprar</button>
                    </div>
                </form>

            }
            {compraExitosa === false && <div className='col-12 mt-3'>
                <div className="alert alert-danger" role="alert">
                   Upss algo salio mal. Intentalo de nuevo
                </div>
            </div>}
        </div>
    );
}

export default Formulario;
