import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import Modal from 'react-modal';
import '../index.css';

Modal.setAppElement('#root');

function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('https://gana-loco-anderb.vercel.app/apiv1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, password })
            });

            const result = await response.json();
            if (result.status === "Bienvenido") {
                localStorage.setItem('id', result.id);
                localStorage.setItem('user', result.user);
                localStorage.setItem('role', result.rol);

                if (result.rol === "User") {
                    navigate("/InfoUser");
                } else if (result.rol === "Admin") {
                    navigate("/infoAdmin");
                }
            } else {
                setError("Usuario o clave incorrecto");
            }
        } catch (error) {
            setError("Ha ocurrido un error al consultar las credenciales.");
        }
    };

    const nuevousuario = (e) => {
        e.preventDefault();
        navigate("/NewUser");
    };

    const nuevoadmin = (e) => {
        e.preventDefault();
        navigate("/NewAdmin");
    };

    return (
        <>
            <section className="text-center">
                <div className="p-5 bg-transparent text-white">
                    <h2 onClick={nuevoadmin}>Promoxión Gana Loco <span><h5>de papas unicatolica</h5></span></h2>
                </div>
                
                <div className="row contenedorlogin">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="card shadow-5-strong bg-white">
                            <div className="card-body px-md-5">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-lg-5">
                                        <img src="https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-patata-dibujada-mano_23-2150677012.jpg" className="img-fluid" alt="Sample" />
                                    </div>
                                    <div className="col-lg-7">
                                        <h2 className="fw-bold mb-5">Iniciar Sesión</h2>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <form onSubmit={handleSubmitLogin}>
                                            <div className="d-flex justify-content-center">
                                                <div className="row">
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label col-12 text-start" htmlFor="email"><strong>Usuario</strong></label>
                                                        <input type="email" placeholder="example@example.com" id="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label col-12 text-start" htmlFor="form3Example4"><strong>Clave</strong></label>
                                                        <input type="password" id="form3Example4" className="form-control" placeholder="***********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar Sesión</button>
                                            <div className="text-center">
                                                <p className="mb-5 pb-lg-2">¿Aún no tienes una cuenta? <a href="#" onClick={nuevousuario}>Registrate aqui</a></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>

                <div className="p-5 bg-transparent bg-image"></div>
            </section>
        </>
    );
}

export default Login;

