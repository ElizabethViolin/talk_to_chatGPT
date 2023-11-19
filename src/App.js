// import logo from './logo.svg';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import UserProfile from './components/profile/UserProfile';
import VoiceRecorder from './components/VoiceRecorder';



function App() {
  return (
    <div className="App">
      <SignIn />
      <SignUp />
      <AuthDetails />
      <UserProfile />
      <VoiceRecorder />
    </div>
  );
}

export default App;
