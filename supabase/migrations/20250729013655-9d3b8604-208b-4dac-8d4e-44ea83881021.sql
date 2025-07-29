-- Criar tabela para armazenar indicações
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_name TEXT NOT NULL,
  subscriber_cpf TEXT NOT NULL,
  subscriber_phone TEXT NOT NULL,
  nominee_name TEXT NOT NULL,
  nominee_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de qualquer pessoa
CREATE POLICY "Anyone can submit referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);

-- Política para usuários autenticados visualizarem indicações
CREATE POLICY "Authenticated users can view referrals" 
ON public.referrals 
FOR SELECT 
USING (auth.role() = 'authenticated'::text);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_referrals_updated_at
BEFORE UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();