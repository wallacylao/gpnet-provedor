import { useState, useEffect } from 'react';

interface CaptchaQuestion {
  question: string;
  answer: number;
}

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState<CaptchaQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isValid, setIsValid] = useState(false);

  const generateCaptcha = (): CaptchaQuestion => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        // Garantir que o resultado seja sempre positivo
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller}`;
        break;
      case '*':
        // Usar números menores para multiplicação
        const smallNum1 = Math.floor(Math.random() * 5) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        answer = smallNum1 * smallNum2;
        question = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }
    
    return { question, answer };
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setUserAnswer('');
    setIsValid(false);
  };

  const validateAnswer = (answer: string): boolean => {
    if (!captcha) return false;
    const numericAnswer = parseInt(answer);
    const valid = !isNaN(numericAnswer) && numericAnswer === captcha.answer;
    setIsValid(valid);
    return valid;
  };

  const handleAnswerChange = (answer: string) => {
    setUserAnswer(answer);
    validateAnswer(answer);
  };

  const reset = () => {
    setUserAnswer('');
    setIsValid(false);
    refreshCaptcha();
  };

  // Gerar captcha inicial
  useEffect(() => {
    refreshCaptcha();
  }, []);

  return {
    captcha,
    userAnswer,
    isValid,
    handleAnswerChange,
    refreshCaptcha,
    reset,
    validateAnswer
  };
};