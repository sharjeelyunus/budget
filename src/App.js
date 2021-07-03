import './App.css';
import Header from './components/Header';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import { BrowserRouter as Router } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">

      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <Wallet />
            <Transactions />
          </>
        )}
      </Router>

    </div>
  );
}

export default App;
