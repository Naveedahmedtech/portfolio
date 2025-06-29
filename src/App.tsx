import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './layout/header/Header';
import Projects from './pages/projects/Projects';
import ScrollToHash from './hooks/ScrollToHash';

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Home />} />
          <Route path='/projects' element={<Projects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
