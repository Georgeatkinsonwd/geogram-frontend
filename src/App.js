import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./App.css";
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Auth from './pages/Auth'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element ={<Explore />} />
          <Route path="/Auth" element ={<Auth />} />
          <Route path="/createpost" element ={<CreatePost />} />
          <Route path="/profile" element ={<Profile />} />
        </Routes>
         </Router>
    </div>
  );
}

export default App;
