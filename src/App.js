
import './App.css';
import Register from './Register';
import {BrowserRouter,Route,Routes,route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <h1>registration</h1>
      <BrowserRouter>
      <Routes>
        <Route path='/Register' element={<Register />}></Route>
      </Routes>

      </BrowserRouter>
     
    </div>
  );
}

export default App;
