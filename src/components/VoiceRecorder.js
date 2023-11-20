import React, { useState } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { getMicrophoneAccess } from './MicrophoneAccess';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  const azureSubscriptionKey = process.env.REACT_APP_AZURE_SPEECH_KEY;
  const azureServiceRegion = process.env.REACT_APP_AZURE_SERVICE_REGION;  

  const startRecognition = () => {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = sdk.SpeechConfig.fromSubscription(azureSubscriptionKey, azureServiceRegion);

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
      result => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          setTranscription(result.text);
        } else {
          setTranscription('No speech could be recognized or no speech was detected.');
        }
        setIsRecording(false);
        recognizer.close();
      },
      err => {
        setTranscription('An error occurred during transcription.');
        console.error('ERROR: ', err);
        setIsRecording(false);
        recognizer.close();
      }
    );
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscription('');
      getMicrophoneAccess().then(startRecognition).catch(console.error);
    }
  };

  return (
    <div>
      <button onClick={toggleRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      <p>Transcription: {transcription}</p>
    </div>
  );
};

export default VoiceRecorder;
