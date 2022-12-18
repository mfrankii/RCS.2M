import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';


import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';


function App() {
    
  const [isLogin, setIsLogin] = useState(false);

  const setIsLoginHandler = () => {
    setIsLogin(!isLogin);
  };




  return (
  
      <BrowserRouter>
        <div>
            <Navbar login={isLogin} onSetIsLogin={setIsLoginHandler} />
            <section className='container'> 
                <Routes>
                      <Route path='/' element={<Login login={isLogin} onSetIsLogin={setIsLoginHandler}/>}/>
                      <Route path='/register' element={<Register/>}/>
                </Routes>
            </section>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
