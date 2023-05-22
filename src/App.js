import firebase from './FirebaseConfig'
import './App.css';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.css'
import PhotoGallery from './components/PhotoGallery/PhotoGallery';



function App() {
  return (
    <div className="App">
      <Header />
      <PhotoGallery />
      {/* <div style={{height: '200vh'}}>
        <h2 style={{ marginTop: '300px' }}>Clear-Choice</h2>
      </div> */}
    </div>
  );
}

export default App;
