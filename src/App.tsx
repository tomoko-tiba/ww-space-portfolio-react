import './App.css'
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import Content from './views/Content/Content.tsx';
import Home from './views/Home/index.tsx'
import NotFound404 from './views/404.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound404/>} />
          <Route path="/Content" element={<Content />} />
        </Routes>
      </Router>
      <Footer/>
    </>

  )
}

export default App
