
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove todos os caracteres não numéricos
    const numbers = phone.replace(/\D/g, '');
    
    // Aceita formatos: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
    const phoneRegex = /^(\(?[1-9]{2}\)?\s?)?(9\d{4}|\d{4})-?\d{4}$/;
    return phoneRegex.test(phone) && numbers.length >= 10 && numbers.length <= 11;
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
