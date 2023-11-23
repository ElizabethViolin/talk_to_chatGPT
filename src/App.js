import React, { useState } from 'react';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import UserProfile from './components/profile/UserProfile';
import VoiceRecorder from './components/VoiceRecorder';
import PromptEngineer from './components/PromptEngineer';
import ChatDisplay from './components/ChatDisplay';

function App() {
  const [transcription, setTranscription] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleTranscriptionComplete = (newTranscription) => {
    console.log('Transcription Complete:', newTranscription);
    setTranscription(newTranscription);
    const userEntry = { sender: 'user', message: newTranscription }; // Make sure this line is inside the function where it's used
    setChatHistory((prevHistory) => [...prevHistory, userEntry]);
  };
  
  const handleNewResponse = (response) => {
    const chatGPTEntry = { sender: 'chatgpt', message: response };
    setChatHistory([...chatHistory, chatGPTEntry]);
  };

  return (
    <div className="App">
      <SignIn />
      <SignUp />
      <AuthDetails />
      <UserProfile />
      <VoiceRecorder onTranscriptionComplete={handleTranscriptionComplete} />
      {transcription && (
        <PromptEngineer
          transcript={transcription}
          onNewResponse={handleNewResponse}
        />
      )}
      <ChatDisplay chatHistory={chatHistory} />
    </div>
  );
}

export default App;
