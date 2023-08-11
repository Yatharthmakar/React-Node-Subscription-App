import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Payment from './pages/Payment';
import '../src/css/App.css';
import ShowPlans from './components/ShowPlans';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Login/>}
            />
            <Route
              path='/signup'
              element={<Signup/>}
            />
            <Route
              path='/home'
              element={<Home/>}
            />
            <Route
              path='/payment'
              element={<Payment/>}
            />
            <Route
              path='/allplans'
              element={<ShowPlans/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
