import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'universal-cookie';

import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePassword from './components/auth/ChangePassword';
import './App.css';

const cookies = new Cookies();
function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(cookies.get('Username'));
  const setIsLoginHandler = () => {
    setIsLogin(!isLogin);
  };


  return (
  
      <BrowserRouter>
        <div>
            <Navbar username={username} onSetIsLogin={setIsLoginHandler} />
            <section className='container'> 
                <Routes>
                      <Route path='/' element={<Login username={username} onSetUsername={setUsername}/>}/>
                      <Route path='/register' element={<Register/>}/>
                      <Route path='/reset' element={<ForgotPassword/>}/>
                      <Route path='/change' element={<ChangePassword/>}/>
                </Routes>
            </section>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
