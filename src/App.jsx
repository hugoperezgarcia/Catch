import Registro from './components/Registro';
import {Routes, Route, Navigate} from "react-router-dom";
import Preguntas from './components/Preguntas';
import RepositorioAdmin from './components/RepositorioAdmin';
import Home from './components/Home';
import { LogIn } from "./components/LogIn";
import { IntroducirPreguntas } from "./components/IntroducirPreguntas";
import { UseUser } from './hooks/UseUser';
import { CrearPartida } from './components/CrearPartida';
import { Sala } from  './components/Sala';
import { CatchIt } from './components/CatchIt';
import { Ranking } from './components/Ranking';
import { CsvImport } from './components/CsvImport';
import EditPartida from './components/EditPartida';

function App() {
  const {user} = UseUser();
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LogIn home="true"/>} />
        <Route path='/registro' element={<Registro/>} />
        <Route path='/bienvenida' element={ user ? <RepositorioAdmin /> : <Navigate to="/" />} />
        <Route path='/preguntas' element={user ? <Preguntas /> : <Navigate to="/" />} />
        <Route path="/createPregunta" element={user ? <IntroducirPreguntas /> : <Navigate to="/" />} />
        <Route path="/editPregunta/:preguntaId" element={user ? <IntroducirPreguntas /> : <Navigate to="/" />} />
        <Route path="/createPartida" element={user ? <CrearPartida /> : <Navigate to="/" />} />
        <Route path="/insertarCsv" element={user ? <CsvImport /> : <Navigate to="/" />} />
        <Route path="/editPartida/:idPartida" element={user ? <EditPartida /> : <Navigate to="/" />} />
        <Route path='/sala' element={<Sala/>} />
        <Route path='/CatchIt' element={<CatchIt/>} />
        <Route path='/ranking' element={<Ranking/>} />
        <Route path='/csv' element={<CsvImport/>} />
      </Routes>
    </div>
  );
}
export default App;

