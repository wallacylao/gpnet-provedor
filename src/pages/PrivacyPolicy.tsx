
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Informações Gerais</h2>
              <p className="text-gray-700 leading-relaxed">
                A GPNet está comprometida em proteger a privacidade e os dados pessoais de nossos clientes. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações 
                pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Dados Coletados</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Coletamos os seguintes tipos de dados:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Dados de identificação: nome completo, CPF, RG, data de nascimento</li>
                <li>Dados de contato: endereço, telefone, e-mail</li>
                <li>Dados de conexão: logs de acesso, endereços IP, dados de tráfego</li>
                <li>Dados financeiros: informações de pagamento e histórico de faturas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Finalidade do Tratamento</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Prestação dos serviços de internet contratados</li>
                <li>Gestão da relação contratual e cobrança</li>
                <li>Suporte técnico e atendimento ao cliente</li>
                <li>Cumprimento de obrigações legais e regulatórias</li>
                <li>Melhoria dos nossos serviços</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Dados</h2>
              <p className="text-gray-700 leading-relaxed">
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, 
                exceto quando necessário para a prestação dos serviços, cumprimento de obrigações legais 
                ou mediante seu consentimento expresso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Segurança dos Dados</h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados 
                contra acesso não autorizado, alteração, divulgação ou destruição indevida.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">De acordo com a LGPD, você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a exclusão de dados desnecessários ou excessivos</li>
                <li>Revogar seu consentimento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contato</h2>
              <p className="text-gray-700 leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                entre em contato conosco através do e-mail: contato@gpnetce.com.br ou 
                telefone: (88) 9 9712-9857.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Alterações</h2>
              <p className="text-gray-700 leading-relaxed">
                Esta Política de Privacidade pode ser atualizada periodicamente. 
                Recomendamos que você a consulte regularmente para se manter informado sobre 
                como protegemos suas informações.
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
