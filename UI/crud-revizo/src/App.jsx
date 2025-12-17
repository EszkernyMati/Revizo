
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import ControlPage from "./pages/ControlPage";
import ReservationPage from "./pages/ReservationPage";
import ReservationSuccesPage from "./pages/ReservationSuccessPage";

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        <Route path= '/login' element={<LoginPage/>}/>
        <Route path='/control' element={<ControlPage/>}/>
        <Route path='/reservation' element={<ReservationPage/>}/>
        <Route path='/reservationsuccess' element={<ReservationSuccesPage/>}/>


      </Routes>
    </>
  )
}

export default App
