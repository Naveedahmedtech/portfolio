import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './layout/header/Header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
