import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import '../index.css';

function InfoUser() {
    const USUARIO = localStorage.getItem("id");
    const usuarioAuth = localStorage.getItem("user");
    const navigate = useNavigate();

    const [codigo, setCodigo] = useState('');
    const [DatosTabla, setDatosTabla] = useState([]);
    const [DatosUser, setDatosUser] = useState([]);
    const [AuditLogin, setAuditLogin] = useState([]);

    if (!USUARIO) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        const CargarTabla = async () => {
            try {
                const response1 = await axios.post('https://Prueba__1/info_user_tabla', { iduser: USUARIO });
                setDatosTabla(response1.data);
            } catch (error) {
                console.error(error);
            }
        };

        const CargarInfoUser = async () => {
            try {
                const response2 = await axios.post('https://Prueba__1/info_user', { user: usuarioAuth });
                setDatosUser(response2.data);
            } catch (error) {
                console.error(error);
            }
        };

        const CargarAccessLogin = async () => {
            try {
                const response3 = await axios.post('https://Prueba__1/info_audit_users', { user: usuarioAuth });
                setAuditLogin(response3.data);
            } catch (error) {
                console.error(error);
            }
        };

        CargarTabla();
        CargarInfoUser();
        CargarAccessLogin();
    }, [USUARIO, usuarioAuth]);

    const RegistraCodigo = async (e) => {
        e.preventDefault();

        const iduser = DatosUser.map((datauser) => datauser._id);
        try {
            const response = await fetch('https://Prueba__1/update_codigo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo, iduser }),
            });

            const result = await response.json();
            if (result) {
                alert(result.status);

                // Recargar la tabla
                const response = await axios.post('https://Prueba__1/info_user_tabla', { iduser: USUARIO });
                setDatosTabla(response.data);
            } else {
                alert('Error en el registro del código.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <header>
                {/* Código del encabezado */}
            </header>

            <main>
                <div className="container pt-4">
                    {/* Código para el formulario de registrar código */}
                    <div className="card-header text-center py-3">
                        <h5 className="mb-0 text-center">
                            <strong>Mis códigos registrados</strong>
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha Registro</th>
                                        <th scope="col">Código</th>
                                        <th scope="col">Premio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DatosTabla.map((datospremio) => (
                                        <tr key={datospremio._id}>
                                            <td>{datospremio.fecha}</td>
                                            <td>{datospremio.codigo}</td>
                                            <td>{datospremio.premio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InfoUser;
