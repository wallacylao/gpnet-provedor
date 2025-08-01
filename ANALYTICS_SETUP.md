# Configuração do Google Analytics e Search Console

## ✅ O que foi implementado

### Google Analytics 4 (GA4)
- ✅ Hook personalizado `useGoogleAnalytics` para gerenciar tracking
- ✅ Integração com sistema de consentimento de cookies (LGPD compliant)
- ✅ Tracking de eventos personalizados:
  - **Cliques nos planos** (conversão primária)
  - **Cliques no WhatsApp** (conversão secundária)  
  - **Visualizações de página**
- ✅ Configurações de privacidade (IP anonimizado)
- ✅ Componente GoogleAnalytics que carrega apenas com consentimento

### Google Search Console
- ✅ Meta tag de verificação adicionada no `index.html`
- ✅ Estrutura preparada para submissão do sitemap

---

## 🔧 Próximos passos (VOCÊ PRECISA FAZER)

### 1. Configurar Google Analytics
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma nova propriedade GA4 para `www.gpnetce.com.br`
3. Copie o **Measurement ID** (formato: G-XXXXXXXXXX)
4. **SUBSTITUA** `G-XXXXXXXXXX` nos arquivos:
   - `index.html` (linha 27)
   - `src/hooks/useGoogleAnalytics.ts` (linhas 22 e 75)
   - `src/components/GoogleAnalytics.tsx` (linha 23)

### 2. Configurar Google Search Console
1. Acesse [Google Search Console](https://search.google.com/search-console/)
2. Adicione a propriedade `https://www.gpnetce.com.br`
3. Escolha verificação por **Meta tag HTML**
4. Copie o código de verificação 
5. **SUBSTITUA** `SUBSTITUA_PELO_SEU_CODIGO_DE_VERIFICACAO` no `index.html` (linha 24)

### 3. Após implementação
1. **Submeter sitemap**: `https://www.gpnetce.com.br/sitemap.xml`
2. **Configurar goals** no GA4:
   - Conversão: `plan_click`
   - Conversão: `whatsapp_click`
   - Engagement: `form_submit`

---

## 📊 Eventos sendo rastreados

### Conversões Primárias
- **`plan_click`**: Quando usuário clica em "Assinar" um plano
  - Parâmetros: `plan_name`, `plan_price`, `value`, `currency`

### Conversões Secundárias  
- **`whatsapp_click`**: Quando usuário clica no WhatsApp
  - Parâmetros: `source` (floating_button, plan_click)

### Engajamento
- **`form_submit`**: Quando usuário envia formulário
  - Parâmetros: `form_type`

### Navegação
- **Page views**: Rastreamento automático de páginas visitadas

---

## 🔒 Compliance LGPD

- ✅ Analytics só carrega após consentimento explícito
- ✅ IP anonimizado
- ✅ Sinais do Google desabilitados
- ✅ Personalização de anúncios desabilitada
- ✅ Sistema de opt-out implementado

---

## 🎯 Benefícios após configuração

### Insights de Tráfego
- Páginas mais visitadas
- Origem dos usuários (orgânico, direto, redes sociais)
- Comportamento de navegação

### Conversões
- Taxa de conversão por plano
- ROI dos canais de marketing
- Funil de conversão completo

### SEO Performance  
- Palavras-chave que trazem tráfego
- Páginas com problemas de indexação
- Core Web Vitals e velocidade

### Otimizações Baseadas em Dados
- Identificar planos mais populares
- Melhorar páginas com alta rejeição
- Otimizar funil de conversão