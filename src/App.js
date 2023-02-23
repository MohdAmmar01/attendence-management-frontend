import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Error from './components/Error';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
   <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact  path="/login" element={<Login />} />
          <Route exact  path="/register" element={<Register />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
