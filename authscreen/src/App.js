 import './App.css';
 import Register from './components/Register';
 import Login from './components/Login';
import { Route,Routes } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
 
   
function App() {
  return (
    <div >
      <ToastContainer limit={1}/>

      <Routes>
       <Route path='/' element={<Login/>} />
      <Route path='/register'element={<Register/>}/>
      <Route path='/home'element={<Home/>}/>

      </Routes>
      </div>
  );
}

export default App;
