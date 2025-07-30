
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como posso contratar os serviços da GPNet?",
      answer: "Você pode contratar nossos serviços através do nosso site, ligando para (88) 9 9712-9857 ou visitando nosso escritório na Rua 4, 43 - Cohab II, Sobral/CE."
    },
    {
      question: "Qual é a velocidade real da internet?",
      answer: "A GPNet garante até 80% da velocidade contratada via cabo ethernet. A velocidade pode variar dependendo de fatores como distância do roteador, interferências e número de dispositivos conectados."
    },
    {
      question: "Como funciona a instalação?",
      answer: "Nossa equipe técnica agenda a instalação conforme sua disponibilidade. O processo inclui a instalação do equipamento, configuração da rede e testes de velocidade. A instalação é gratuita."
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Aceitamos pagamento via boleto bancário, cartão de crédito, débito automático e PIX. O vencimento padrão é todo dia 10 do mês."
    },
    {
      question: "Como acessar a Central do Assinante?",
      answer: "Acesse central.gpnetce.com.br com seu CPF e senha. Na central você pode acompanhar seu consumo, emitir 2ª via de boletos e abrir chamados técnicos."
    },
    {
      question: "O que fazer em caso de problemas técnicos?",
      answer: "Em caso de problemas, você pode entrar em contato pelo WhatsApp (88) 9 9712-9857, abrir um chamado na Central do Assinante ou ligar para nosso suporte técnico."
    },
    {
      question: "Existe fidelidade nos planos?",
      answer: "Nossos planos residenciais não possuem fidelidade. Você pode cancelar o serviço a qualquer momento com aviso prévio de 30 dias."
    },
    {
      question: "A GPNet oferece IP fixo?",
      answer: "Sim, oferecemos IP fixo para clientes que necessitam, especialmente para uso empresarial. Consulte nossos consultores para mais informações."
    },
    {
      question: "Como funciona o suporte técnico?",
      answer: "Nosso suporte técnico funciona de segunda a sábado, das 8h às 18h. Para emergências, mantemos plantão 24h através do WhatsApp."
    },
    {
      question: "Posso mudar meu plano a qualquer momento?",
      answer: "Sim, você pode fazer upgrade do seu plano a qualquer momento. Para downgrade, há carência de 60 dias após a última alteração."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-40 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
            <p className="text-xl text-gray-600">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold hover:text-gpnet-blue">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Não encontrou sua resposta?</h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco através dos nossos canais de atendimento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5588997129857"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                WhatsApp: (88) 9 9712-9857
              </a>
              <a
                href="mailto:contato@gpnetce.com.br"
                className="bg-gpnet-blue text-white px-6 py-3 rounded-lg hover:bg-gpnet-blue-dark transition-colors"
              >
                E-mail: contato@gpnetce.com.br
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
