import React, { useState } from 'react';
import { callOpenAI } from './OpenaiService';

const PromptEngineer = ({ transcript, onNewResponse }) => {
  const [summary, setSummary] = useState('');

  const summarizeTranscript = async () => {
    try {
      const openAIResponse = await callOpenAI(`Summarize this: ${transcript}`);
      setSummary(openAIResponse);
      onNewResponse(openAIResponse); // Call the onNewResponse function
    } catch (error) {
      console.error('Error calling OpenAI:', error);
    }
  };  

  return (
    <div>
      <button onClick={summarizeTranscript}>Summarize Meeting</button>
      {summary && <div>{summary}</div>}
    </div>
  );
};

export default PromptEngineer;
