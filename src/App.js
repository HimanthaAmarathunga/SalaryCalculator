import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import CalSal from './Views/calSal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<CalSal/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
