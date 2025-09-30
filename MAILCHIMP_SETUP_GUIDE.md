# Guia de Configuração do Mailchimp - SPORTS TRAINING

## Visão Geral

Este guia explica como configurar o Mailchimp para que o formulário de newsletter funcione e envie emails reais para sua lista de contatos.

## Passo 1: Criar Conta no Mailchimp

1. **Acesse**: https://mailchimp.com/
2. **Crie uma conta gratuita** (permite até 2.000 contatos)
3. **Complete o perfil** da sua empresa
4. **Faça login** na sua conta

## Passo 2: Criar Lista de Contatos

1. **Vá para "Audience"** no menu principal
2. **Clique em "Create Audience"**
3. **Configure a lista**:
   - **Audience name**: "SPORTS TRAINING Newsletter"
   - **Default from email**: contato@sportstraining.com.br
   - **Default from name**: SPORTS TRAINING
   - **Reminder email**: Seu email pessoal

4. **Complete as configurações** e salve
5. **Anote o Audience ID** (encontrado em Settings > Audience name and defaults)

## Passo 3: Obter API Key

1. **Vá para "Account" > "Extras" > "API keys"**
2. **Clique em "Create A Key"**
3. **Dê um nome** para a chave (ex: "SPORTS TRAINING Website")
4. **Copie a API Key** (formato: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1)
5. **Anote o server prefix** (parte após o hífen, ex: "us1")

## Passo 4: Configurar no Código

Edite o arquivo `script.js` e substitua os valores:

```javascript
// Linha 335 - Substitua 'YOUR_MAILCHIMP_API_KEY'
const MAILCHIMP_API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1';

// Linha 336 - Substitua 'YOUR_LIST_ID'
const MAILCHIMP_LIST_ID = 'abc123def456';

// Linha 337 - Substitua 'YOUR_SERVER_PREFIX'
const MAILCHIMP_SERVER_PREFIX = 'us1';
```

### Como encontrar o List ID:
1. Vá para "Audience" > "Settings" > "Audience name and defaults"
2. O List ID está no final da URL ou na seção "Audience ID"

## Passo 5: Configurar Campos Personalizados (Opcional)

1. **Vá para "Audience" > "Settings" > "Audience fields and |MERGE| tags"**
2. **Adicione campos personalizados** se necessário:
   - FNAME (First Name)
   - LNAME (Last Name)
   - PHONE (Phone Number)

## Passo 6: Testar o Formulário

1. **Abra o site** no navegador
2. **Vá para a seção newsletter**
3. **Digite um email de teste**
4. **Clique em "Inscrever-se"**
5. **Verifique no Mailchimp** se o contato foi adicionado

## Configuração Completa no Código

Substitua estas linhas no `script.js`:

```javascript
async subscribeToMailchimp(email) {
    // Substitua pelos seus valores reais
    const MAILCHIMP_API_KEY = 'sua_api_key_aqui';
    const MAILCHIMP_LIST_ID = 'seu_list_id_aqui';
    const MAILCHIMP_SERVER_PREFIX = 'seu_server_prefix_aqui';
    
    // Resto do código permanece igual
}
```

## Método Alternativo: Formulário Embed (Mais Simples)

Se preferir uma configuração mais simples:

1. **Vá para "Audience" > "Signup forms" > "Embedded forms"**
2. **Escolha "Classic"**
3. **Copie o código HTML**
4. **Substitua o método no JavaScript**:

```javascript
// Use este método em vez de subscribeToMailchimp
async subscribeWithEmbeddedForm(email) {
    const MAILCHIMP_FORM_ACTION = 'https://sportstraining.us1.list-manage.com/subscribe/post?u=SEU_USER_ID&id=SEU_LIST_ID';
    
    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('b_SEU_LIST_ID', '');
    formData.append('subscribe', 'Subscribe');

    const response = await fetch(MAILCHIMP_FORM_ACTION, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    });

    return true;
}
```

## Funcionalidades Implementadas

### ✅ Validação Completa
- **Email**: Obrigatório, formato válido
- **Validação em tempo real** ao sair do campo
- **Feedback visual** imediato

### ✅ Integração Mailchimp
- **API completa** com tratamento de erros
- **Tags automáticas** (website, newsletter, sports-training)
- **Status de inscrição** configurável
- **Campos personalizados** suportados

### ✅ Estados Visuais
- **Loading**: Spinner durante envio
- **Sucesso**: Mensagem verde de confirmação
- **Erro**: Mensagens específicas em português
- **Validação**: Bordas coloridas (vermelho/verde)

### ✅ Experiência do Usuário
- **Mensagens claras** em português
- **Feedback visual** imediato
- **Formulário limpo** após envio
- **Scroll automático** para mensagens

## Limites do Plano Gratuito

- **2.000 contatos**
- **10.000 emails por mês**
- **1 usuário**
- **Templates básicos**

## Upgrade (Opcional)

Para mais recursos:
- **Essentials**: $9.99/mês - 50.000 contatos
- **Standard**: $14.99/mês - 100.000 contatos
- **Premium**: $299/mês - 200.000+ contatos

## Troubleshooting

### Problemas Comuns

1. **"Invalid API Key"**
   - Verifique se a API key está correta
   - Confirme se não há espaços extras

2. **"List not found"**
   - Verifique o List ID
   - Confirme se a lista está ativa

3. **"CORS Error"**
   - Use o método embedded form
   - Configure CORS no servidor (se possível)

4. **"Member already exists"**
   - Tratado automaticamente no código
   - Mostra mensagem amigável

### Logs de Debug

O código inclui logs no console:
```javascript
console.error('Newsletter subscription error:', error);
```

## Segurança

- ✅ **API Key**: Mantenha segura, não compartilhe
- ✅ **HTTPS**: Funciona apenas em sites seguros
- ✅ **Validação**: Dados validados antes do envio
- ✅ **Rate limiting**: Proteção contra spam

## Próximos Passos

1. **Configure o Mailchimp** seguindo este guia
2. **Teste o formulário** com emails reais
3. **Monitore a lista** de contatos
4. **Crie campanhas** de email marketing
5. **Configure automações** (bem-vindo, etc.)

## Templates de Email

### Email de Boas-vindas
```
Assunto: Bem-vindo ao SPORTS TRAINING! 🏋️‍♀️

Olá!

Obrigado por se inscrever na nossa newsletter!

Você receberá:
✅ Dicas de treino semanais
✅ Receitas fitness exclusivas  
✅ Promoções especiais

Acesse nosso site: [link]
Siga-nos no Instagram: @sportstrainingct

Equipe SPORTS TRAINING
```

### Email Semanal
```
Assunto: Dica da Semana: [Título do Treino]

Olá [NOME]!

Esta semana vamos falar sobre [TEMA].

[Conteúdo do email]

Continue treinando com a SPORTS TRAINING!

Equipe SPORTS TRAINING
```

## Automações Recomendadas

1. **Email de Boas-vindas** (imediato)
2. **Série de 3 emails** (dias 1, 3, 7)
3. **Lembrete mensal** (todo dia 1)
4. **Promoções sazonais** (datas específicas)

---

**Nota**: O formulário está pronto para uso imediato após a configuração do Mailchimp. Todas as validações e funcionalidades já estão implementadas.
