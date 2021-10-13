import logo from './logo.svg';
import './App.css';
import SignUp from './screens/authentication/signup';
import Login from './screens/authentication/login';
import Routes from './configs/routes';
import ContextProvider from './context/context';
import Welcome from './screens/welcome';

function App() {
  return (
    <>
    <ContextProvider>
      <Routes/>
    </ContextProvider>
    </>
  );
}

export default App;
