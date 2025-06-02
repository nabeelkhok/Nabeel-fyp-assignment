import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Students from './components/pages/Students';
import Meetings from './components/pages/Meetings';
import Setting from './components/pages/Setting';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import Signup from './components/Auth/signup';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} /> {/* public or restrict later */}
          <Route
            path="/Projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/Students"
            element={
              <PrivateRoute>
                <Students />
              </PrivateRoute>
            }
          />
          <Route
            path="/Meetings"
            element={
              <PrivateRoute>
                <Meetings />
              </PrivateRoute>
            }
          />
          <Route
            path="/Settings"
            element={
              <PrivateRoute>
                <Setting />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;