import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../registrouser.css';

function RegistroUser() {
    const [nombre, setNombre] = useState('');
    const [fechaN, setFechaN] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cedula, setCedula] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [error, setError] = useState('');
    const GoTo = useNavigate();

    const handleClickSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Llamada al backend para registrar un nuevo usuario
            const response = await fetch('https://Prueba_1/new_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, fechaN, email, password, celular, cedula, ciudad }),
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
        window.location.href = 'https://Prueba_1';
    };

    return (
        <>
            <header>
                <div className="container-fluid px-1 py-5 mx-auto text-white">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <h3>Registro de Usuarios</h3>
                            <p className="blue-text">Por favor, ingresa todos los datos solicitados.</p>
                            <div className="card">
                                <h5 className="text-center mb-4">Formulario de Registro</h5>
                                <form className="form-card" onSubmit={handleClickSubmit}>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex mb-2"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="nombre">
                                                Nombre Completo<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Escriba su nombre"
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                                minLength="5"
                                            />
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex mb-2"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="fecha">
                                                Fecha de Nacimiento<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="date"
                                                id="fecha"
                                                name="fecha"
                                                onChange={(e) => setFechaN(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex mb-2"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="correo">
                                                Correo Electrónico<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="email"
                                                id="correo"
                                                name="correo"
                                                placeholder="example@example.com"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                minLength="5"
                                            />
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex mb-2"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="telefono">
                                                Teléfono Celular<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="number"
                                                id="telefono"
                                                name="telefono"
                                                placeholder="Escriba su número de celular"
                                                onChange={(e) => setCelular(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex mb-2"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="cedula">
                                                Cédula<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="number"
                                                id="cedula"
                                                name="cedula"
                                                placeholder="Escriba su número de cédula"
                                                onChange={(e) => setCedula(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex mb-2"> 
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="ciudad">
                                                Ciudad de Residencia<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="text"
                                                id="ciudad"
                                                name="ciudad"
                                                placeholder="Ciudad de residencia"
                                                onChange={(e) => setCiudad(e.target.value)}
                                                required
                                                minLength="4"
                                            />
                                        </div>
                                    </div>

                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex mb-2">
                                            <label className="form-control-label px-3 col-12 text-start" htmlFor="pass">
                                                Contraseña<span className="text-danger"> *</span>
                                            </label> 
                                            <input
                                                type="password"
                                                id="pass"
                                                name="pass"
                                                placeholder="***********"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-sm-6 pt-4">
                                            <button type="submit" className="btn btn-primary">Registrarse</button>
                                            <button type="button" className="btn btn-secondary" onClick={handleAtras}>Atrás</button>
                                        </div>
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

export default RegistroUser;