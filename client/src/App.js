
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayAll from './components/DisplayAll';
import UpdateNote from './components/EditNote';
import CreateNote from './components/NoteForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/notes/:id" element={<UpdateNote />} />
          <Route path="notes/new" element={<CreateNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
