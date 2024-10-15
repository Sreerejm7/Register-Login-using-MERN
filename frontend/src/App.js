
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<Navigate to="/login"/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<ProtectedRoute element={<Home/>}/>} />
      </Routes>
      
    </div>
  );
}

export default App;
