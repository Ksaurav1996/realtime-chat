import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Regsiter from './pages/Regsiter';
import Home from './pages/Home';
import Start from './components/Start';

function App() {
  return (
    <div className="bg-[#F8F4EA] min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Regsiter />} />
          <Route exact path="/chats" element={<Home />} />
          <Route exact path="/" element={<Start />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;