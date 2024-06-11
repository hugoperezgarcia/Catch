import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useNavigate, Link } from "react-router-dom";
import { LogoAtras, LogoHome, LogoEditar } from "./Icons";
import { useAxios } from "../context/axiosContext";

function EditPartida() {
  const { idPartida } = useParams();
  const [loader, setLoader] = useState(true);
  const [partida, setPartida] = useState();
  const [preguntas, setPreguntas] = useState();
  const [vidas, setNumVidas] = useState();
  const [guardado, setGuardado] = useState();
  const[detallePregunta, setDetallePregunta] = useState(); 
  const navigate = useNavigate();
  const axios = useAxios();

  useEffect(() => {
    getPartida();
  }, []);

  const goBack = () => {
    if(vidas !== partida.numVidas && !guardado){
      const userConfirmed = window.confirm('Los cambios no se han guardado. ¿Deseas salir?');
      if (userConfirmed) {
        navigate(-1);
      }
    }else{
      navigate(-1);
    }
  };

  const getPartida = async () => {
    try {
      const response = await axios.get(
        "/partida/" +
        idPartida
      );
      setPartida(response.data);
      setPreguntas(response.data.preguntas);
      setNumVidas(response.data.numVidas)
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  const volver = () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key != "userId") {
        sessionStorage.removeItem(key);
      }
    });
  };

  const guardarCambios = () =>{
    setGuardado(true);
  }

   // Función para incrementar el número de vidas
   const incrementarVidas = () => {
    setNumVidas(prevVidas => prevVidas + 1);
  };

  // Función para decrementar el número de vidas
  const decrementarVidas = () => {
    setNumVidas(prevVidas => (prevVidas > 1 ? prevVidas - 1 : 1)); // Evita que el número de vidas sea negativo
  };

  const mostrarDetalle = (pregunta) =>{
    setDetallePregunta(pregunta);
    console.log(pregunta);
  }

  const navigateRanking = () =>{
    navigate("/ranking", {state: { codigoSala: idPartida}})
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-fit min-h-screen">
          <header className="flex justify-between p-10">
            <div>
              <button className="w-8" onClick={goBack}><LogoAtras /></button>
            </div>
            <h1 className="font-semibold text-4xl">
              Editar Partida
            </h1>
            <div>
              <button className="w-8" onClick={volver}><LogoHome /></button>
            </div>
          </header>
          <main className="flex justify-around h-full w-full">
            <aside className="w-1/2 h-full">
              <div className="my-3 mx-7 flex flex-col justify-center items-center border-2 rounded-lg bg-violet-200">
                <h1 className="text-3xl m-3 uppercase font-semibold">{partida.titulo}</h1>
                <div className="flex justify-around mt-10 border-b border-black p-2 items-center">
                  <button className="text-xl font-semibold border-2 border-red-400 rounded-lg p-1 w-10" onClick={() => decrementarVidas()}> - </button>
                  <span className="text-xl font-semibold mx-5">Vidas: {vidas}</span>
                  <button className="text-xl font-semibold border-2 border-green-400 rounded-lg p-1 w-10" onClick={() => incrementarVidas()}> + </button>
                </div>
                <p className="text-lg font-semibold mt-2">Rondas: {partida.numRondas}</p>
                <div className="my-10 flex flex-col gap-2">
                  <button className="rounded-lg p-1 font-semibold border-2 border-violet-400 bg-violet-300 text-white hover:bg-violet-400 hover:text-white hover:border-2 hover:cursor-progress" onClick={() => navigateRanking()}>Ranking</button>
                  <button className="rounded-lg p-1 font-semibold border-2 border-violet-400 bg-violet-300 text-white hover:bg-violet-400 hover:text-white hover:border-2 hover:cursor-progress" onClick={() => guardarCambios()}>Guardar Cambios</button>
                </div>
              </div>
              {detallePregunta && (
                <div className="my-3 mx-7 flex flex-col border-2 rounded-lg bg-violet-200">
                  <div className="w-5 m-3 self-end"><Link to={"/editPregunta/"+ detallePregunta.id}><LogoEditar /></Link></div>
                  <p className="p-2 m-3 self-center">{detallePregunta.pregunta}</p>
                  <div>
                    <p className="p-2 m-3 bg-lime-300 rounded-lg">{detallePregunta.respuestaCorrecta}</p>
                    <p className="p-2 m-3 bg-violet-400 rounded-lg">{detallePregunta.respuesta1}</p>
                    <p className="p-2 m-3 bg-violet-400 rounded-lg">{detallePregunta.respuesta2}</p>
                    <p className="p-2 m-3 bg-violet-400 rounded-lg">{detallePregunta.respuesta3}</p>
                  </div>
                </div>
              )}
              {/* <div className="m-3 flex flex-col justify-center items-center border-2 rounded bg-violet-200"></div> */}
            </aside>
            <div className="w-1/2 h-full flex items-center flex-col m-3">
              <h1 className="text-3xl m-5">Preguntas</h1>
              <div className="flex flex-col gap-3">
                {preguntas.map((pregunta, index) => (
                  <p key={index} className="p-3 bg-violet-200 rounded-lg hover:bg-violet-400 hover:text-white hover:border-2 hover:cursor-pointer" onClick={() => mostrarDetalle(pregunta)}>{pregunta.pregunta}</p>
                ))}
              </div>
            </div>
          </main>
        </section>
      )}
    </>
  );
}

export default EditPartida;
