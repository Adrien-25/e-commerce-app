import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Register from './pages/Auth/Register';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import Pagenotfound from './pages/Pagenotfound';
import Policy from './pages/Policy';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
//import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='' element={<Dashboard />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
