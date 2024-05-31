import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './page/Home';
import Login from './page/Login';
import Detail from './page/Detail';
import Summary from './page/Summary';
import { useAuth } from './contexts/auth';

function App() {
  const {state} = useAuth()
  return (
    <div className='bg-slate-100'>
      <Router>
        <Routes>
          {
            state.login === false &&
            <Route path="/*" element={<Login />} />
          }
          {
            state.login === true &&
            <>
              <Route path="/*" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/summary" element={<Summary />} />
            </>    
          }
        </Routes>
      </Router>
    </div>
  )
}

export default App
