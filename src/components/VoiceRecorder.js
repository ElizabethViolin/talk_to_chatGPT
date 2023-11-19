// VoiceRecorder.js (or wherever you want to call getMicrophoneAccess)

import React, { useState } from 'react';
import { getMicrophoneAccess } from './MicrophoneAccess'; // Adjust the import path as necessary

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    getMicrophoneAccess()
      .then(stream => {
        // Microphone access was granted
        console.log('Microphone access granted!', stream);
        setIsRecording(true); // Now we're ready to start recording
        // Here you would handle the stream, like starting the speech recognition
      })
      .catch(error => {
        // Microphone access was denied or there was another error
        console.error('Could not get microphone access', error);
      });
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
    </div>
  );
};

export default VoiceRecorder;
