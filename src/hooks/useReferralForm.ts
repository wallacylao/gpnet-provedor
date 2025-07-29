import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReferralFormData {
  subscriberName: string;
  subscriberCpf: string;
  subscriberPhone: string;
  nomineeName: string;
  nomineePhone: string;
}

interface ValidationErrors {
  subscriberName?: string;
  subscriberCpf?: string;
  subscriberPhone?: string;
  nomineeName?: string;
  nomineePhone?: string;
}

export const useReferralForm = () => {
  const [formData, setFormData] = useState<ReferralFormData>({
    subscriberName: '',
    subscriberCpf: '',
    subscriberPhone: '',
    nomineeName: '',
    nomineePhone: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateCPF = (cpf: string): boolean => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    // Algoritmo de validação do CPF
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers[i]) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers[9])) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers[10])) return false;
    
    return true;
  };

  const validatePhone = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validar nome do assinante
    if (!formData.subscriberName.trim()) {
      newErrors.subscriberName = 'Nome do assinante é obrigatório';
    } else if (formData.subscriberName.trim().length < 2) {
      newErrors.subscriberName = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validar CPF
    if (!formData.subscriberCpf.trim()) {
      newErrors.subscriberCpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.subscriberCpf)) {
      newErrors.subscriberCpf = 'CPF inválido';
    }

    // Validar telefone do assinante
    if (!formData.subscriberPhone.trim()) {
      newErrors.subscriberPhone = 'Telefone do assinante é obrigatório';
    } else if (!validatePhone(formData.subscriberPhone)) {
      newErrors.subscriberPhone = 'Telefone inválido';
    }

    // Validar nome do indicado
    if (!formData.nomineeName.trim()) {
      newErrors.nomineeName = 'Nome do indicado é obrigatório';
    } else if (formData.nomineeName.trim().length < 2) {
      newErrors.nomineeName = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validar telefone do indicado
    if (!formData.nomineePhone.trim()) {
      newErrors.nomineePhone = 'Telefone do indicado é obrigatório';
    } else if (!validatePhone(formData.nomineePhone)) {
      newErrors.nomineePhone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleInputChange = (field: keyof ReferralFormData, value: string) => {
    let formattedValue = value;

    if (field === 'subscriberCpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'subscriberPhone' || field === 'nomineePhone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const submitForm = async (): Promise<boolean> => {
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-referral-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Indicação enviada com sucesso!",
        description: "Obrigado por participar do nosso programa de indicações. Em breve entraremos em contato.",
      });

      // Limpar formulário
      setFormData({
        subscriberName: '',
        subscriberCpf: '',
        subscriberPhone: '',
        nomineeName: '',
        nomineePhone: '',
      });

      return true;
    } catch (error: any) {
      console.error('Error submitting referral:', error);
      toast({
        title: "Erro ao enviar indicação",
        description: error.message || "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    submitForm,
  };
};