# Guia de Configuração do EmailJS - SPORTS TRAINING

## Visão Geral

Este guia explica como configurar o EmailJS para que o formulário de contato funcione e envie emails reais para o seu endereço de email.

## Passo 1: Criar Conta no EmailJS

1. **Acesse**: https://www.emailjs.com/
2. **Crie uma conta gratuita** (permite 200 emails/mês)
3. **Faça login** na sua conta

## Passo 2: Configurar Serviço de Email

1. **Vá para "Email Services"** no dashboard
2. **Clique em "Add New Service"**
3. **Escolha seu provedor de email**:
   - Gmail (recomendado)
   - Outlook
   - Yahoo
   - Outros

### Para Gmail:
1. Selecione "Gmail"
2. Clique em "Connect Account"
3. Faça login com sua conta Gmail
4. Autorize o EmailJS
5. **Anote o Service ID** (ex: service_abc123)

## Passo 3: Criar Template de Email

1. **Vá para "Email Templates"**
2. **Clique em "Create New Template"**
3. **Configure o template**:

### Template HTML:
```html
<h2>Nova Mensagem do Site SPORTS TRAINING</h2>

<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Telefone:</strong> {{phone}}</p>
<p><strong>Interesse:</strong> {{interest}}</p>
<p><strong>Mensagem:</strong></p>
<p>{{message}}</p>

<hr>
<p><em>Enviado através do formulário de contato do site SPORTS TRAINING</em></p>
```

### Configurações do Template:
- **Template Name**: "Contact Form - SPORTS TRAINING"
- **Subject**: "Nova mensagem do site - {{from_name}}"
- **To Email**: Seu email (ex: contato@sportstraining.com.br)
- **From Name**: SPORTS TRAINING
- **Reply To**: {{from_email}}

4. **Salve o template**
5. **Anote o Template ID** (ex: template_xyz789)

## Passo 4: Obter Chave Pública

1. **Vá para "Account" > "General"**
2. **Encontre "Public Key"**
3. **Copie a chave** (ex: user_abc123def456)

## Passo 5: Configurar no Código

Edite o arquivo `script.js` e substitua os valores:

```javascript
// Linha 73 - Substitua 'YOUR_PUBLIC_KEY'
emailjs.init('user_abc123def456');

// Linha 114 - Substitua 'YOUR_SERVICE_ID'
await emailjs.send(
    'service_abc123', // Seu Service ID
    'YOUR_TEMPLATE_ID', // Seu Template ID
    emailData
);

// Linha 115 - Substitua 'YOUR_TEMPLATE_ID'
await emailjs.send(
    'YOUR_SERVICE_ID', // Seu Service ID
    'template_xyz789', // Seu Template ID
    emailData
);
```

## Passo 6: Testar o Formulário

1. **Abra o site** no navegador
2. **Vá para a seção de contato**
3. **Preencha o formulário** com dados de teste
4. **Envie o formulário**
5. **Verifique seu email** - você deve receber a mensagem

## Configuração Completa no Código

Substitua estas linhas no `script.js`:

```javascript
initEmailJS() {
    // Substitua pela sua chave pública
    emailjs.init('user_SUA_CHAVE_AQUI');
}

// E também:
await emailjs.send(
    'service_SEU_SERVICE_ID', // Seu Service ID
    'template_SEU_TEMPLATE_ID', // Seu Template ID
    emailData
);
```

## Funcionalidades Implementadas

### ✅ Validação Completa
- **Nome**: Obrigatório, mínimo 2 caracteres
- **Email**: Obrigatório, formato válido
- **Telefone**: Obrigatório, formato brasileiro
- **Interesse**: Obrigatório
- **Mensagem**: Opcional

### ✅ Validação em Tempo Real
- Validação ao sair do campo (blur)
- Limpeza de erros ao digitar
- Feedback visual imediato

### ✅ Formatação Automática
- Telefone formatado automaticamente: (54) 99999-9999
- Máscara de entrada em tempo real

### ✅ Estados Visuais
- **Loading**: Spinner durante envio
- **Sucesso**: Mensagem verde de confirmação
- **Erro**: Mensagens de erro específicas
- **Validação**: Bordas coloridas (vermelho/verde)

### ✅ Experiência do Usuário
- Mensagens de erro claras em português
- Feedback visual imediato
- Formulário limpo após envio
- Scroll automático para mensagem de sucesso

## Limites do Plano Gratuito

- **200 emails por mês**
- **2 templates**
- **1 serviço de email**

## Upgrade (Opcional)

Para mais emails:
- **Plano Starter**: $15/mês - 1.000 emails
- **Plano Pro**: $30/mês - 10.000 emails

## Troubleshooting

### Problemas Comuns

1. **"EmailJS not defined"**
   - Verifique se o script do EmailJS está carregando
   - Confirme se a chave pública está correta

2. **"Service not found"**
   - Verifique o Service ID
   - Confirme se o serviço está ativo

3. **"Template not found"**
   - Verifique o Template ID
   - Confirme se o template está publicado

4. **Emails não chegam**
   - Verifique a pasta de spam
   - Confirme o endereço de email no template
   - Teste com outro email

### Logs de Debug

O código inclui logs no console:
```javascript
console.error('EmailJS Error:', error);
```

## Segurança

- ✅ **Chave pública**: Segura para usar no frontend
- ✅ **Rate limiting**: Proteção contra spam
- ✅ **Validação**: Dados validados antes do envio
- ✅ **HTTPS**: Funciona apenas em sites seguros

## Próximos Passos

1. **Configure o EmailJS** seguindo este guia
2. **Teste o formulário** com dados reais
3. **Monitore os emails** recebidos
4. **Ajuste o template** se necessário
5. **Configure backup** (WhatsApp, telefone)

---

**Nota**: O formulário está pronto para uso imediato após a configuração do EmailJS. Todas as validações e funcionalidades já estão implementadas.

