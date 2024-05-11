import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import AuthCallback from './pages/AuthCallback';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import Contract from './pages/Contract';

const isDev = process.env.NODE_ENV === 'development';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Main />} />
        <Route path="/contract" element={<Contract />} />
      </Routes>
    </Router>
  )
}

if (isDev) {
  loadDevMessages();
  loadErrorMessages();
}

export default App;
