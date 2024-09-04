import './App.css';
import Footer from './CommonComponent/Footer/footer';
import Navbar from './CommonComponent/Navbar/navbar';
import Status from './Pages/HomeScreen/StatusPage/status';
import Homescreen from './Pages/HomeScreen/homescreen';
import {Routes,Route} from 'react-router-dom';
import Report from './Pages/HomeScreen/Report/report';
import Prescription from './Pages/Prescription/prescription';
import axios from 'axios';

function App() {

   


  return (
    <div className="App">
      <Navbar/>
      
        <Routes>
       
        <Route path='/' element={<Homescreen/>}/>
       <Route path='/Status' element={<Status/>}/>
       <Route path='/Report/:id' element={<Report/>}/>
       <Route path='/prescription/:id' element={<Prescription/>}/>
        </Routes>
      
     
      
    </div>
  );
}

export default App;
