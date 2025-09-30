# Guia de Integração do Instagram - SPORTS TRAINING

## Visão Geral

Este guia explica como configurar e usar a integração do Instagram implementada no site da SPORTS TRAINING. A integração inclui:

- Seção dedicada ao Instagram no site
- Feed de posts recentes (até 3 posts)
- Fallback content quando a API não está disponível
- Design responsivo e moderno
- Integração com a navegação do site

## Funcionalidades Implementadas

### 1. Seção Instagram
- **Localização**: Entre a seção Hero e About
- **Design**: Grid responsivo com 3 colunas (1 coluna em mobile)
- **Conteúdo**: Posts do Instagram @sportstrainingct

### 2. Estados da Integração
- **Loading**: Spinner de carregamento enquanto busca posts
- **Fallback**: Conteúdo simulado quando API não está disponível
- **Real Posts**: Posts reais do Instagram (quando API configurada)

### 3. Interatividade
- Clique nos posts abre o Instagram em nova aba
- Botão "Ver mais no Instagram" leva ao perfil
- Animações hover nos cards

## Configuração da API do Instagram

### Opção 1: Instagram Basic Display API (Recomendado)

Para usar posts reais do Instagram, você precisa:

1. **Criar uma App no Facebook Developers**
   - Acesse: https://developers.facebook.com/
   - Crie uma nova app
   - Adicione o produto "Instagram Basic Display"

2. **Configurar a App**
   - Adicione domínios válidos
   - Configure redirect URIs
   - Gere um access token

3. **Implementar no Código**
   ```javascript
   // No arquivo script.js, substitua o método loadInstagramPosts():
   async loadInstagramPosts() {
       const accessToken = 'SEU_ACCESS_TOKEN_AQUI';
       const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`);
       const data = await response.json();
       
       if (data.data && data.data.length > 0) {
           this.displayRealPosts(data.data.slice(0, this.maxPosts));
       } else {
           throw new Error('No posts found');
       }
   }
   ```

### Opção 2: Instagram Embed (Alternativa Simples)

Para usar embeds do Instagram:

1. **Obter URLs dos Posts**
   - Vá para o Instagram @sportstrainingct
   - Copie URLs dos posts que deseja exibir
   - Cole no array `instagramPosts` no código

2. **Ativar no Código**
   ```javascript
   // No final do script.js, descomente esta linha:
   new InstagramEmbed();
   
   // E comente esta linha:
   // new InstagramFeed();
   ```

3. **Adicionar URLs dos Posts**
   ```javascript
   this.instagramPosts = [
       'https://www.instagram.com/p/ABC123/',
       'https://www.instagram.com/p/DEF456/',
       'https://www.instagram.com/p/GHI789/',
   ];
   ```

## Personalização

### Alterar Número de Posts
```javascript
// No construtor da classe InstagramFeed:
this.maxPosts = 6; // Altere para o número desejado
```

### Alterar Username do Instagram
```javascript
// No construtor da classe InstagramFeed:
this.instagramUsername = 'seu_username_aqui';
```

### Personalizar Fallback Content
Edite o HTML na seção `instagram-fallback` no arquivo `index.html`:

```html
<div class="instagram-post-card">
    <div class="post-image">
        <i class="fas fa-dumbbell"></i>
    </div>
    <div class="post-content">
        <p>Seu texto personalizado aqui! 💪</p>
        <div class="post-meta">
            <span class="post-date">Há 2 dias</span>
            <span class="post-likes">❤️ 45</span>
        </div>
    </div>
</div>
```

## Estilos CSS

### Cores Principais
- **Primária**: #dc2626 (vermelho)
- **Gradiente Instagram**: Linear gradient com cores do Instagram
- **Background**: Gradiente suave cinza

### Responsividade
- **Desktop**: 3 colunas
- **Tablet**: 2 colunas
- **Mobile**: 1 coluna

### Animações
- Hover effects nos cards
- Loading spinner
- Fade-in animations

## Troubleshooting

### Problemas Comuns

1. **Posts não carregam**
   - Verifique se o access token está correto
   - Confirme se a app do Facebook está configurada
   - Verifique o console do navegador para erros

2. **Fallback não aparece**
   - Verifique se o JavaScript está carregando
   - Confirme se os IDs dos elementos estão corretos

3. **Design quebrado**
   - Verifique se o CSS está carregando
   - Confirme se as classes CSS estão aplicadas

### Logs de Debug
O código inclui logs no console para debug:
```javascript
console.log('Instagram API not available, showing fallback content');
```

## Manutenção

### Atualização de Posts
- **API**: Posts são atualizados automaticamente
- **Embed**: Atualize manualmente os URLs no código

### Monitoramento
- Verifique regularmente se a API está funcionando
- Monitore o console para erros
- Teste em diferentes dispositivos

## Segurança

### Access Token
- Mantenha o access token seguro
- Use variáveis de ambiente em produção
- Renove o token quando necessário

### HTTPS
- A API do Instagram requer HTTPS em produção
- Configure SSL no seu servidor

## Próximos Passos

1. **Configurar API do Instagram** (se desejar posts reais)
2. **Testar em diferentes dispositivos**
3. **Personalizar conteúdo fallback**
4. **Configurar monitoramento**
5. **Documentar para a equipe**

## Suporte

Para dúvidas ou problemas:
- Consulte a documentação oficial do Instagram Basic Display API
- Verifique os logs do console do navegador
- Teste em ambiente de desenvolvimento primeiro

---

**Nota**: Esta integração está pronta para uso imediato com o conteúdo fallback. Para posts reais do Instagram, configure a API conforme descrito acima.
