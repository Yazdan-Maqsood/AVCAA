import axios from 'axios';
import { config } from '../config/env.js';

// Direct LLM call as a fallback if the Python service is down
export const generateDirectLLMResponse = async (prompt) => {
  try {
    // If you want to use OpenAI directly (ensure OPENAI_API_KEY is in .env)
    /*
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    return response.data.choices[0].message.content;
    */
    return 'Fallback LLM response not configured.';
  } catch (error) {
    console.error('LLM Error:', error.message);
    throw error;
  }
};