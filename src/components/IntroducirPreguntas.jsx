import React, { useState } from "react";
import { useId, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LogoAtras, LogoHome } from "./Icons";
import { Link } from "react-router-dom";
import usePregunta from "../hooks/usePregunta";
import Loader from "./Loader";
import { UseUser } from "../hooks/UseUser";

export function IntroducirPreguntas() {
  const enunciado = useId();
  const resCorrecta = useId();
  const res1 = useId();
  const res2 = useId();
  const res3 = useId();
  const nivel = useId();
  const dificultad = useId();
  const asignatura = useId();
  const tiempo = useId();
  const imagen = useId();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checked, setCheck] = useState(false)
  const { user } = UseUser();
  const { preguntaId } = useParams();
  const { pregunta, loadingEdit } = usePregunta(preguntaId);
  const [error, setError] = useState();

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (info) => {
    let infoParams = {};
    let completo = true;
    Object.keys(info).forEach((key) => {
      if (info[key] != "") {
        if (key == "tiempo") {
          infoParams[key] = Number(info[key]);
        } else {
          infoParams[key] = info[key];
        }
      } else {
        completo = false;
      }
    });
    infoParams["idAdmin"] = user;

    if (completo && info["tiempo"] > 0) {
      try {
        if (preguntaId) {
          setLoading(true);
          await axios.put(
            "https://catchit-back-production.up.railway.app/api/pregunta/" +
              preguntaId,
            null,
            {
              params: infoParams,
            }
          );
        } else {
          setLoading(true);
          await axios.post(
            "https://catchit-back-production.up.railway.app/api/pregunta",
            null,
            {
              params: infoParams,
            }
          );
        }
        navigate("/preguntas");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Debes de introducir bien los datos");
    }
  };

  useEffect(() => {
    if (preguntaId && pregunta) {
      Object.keys(pregunta).forEach((key) => {
        setValue(key, pregunta[key]);
      });
    }
  }, [preguntaId, pregunta, setValue]);

  const goBack = () => {
    navigate(-1);
  };

  const handleCheck = () => {
    if(checked){
        setCheck(false)
    }else{
        setCheck(true)
    }
  }

  return (
    <>
      {loading || loadingEdit ? (
        <Loader />
      ) : (
        <section className="bg-gradient-to-br from-orange-300 to-rose-600 h-screen">
          <header className="flex justify-between font-titulo1 animate-flip-down animate-ease-in-out text-5xl text-center p-10">
            <button className="w-10" onClick={goBack}>
              <LogoAtras />
            </button>
            <div>
              {preguntaId ? (
                <h1> EDITAR PREGUNTA</h1>
              ) : (
                <h1>INTRODUCIR PREGUNTA</h1>
              )}
            </div>
            <div className="w-10">
              <Link to="/">
                <LogoHome />
              </Link>
            </div>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <main className="flex justify-center">
              <div className="w-1/3 flex flex-col gap-7">
                <div>
                  <label className="font-titulo2" htmlFor={enunciado}>
                    Enunciado:{" "}
                  </label>
                  <br />
                  <input
                    className="h-10 w-96 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    name="pregunta"
                    type="text"
                    id={enunciado}
                    required
                    {...register("pregunta")}
                  />
                </div>
                <div>
                  <label className="font-titulo2" htmlFor={resCorrecta}>
                    Respuesta Correcta:{" "}
                  </label>
                  <br />
                  <input
                    className="h-10 w-96 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    name="respuestaCorrecta"
                    type="text"
                    id={resCorrecta}
                    required
                    {...register("respuestaCorrecta")}
                  />
                </div>
                <div>
                  <label className="font-titulo2" htmlFor={res1}>
                    Respuesta 1:{" "}
                  </label>
                  <br />
                  <input
                    className="h-10 w-96 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                    name="respuesta1"
                    type="text"
                    id={res1}
                    required
                    {...register("respuesta1")}
                  />
                </div>
                <div>
                  <label className="font-titulo2" htmlFor={res2}>
                    Respuesta 2:{" "}
                  </label>
                  <br />
                  <input
                    className="h-10 w-96 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    name="respuesta2"
                    type="text"
                    id={res2}
                    required
                    {...register("respuesta2")}
                  />
                </div>
                <div>
                  <label className="font-titulo2" htmlFor={res3}>
                    Respuesta 3:{" "}
                  </label>
                  <br />
                  <input
                    className="h-10 w-96 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    name="respuesta3"
                    type="text"
                    id={res3}
                    required
                    {...register("respuesta3")}
                  />
                </div>
              </div>
              <div className="w-auto flex flex-col gap-7">
                <div>
                  <label className="font-titulo2" htmlFor={nivel}>
                    Nivel De Pregunta:{" "}
                  </label>
                  <br />
                  <select
                    className="h-10 w-64 rounded-lg focus:outline-none p-2 focus:ring-2 focus:ring-red-300"
                    id={dificultad}
                    name="nivel"
                    {...register("nivel")}
                    required
                  >
                    <option value="1ESO">1 ESO</option>
                    <option value="2ESO">2 ESO</option>
                    <option value="3ESO">3 ESO</option>
                    <option value="4ESO">4 ESO</option>
                    <option value="1BACH">1 BACH</option>
                    <option value="2BACH">2 BACH</option>
                  </select>
                </div>
                <div>
                  <label className="font-titulo2" htmlFor={dificultad}>
                    Dificultad:{" "}
                  </label>
                  <br />
                  <select
                    className="h-10 w-64 rounded-lg focus:outline-none focus:ring-2 p-2 focus:ring-red-300"
                    id={dificultad}
                    name="dificultad"
                    {...register("dificultad")}
                    required
                  >
                    <option value="facil">Fácil</option>
                    <option value="intermedia">Intermedia</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </div>

                <div>
                  <label className="font-titulo2" htmlFor={asignatura}>
                    Asignatura:{" "}
                  </label>
                  <br />
                  <select
                    className="h-10 w-64 rounded-lg focus:outline-none focus:ring-2 p-2 focus:ring-red-300"
                    id={dificultad}
                    name="asignatura"
                    {...register("asignatura")}
                    required
                  >
                    <option value="Matematicas">Matematicas</option>
                    <option value="Lengua">Lengua</option>
                    <option value="Física">Física</option>
                    <option value="Quimica">Quimica</option>
                    <option value="Biologia">Biologia</option>
                    <option value="Geología">Geología</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Historia">Historia</option>
                    <option value="Francés">Francés</option>
                    <option value="Música">Música</option>
                    <option value="Informatica">Informatica</option>
                    <option value="Plástica">Plástica</option>
                    <option value="Filosofía">Filosofía</option>
                    <option value="Economía">Economía</option>
                    <option value="Geografía">Geografía</option>
                  </select>
                </div>
                <div>
                  <label className="font-titulo2" htmlFor={tiempo}>
                    Tiempo:{" "}
                  </label>
                  <br />
                  <input
                    className="h-10 w-64 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    type="number"
                    id={tiempo}
                    name="tiempo"
                    required
                    min={1}
                    {...register("tiempo")}
                    placeholder="30 (default)"
                  />
                </div>
                <div>
                  <label className="font-titulo2" htmlFor={imagen}>
                    Añadir una imagen:{" "}
                  </label>
                  <br />
                  <input
                    className="h-10 w-64 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    type="file"
                    id={imagen}
                    name="imagen"
                    {...register("imagen")}
                  />
                  <br />
                </div>
              </div>
            </main>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-titulo2 w-64"
              >
                {preguntaId ? (
                  <section> EDITAR PREGUNTA</section>
                ) : (
                  <section>INTRODUCIR PREGUNTA</section>
                )}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
