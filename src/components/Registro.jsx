import { useId } from "react";
import { useForm } from "react-hook-form";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LogoHome } from './Icons';
import Loader from './Loader';
import { useAxios } from '../context/axiosContext';
import { LogoAtras } from "./Icons";
import { HeaderInicio } from "./HeaderInicio";

function Registro() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    const onSubmit = async (info) => {
        if (info.password === info.passwordRepeated) {
            try {
                setLoading(true);
                const response = await axios.post("/signin", null, {
                    params: {
                        username: info.username,
                        password: info.password,
                        key: info.key
                    }
                });
                navigate("/login");
            } catch (e) {
                setError("Algo ha fallado intentalo de nuevo");
            } finally {
                setLoading(false);
                sessionStorage.removeItem("estaInicio");
            }
        } else {
            setError("Las contraseñas no son iguales, vuelve a intentarlo")
        }
    }
    const usernameId = useId()
    const passwordId = useId()
    const claveAdminId = useId()
    const repitePasswordId = useId()

    return (
        <>
            {loading ? <Loader /> : (
                <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-screen">
                    <HeaderInicio registro={true}/>
                    <main className='flex justify-center items-center h-full'>
                        <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md animate-flip-up animate-ease-in-out">
                            {error ? (<span className="p-2 bg-red-600 text-white rounded-md w-full justify-center flex">{error}</span>) : ""}
                            <h2 className="text-3xl font-titulo1 my-6 text-center">Regístrate</h2>

                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor={usernameId} className="block text-sm font-titulo2 text-gray-700">Nombre de Usuario:</label>
                                    <input type="text" id={usernameId} name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("username")} />
                                </div>

                                <div>
                                    <label htmlFor={repitePasswordId} className="block text-sm font-titulo2 text-gray-700">Contraseña:</label>
                                    <input type="password" id={repitePasswordId} name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("password")} />
                                </div>

                                <div>
                                    <label htmlFor={passwordId} className="block text-sm font-titulo2 text-gray-700">Repite la Contraseña:</label>
                                    <input type="password" id={passwordId} name="passwordRepeated" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("passwordRepeated")} />
                                </div>

                                <div>
                                    <label htmlFor={claveAdminId} className="block text-sm font-titulo2 text-gray-700">Clave de administrador:</label>
                                    <input type="text" id={claveAdminId} name="key" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("key")} />
                                </div>

                                <button type="submit" className="w-full px-4 py-2 bg-amber-500/90 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-titulo2 rounded-md text-white">Registrar Cuenta</button>
                                <Link to="/" className="w-full px-4 py-2 flex justify-center transition-transform transform hover:scale-110 hover:cursor-pointer">Volver al Inicio de Sesión</Link>
                            </form>
                        </div>
                    </main>
                </section>
            )}
        </>
    );
}

export default Registro