import './App.css'
import Home from './views/Home/index.tsx'
import Personal from './views/Personal.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Personal" element={<Personal />} />
      </Routes>
    </Router>
  )
}

export default App
