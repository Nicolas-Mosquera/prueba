import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function InfoAdmin() {
    const navigate = useNavigate();
    const USUARIO = localStorage.getItem("id");

    if (!USUARIO) {
        navigate('/'); // Redirige al login si no hay un usuario válido
        return null;
    }

    const [DatosTabla1, setDatosTabla1] = useState([]);
    const [DatosTabla2, setDatosTabla2] = useState([]);
    const [DatosTabla3, setDatosTabla3] = useState([]);
    const [DatosTabla4, setDatosTabla4] = useState([]);
    const [DatosUser, setDatosUser] = useState([]);
    const [AuditLogin, setAuditLogin] = useState([]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Redirige al login después de cerrar sesión
    };

    useEffect(() => {
        const CargarDatos = async () => {
            try {
                const response1 = await axios.post('https://Prueba__1/info_admin_tabla1');
                setDatosTabla1(response1.data);

                const response2 = await axios.post('https://Prueba__1/info_admin_tabla2');
                setDatosTabla2(response2.data);

                const response3 = await axios.post('https://Prueba__1/info_admin_tabla3');
                setDatosTabla3(response3.data);

                const response4 = await axios.post('https://Prueba__1/info_admin_tabla4');
                setDatosTabla4(response4.data);

                const user = localStorage.getItem("user");
                const responseUser = await axios.post('https://Prueba__1/info_user', { user });
                setDatosUser(responseUser.data);

                const responseAudit = await axios.post('https://Prueba__1/info_audit_users', { user });
                setAuditLogin(responseAudit.data);
            } catch (error) {
                console.error(error);
            }
        };

        CargarDatos();
    }, []);

    return (
        <>
            <header>
                <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top border">
                    <div className="container-fluid">
                        <img src="https://img.icons8.com/?size=100&id=bCZuh4u5quAj&format=png&color=000000" alt='star' height="70" />
                        {DatosUser.map((datauser) => (
                            <span className='m-2'> Bienvenido: <h5 className="mb-0 text-center"> {datauser.user} </h5> </span>
                        ))}
                        <ul className="navbar-nav ms-auto d-flex flex-row">
                            <div className='pt-2 d-none d-md-flex input-group w-auto my-auto'>
                                {AuditLogin.map((auditlogin) => (
                                    <span className='m-2'> <strong>Último acceso: </strong> {auditlogin.fecha}</span>
                                ))}
                            </div>
                            <li className="nav-item">
                                <button className='btn btn-primary' onClick={handleLogout}>
                                    <img src="https://img.icons8.com/?size=100&id=rVJsmIuA2cov&format=png&color=000000" className="rounded-circle" height="22" alt="" loading="lazy" /> <span>Cerrar Sesión</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container pt-4">
                    {/* Aquí irán las tablas como antes */}
                </div>
            </main>
        </>
    );
}

export default InfoAdmin;
