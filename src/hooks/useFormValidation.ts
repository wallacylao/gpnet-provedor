
interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const useFormValidation = () => {
  const validateEmail = (email: string): boolean => {
    // Regex mais rigorosa para email brasileiro
    const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const validatePhone = (phone: string): boolean => {
    // Remove todos os caracteres não numéricos
    const numbers = phone.replace(/\D/g, '');
    
    // Validação mais rigorosa para telefones brasileiros
    if (numbers.length < 10 || numbers.length > 11) return false;
    
    // Primeiro dígito deve ser válido (DDD)
    const ddd = numbers.substring(0, 2);
    const validDDDs = ['11', '12', '13', '14', '15', '16', '17', '18', '19', 
                     '21', '22', '24', '27', '28', '31', '32', '33', '34', 
                     '35', '37', '38', '41', '42', '43', '44', '45', '46', 
                     '47', '48', '49', '51', '53', '54', '55', '61', '62', 
                     '63', '64', '65', '66', '67', '68', '69', '71', '73', 
                     '74', '75', '77', '79', '81', '82', '83', '84', '85', 
                     '86', '87', '88', '89', '91', '92', '93', '94', '95', 
                     '96', '97', '98', '99'];
    
    if (!validDDDs.includes(ddd)) return false;
    
    // Se for celular (11 dígitos), deve começar com 9
    if (numbers.length === 11 && numbers[2] !== '9') return false;
    
    // Se for fixo (10 dígitos), não pode começar com 9
    if (numbers.length === 10 && numbers[2] === '9') return false;
    
    return true;
  };

  const sanitizeInput = (value: string): string => {
    return value.trim().replace(/\s+/g, ' ');
  };

  const validateForm = (data: ContactFormData): ValidationResult => {
    const errors: Record<string, string> = {};

    // Validação do nome
    const sanitizedName = sanitizeInput(data.name);
    if (!sanitizedName) {
      errors.name = 'Nome é obrigatório';
    } else if (sanitizedName.length < 2) {
      errors.name = 'Nome deve ter pelo menos 2 caracteres';
    } else if (sanitizedName.length > 100) {
      errors.name = 'Nome deve ter no máximo 100 caracteres';
    }

    // Validação do email
    const sanitizedEmail = sanitizeInput(data.email);
    if (!sanitizedEmail) {
      errors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(sanitizedEmail)) {
      errors.email = 'Por favor, insira um e-mail válido';
    }

    // Validação do telefone
    const sanitizedPhone = sanitizeInput(data.phone);
    if (!sanitizedPhone) {
      errors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(sanitizedPhone)) {
      errors.phone = 'Por favor, insira um telefone brasileiro válido';
    }

    // Validação da mensagem
    const sanitizedMessage = sanitizeInput(data.message);
    if (!sanitizedMessage) {
      errors.message = 'Mensagem é obrigatória';
    } else if (sanitizedMessage.length < 10) {
      errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    } else if (sanitizedMessage.length > 1000) {
      errors.message = 'Mensagem deve ter no máximo 1000 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateForm,
    sanitizeInput
  };
};
