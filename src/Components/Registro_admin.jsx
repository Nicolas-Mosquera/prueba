import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../registrouser.css';

function RegistroAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const GoTo = useNavigate();

    const handleClickSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamada al backend para registrar un nuevo administrador
            const response = await fetch('https://Prueba___1/new_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Validación del resultado que devuelve el backend
            const result = await response.json();
            if (result) {
                window.alert(result.status);
                GoTo("/"); // Redirige al inicio si el registro es exitoso
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Internal server error');
        }
    };

    const handleAtras = (e) => {
        e.preventDefault();
        window.location.href = 'https://Prueba___1';
    };

    return (
        <>  
            <header>
                <div className="container-fluid px-1 py-5 mx-auto text-white">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <h3>Registro de Usuario Administrador</h3>
                            <p className="blue-text">Por favor, ingresa tu correo y clave.</p>
                            <div className="card">
                                <h5 className="text-center mb-4">Ingresa los datos.</h5>
                                <form className="form-card" onSubmit={handleClickSubmit}>
                                    <div className="row justify-content-between text-left">
                                        <div className="col-sm-2"></div>
                                        <div className="form-group col-sm-8 flex-column d-flex"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="email">
                                                Usuario<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="example@example.com"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                minLength="5"
                                            /> 
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>

                                    <div className="row justify-content-between text-left mt-4">
                                        <div className="col-sm-2"></div>
                                        <div className="form-group col-sm-8 flex-column d-flex"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="password">
                                                Clave<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="***********"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            /> 
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>

                                    <div className="row justify-content-between text-left mt-3">
                                        <div className="col-sm-2"></div>
                                        <div className="form-group col-sm-4"> 
                                            <button type="submit" className="btn btn-primary">Registrarse</button> 
                                        </div>
                                        <div className="form-group col-sm-4"> 
                                            <button type="button" className="btn btn-secondary" onClick={handleAtras}>Volver atrás</button> 
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                </form>
                                {error && <p className="text-danger mt-2">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>   
            </header>            
        </>
    );
}

export default RegistroAdmin;
