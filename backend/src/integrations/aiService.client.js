import axios from 'axios';
import { config } from '../config/env.js';

const aiClient = axios.create({
  baseURL: config.aiServiceUrl,
  timeout: 30000, // 30 seconds timeout for ML tasks
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeCode = async (code, language) => {
  try {
    const response = await aiClient.post('/analyze', { code, language });
    return response.data;
  } catch (error) {
    console.error('AI Service Error (analyzeCode):', error.message);
    throw new Error('Failed to analyze code via AI service');
  }
};

export const generateVivaQuestions = async (code, analysisData) => {
  try {
    const response = await aiClient.post('/generate-viva', {
      code,
      language: analysisData?.language || 'python',
      analysis_data: analysisData,
    });
    return response.data;
  } catch (error) {
    console.error('AI Service Error (generateViva):', error.message);
    throw new Error('Failed to generate viva questions');
  }
};

export const evaluateAnswer = async (question, studentAnswer, codeContext) => {
  try {
    const response = await aiClient.post('/evaluate-answer', {
      question,
      student_answer: studentAnswer,
      code_context: codeContext,
    });
    return response.data;
  } catch (error) {
    console.error('AI Service Error (evaluateAnswer):', error.message);
    throw new Error('Failed to evaluate answer');
  }
};