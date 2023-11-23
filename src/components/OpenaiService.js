const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

// Function to call the OpenAI API with a prompt
const callOpenAI = async (prompt) => {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        prompt: prompt, // The prompt text to send to OpenAI
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].text; // Return the text of the first choice
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    console.error('Error calling OpenAI:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response body:', error.response.data);
    }
    return ''; // Return an empty string or handle the error as needed
  }
};

export { callOpenAI };