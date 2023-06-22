import firebase from './FirebaseConfig'
import './App.css';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.css'
import PhotoGallery from './components/PhotoGallery/PhotoGallery';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test from './components/Test/Test';
import Admin from './components/Admin/Admin';
import FirebaseAuthService from './services/FirebaseAuthService';
import { useState } from 'react';
import Session from './components/Session/Session';





function App() {
  const [user, setUser] = useState(null)
  FirebaseAuthService.subscribeToAuthChanges(setUser);

  return (

    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PhotoGallery />} />
          <Route path='/login' element={<Admin admin={user} />} />
          <Route path='/session' element={<Session />} />
          
        </Routes>
      </BrowserRouter>
      {/* <div style={{height: '200vh'}}>
        <h2 style={{ marginTop: '300px' }}>Clear-Choice</h2>
      </div> */}
    </div>

  );
}

export default App;
