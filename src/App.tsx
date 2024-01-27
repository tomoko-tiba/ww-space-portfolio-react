import './App.css'
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import Content from './views/Content/Content.tsx';
import Home from './views/Home/index.tsx'
import Error from './views/Error.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Error" element={<Error/>} />
          <Route path="/Content" element={<Content />} />
        </Routes>
      </Router>
      <Footer/>
    </>

  )
}

export default App
