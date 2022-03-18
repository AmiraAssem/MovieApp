import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Navbar from './Components/Navbar/Navbar';
import MediaContextProvider from './MediaContext/MediaContex';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register';


function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'));
    setUserData(decodedToken);
  }
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')
  }
  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('userToken')) {
      return <Navigate to='/login' />
    }
    return children

  }
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserData();
    }

  }, []);
  useEffect(() => {
    console.log(userData)
  }, [userData]);
  return (
    <>
      <Navbar userData={userData} logOut={logOut} />
      <div className="container">
        <MediaContextProvider>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/movieDetails' element={<MovieDetails />}>
              <Route path=':media_type' element={<MovieDetails />}>
                <Route path=':id' element={<MovieDetails />}></Route>
              </Route>
            </Route>
            <Route path='/login' element={<Login getUserData={getUserData} />}></Route>
            <Route path='*' element={<NotFound />}> </Route>
          </Routes>
        </MediaContextProvider>
      </div>
    </>
  );
}

export default App;
