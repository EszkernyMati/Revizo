
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import ControlPage from "./pages/ControlPage";

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        <Route path= '/login' element={<LoginPage/>}/>
        <Route path='/control' element={<ControlPage/>}/>
      </Routes>
    </>
  )
}

export default App
