import './App.css';
import Header from './components/Header';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import { BrowserRouter as Router } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import logo from './assets/logo.png';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="app__loading">
        <div className="loading__content">
          <img src={logo} alt="" />
          <Spinner
            name="ball-spin-fade-loader"
            color="purple"
            fadein="none"
          />
        </div>
      </div>
    )
  }

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
