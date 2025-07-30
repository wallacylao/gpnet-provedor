import { useState } from 'react';

export const usePhoneMask = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const formatPhone = (phone: string): string => {
    // Remove todos os caracteres que não são números
    const numbers = phone.replace(/\D/g, '');
    
    // Aplica a máscara baseada no tamanho
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      if (numbers.length === 11 && numbers[2] === '9') {
        // Celular com 9 na frente: (XX) 9XXXX-XXXX
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      } else {
        // Telefone fixo: (XX) XXXX-XXXX
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
      }
    }
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    if (limitedNumbers.length === 11 && limitedNumbers[2] === '9') {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    }
  };

  const handleChange = (newValue: string) => {
    const formatted = formatPhone(newValue);
    setValue(formatted);
    return formatted;
  };

  const getRawValue = (): string => {
    return value.replace(/\D/g, '');
  };

  return {
    value,
    handleChange,
    getRawValue,
    setValue
  };
};