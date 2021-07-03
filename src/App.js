import './App.css';
import Header from './components/Header';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';

function App() {
  return (
    <div className="App">
      <Header />
      <Wallet />
      <Transactions />
    </div>
  );
}

export default App;
