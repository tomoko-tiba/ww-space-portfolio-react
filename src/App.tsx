import './App.css'
import Content from './views/Content/Content.tsx';
import Home from './views/Home/index.tsx'
import NotFound404 from './views/404.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // <Route path="*" element={<Navigate to="/404" />} />
  return (
    <>
      <Router>
        <Header searchValue={searchTerm} onSearchChange={handleSearchChange} />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/Search/:text" element={<Home />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound404/>} />
          <Route path="/Content/:id" element={<Content />} />
        </Routes>
        <Footer/>
      </Router>
    </>

  )
}

export default App
