import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
const TermsContracts = () => {
  const documents = [{
    title: "Contrato de SCM",
    description: "Contrato de prestação do Serviço de Comunicação Multimídia (SCM) conforme regulamentação da ANATEL.",
    icon: FileText,
    downloadUrl: "#"
  }, {
    title: "Termo de Adesão ao Contrato",
    description: "Documento que formaliza a adesão do cliente aos serviços da GPNet.",
    icon: FileText,
    downloadUrl: "#"
  }, {
    title: "Termo de Fidelidade",
    description: "Condições e benefícios aplicáveis aos planos com período de fidelidade.",
    icon: FileText,
    downloadUrl: "#"
  }, {
    title: "Promoções e Ofertas",
    description: "Regulamentos e condições das promoções e ofertas especiais da GPNet.",
    icon: FileText,
    downloadUrl: "#"
  }];
  return <div className="min-h-screen">
      <Helmet>
        <title>Termos e Contratos - GPNet | Documentos Legais Internet Sobral</title>
        <meta name="description" content="Acesse todos os termos de uso, contratos e documentos legais da GPNet. Transparência total nos nossos serviços de internet em Sobral, CE." />
        <link rel="canonical" href="https://www.gpnetce.com.br/termos-contratos" />
      </Helmet>
      <Header />
      <main className="pt-40 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Termos e Contratos</h1>
            <p className="text-xl text-gray-600">
              Acesse todos os documentos contratuais e termos da GPNet
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {documents.map((doc, index) => <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <doc.icon className="w-8 h-8 text-gpnet-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {doc.description}
                    </p>
                    <button onClick={() => window.open(doc.downloadUrl, '_blank')} className="inline-flex items-center space-x-2 bg-gpnet-blue text-white px-4 py-2 rounded-lg hover:bg-gpnet-blue-dark transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Baixar Documento</span>
                    </button>
                  </div>
                </div>
              </div>)}
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Informações Importantes</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                • Todos os contratos estão em conformidade com a regulamentação da ANATEL.
              </p>
              <p>
                • Os documentos são atualizados conforme mudanças na legislação.
              </p>
              <p>
                • Para dúvidas sobre os termos contratuais, entre em contato conosco.
              </p>
              <p>
                • Os contratos assinados digitalmente têm a mesma validade jurídica dos físicos.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Precisa de Ajuda?</h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está disponível para esclarecer qualquer dúvida sobre os contratos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5588997129857" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                WhatsApp: (88) 9 9712-9857
              </a>
              <a href="mailto:contato@gpnetce.com.br" className="bg-gpnet-blue text-white px-6 py-3 rounded-lg hover:bg-gpnet-blue-dark transition-colors">E-mail: sac@gpnetce.com.br</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default TermsContracts;