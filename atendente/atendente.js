/* Assistente do Dione · atendente do dionefolador.com (sem IA e sem custo por token)
   Responde com regras locais, sem chamar nenhum servidor. Indica a loja e encaminha ao WhatsApp.
   Uso: <script src="/atendente/atendente.js" data-bottom="18" defer></script>
*/
(function () {
  'use strict';

  var script = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();

  var WHATS  = '5534993421500';
  var BASE   = parseInt(script.getAttribute('data-bottom') || '18', 10) || 18;
  var AVATAR = new URL('dione.webp', script.src).href;

  var SITE     = 'https://dionefolador.com/';
  var LOJA     = SITE + 'soberania-loja/';
  var PRODUTOS = LOJA + '#produtos';
  var GUIA     = LOJA + '#gratis';
  var MENTORIA = SITE + 'mentoria_checkout.html';
  var CARTAO   = SITE + 'cartoes';
  var CONSULTA = 'https://mpago.la/28d4s8n';

  var CONVITES = ['Dúvida sobre cripto?', 'Qual ebook é pra você?', 'Posso te ajudar?'];
  var ABERTURA = 'Oi! Sou o assistente do Dione Folador. Posso te explicar sobre autocustódia e segurança em cripto, te ajudar a escolher o ebook certo e mostrar a mentoria. Escolha uma opção ou escreva sua dúvida.';

  /* ---------------- estilo ---------------- */
  var css = ''
  + '.df-b,.df-p,.df-c{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;box-sizing:border-box}'
  + '.df-b *,.df-p *{box-sizing:border-box}'
  + '.df-orb{position:fixed;right:18px;z-index:2147483000;display:flex;align-items:center;gap:10px;flex-direction:row-reverse}'
  + '.df-orb.df-off{display:none}'
  + '.df-b{position:relative;width:70px;height:70px;flex:none;border:0;padding:0;cursor:pointer;background:transparent;'
  +   'animation:df-flutua 4.2s ease-in-out infinite;transition:transform .22s ease;'
  +   'filter:drop-shadow(0 10px 16px rgba(0,0,0,.5)) drop-shadow(0 0 14px rgba(245,158,11,.3))}'
  + '.df-b:hover{transform:scale(1.06)}'
  + '.df-b:active{transform:scale(.95)}'
  + '.df-logo{display:block;width:100%;height:100%;border-radius:50%;overflow:hidden;background:#0b0b0c;'
  +   'border:3px solid #f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,.22)}'
  + '.df-logo img{width:100%;height:100%;object-fit:cover;display:block}'
  + '.df-on{position:absolute;right:3px;bottom:3px;width:14px;height:14px;border-radius:50%;background:#4ec77d;border:2px solid #0b0b0c}'
  + '@keyframes df-flutua{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}'
  + '.df-cv{max-width:200px;flex:none;background:#fff;color:#111;padding:11px 15px;border-radius:16px 16px 3px 16px;'
  +   'font-size:14px;line-height:1.45;font-weight:600;box-shadow:0 8px 26px rgba(0,0,0,.3);'
  +   'opacity:0;transform:translateY(6px) scale(.94);transition:opacity .3s ease,transform .3s ease;cursor:pointer;pointer-events:none}'
  + '.df-cv.df-ver{opacity:1;transform:none;pointer-events:auto}'
  + '.df-p{position:fixed;right:18px;z-index:2147483001;width:min(380px,calc(100vw - 24px));'
  +   'height:min(580px,calc(100dvh - 36px));background:#0b0b0c;border:1px solid rgba(245,158,11,.3);'
  +   'border-radius:20px;box-shadow:0 22px 60px rgba(0,0,0,.6);display:none;flex-direction:column;overflow:hidden}'
  + '.df-p.df-ver{display:flex;animation:df-abre .26s ease both}'
  + '@keyframes df-abre{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}'
  + '.df-h{flex:none;padding:13px 15px;background:linear-gradient(140deg,#17140d,#0b0b0c);'
  +   'border-bottom:1px solid rgba(245,158,11,.22);display:flex;align-items:center;gap:11px}'
  + '.df-av{width:40px;height:40px;flex:none}'
  + '.df-av .df-logo{border-width:2px;box-shadow:none}'
  + '.df-hn{flex:1;min-width:0}'
  + '.df-hn b{display:block;font-size:14.5px;color:#f5efe2;font-weight:700;line-height:1.2}'
  + '.df-hn i{display:block;font-style:normal;font-size:11.5px;color:#a8a294;margin-top:2px}'
  + '.df-hn i::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#4ec77d;margin-right:5px;vertical-align:middle}'
  + '.df-x{flex:none;width:34px;height:34px;border:0;background:transparent;color:#a8a294;cursor:pointer;border-radius:9px;font-size:21px;line-height:1}'
  + '.df-x:hover{background:rgba(255,255,255,.07);color:#f5efe2}'
  + '.df-atalho{flex:none;padding:9px 15px;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(14,122,62,.09)}'
  + '.df-atalho a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:38px;border-radius:99px;'
  +   'background:rgba(14,122,62,.16);border:1px solid rgba(78,199,125,.3);color:#7fe0a4;font-size:12.5px;font-weight:600;text-decoration:none}'
  + '.df-atalho a:hover{background:rgba(14,122,62,.26)}'
  + '.df-atalho svg,.df-zap svg{width:16px;height:16px;flex:none}'
  + '.df-c{flex:1;overflow-y:auto;padding:16px 15px;display:flex;flex-direction:column;gap:11px;-webkit-overflow-scrolling:touch}'
  + '.df-m{max-width:88%;padding:10px 14px;border-radius:15px;font-size:14.5px;line-height:1.55;'
  +   'animation:df-sobe .26s ease both;white-space:pre-wrap;word-wrap:break-word}'
  + '@keyframes df-sobe{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}'
  + '.df-m.df-ele{align-self:flex-start;background:#1b1812;color:#f1ebdd;border-bottom-left-radius:4px}'
  + '.df-m.df-eu{align-self:flex-end;background:linear-gradient(140deg,#fcd34d,#f59e0b);color:#1a1100;border-bottom-right-radius:4px;font-weight:600}'
  + '.df-pt{align-self:flex-start;display:flex;gap:4px;padding:13px 15px;background:#1b1812;border-radius:15px;border-bottom-left-radius:4px}'
  + '.df-pt i{width:6px;height:6px;border-radius:50%;background:#f59e0b;animation:df-pisca 1.3s infinite}'
  + '.df-pt i:nth-child(2){animation-delay:.18s}.df-pt i:nth-child(3){animation-delay:.36s}'
  + '@keyframes df-pisca{0%,60%,100%{opacity:.25}30%{opacity:1}}'
  + '.df-acoes{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;white-space:normal}'
  + '.df-ir,.df-zap{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:9px 16px;border-radius:99px;'
  +   'font-size:13px;font-weight:700;text-decoration:none}'
  + '.df-ir{background:linear-gradient(140deg,#fcd34d,#f59e0b);color:#1a1100;box-shadow:0 6px 18px rgba(245,158,11,.25)}'
  + '.df-ir:hover{filter:brightness(1.08)}'
  + '.df-zap{background:#0e7a3e;color:#fff;box-shadow:0 6px 18px rgba(14,122,62,.32)}'
  + '.df-zap:hover{background:#0b6b35}'
  + '.df-ch{display:flex;flex-wrap:wrap;gap:7px;margin-top:2px}'
  + '.df-ch button{border:1px solid rgba(245,158,11,.45);background:rgba(245,158,11,.1);color:#fcd34d;font:inherit;'
  +   'font-size:13px;padding:8px 13px;border-radius:99px;cursor:pointer}'
  + '.df-ch button:hover{background:rgba(245,158,11,.22)}'
  + '.df-f{flex:none;display:flex;gap:8px;padding:11px 13px;border-top:1px solid rgba(255,255,255,.07);background:#0b0b0c}'
  + '.df-f input{flex:1;min-width:0;min-height:44px;padding:11px 16px;border-radius:99px;background:#1b1812;'
  +   'border:1px solid rgba(255,255,255,.09);color:#f1ebdd;font-size:16px;font-family:inherit;outline:none}'
  + '.df-f input::placeholder{color:#7d776a}'
  + '.df-f input:focus{border-color:rgba(245,158,11,.55)}'
  + '.df-f button{flex:none;width:44px;height:44px;border-radius:50%;border:0;cursor:pointer;'
  +   'background:linear-gradient(140deg,#fcd34d,#f59e0b);color:#1a1100;display:grid;place-items:center}'
  + '.df-f button svg{width:19px;height:19px}'
  + '.df-f button:disabled{opacity:.45;cursor:default}'
  + '.df-aviso{flex:none;padding:0 13px 9px;font-size:10.5px;color:#6f6a5e;text-align:center;background:#0b0b0c}'
  + '@media (max-width:420px){.df-p{right:10px;left:10px;width:auto;height:min(80dvh,580px)}'
  +   '.df-orb{right:14px}.df-cv{max-width:150px;font-size:13px;padding:9px 13px}}'
  + '@media (prefers-reduced-motion:reduce){.df-b,.df-m,.df-p,.df-pt i{animation:none!important}}';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------------- ícones ---------------- */
  var icoFoto = '<span class="df-logo"><img src="' + AVATAR + '" alt="" width="70" height="70"></span>';
  var icoZap  = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>';
  var icoEnv  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>';

  /* ---------------- elementos ---------------- */
  var bolha = document.createElement('button');
  bolha.className = 'df-b';
  bolha.setAttribute('aria-label', 'Abrir o assistente do Dione');
  bolha.innerHTML = icoFoto + '<span class="df-on"></span>';

  var convite = document.createElement('div');
  convite.className = 'df-cv';

  var painel = document.createElement('div');
  painel.className = 'df-p';
  painel.setAttribute('role', 'dialog');
  painel.setAttribute('aria-label', 'Assistente do Dione');
  painel.innerHTML =
      '<div class="df-h">'
    +   '<div class="df-av">' + icoFoto + '</div>'
    +   '<div class="df-hn"><b>Assistente do Dione</b><i>responde na hora</i></div>'
    +   '<button class="df-x" aria-label="Fechar">&times;</button>'
    + '</div>'
    + '<div class="df-atalho">'
    +   '<a href="https://wa.me/' + WHATS + '?text=' + encodeURIComponent('Olá Dione! Vim pelo site dionefolador.com e tenho uma dúvida.') + '" target="_blank" rel="noopener">'
    +     icoZap + 'Prefiro falar direto com o Dione no WhatsApp</a>'
    + '</div>'
    + '<div class="df-c"></div>'
    + '<form class="df-f"><input type="text" placeholder="Escreva sua dúvida" autocomplete="off" aria-label="Sua dúvida">'
    +   '<button type="submit" aria-label="Enviar">' + icoEnv + '</button></form>'
    + '<div class="df-aviso">Conteúdo educativo, não é recomendação de investimento.</div>';

  var orbita = document.createElement('div');
  orbita.className = 'df-orb';
  orbita.style.bottom = BASE + 'px';
  painel.style.bottom = BASE + 'px';
  orbita.appendChild(bolha);
  orbita.appendChild(convite);

  document.body.appendChild(orbita);
  document.body.appendChild(painel);

  // o assistente substitui o botao flutuante de WhatsApp da pagina
  document.querySelectorAll('.whatsapp-float').forEach(function (el) { el.style.display = 'none'; });

  var corpo  = painel.querySelector('.df-c');
  var form   = painel.querySelector('.df-f');
  var campo  = form.querySelector('input');
  var enviar = form.querySelector('button');
  var fechar = painel.querySelector('.df-x');

  var aberto = false, ocupado = false, jaAbriu = false, iConvite = 0, giro = null;

  /* ---------------- convite rotativo ---------------- */
  function mostraConvite() {
    if (aberto || jaAbriu) return;
    convite.textContent = CONVITES[iConvite % CONVITES.length];
    convite.classList.add('df-ver');
    setTimeout(function () { convite.classList.remove('df-ver'); }, 4200);
    iConvite++;
    if (iConvite >= CONVITES.length) { clearInterval(giro); giro = null; }
  }

  var comecou = false;
  function comecarConvites() {
    if (comecou || jaAbriu) return;
    comecou = true;
    mostraConvite();
    giro = setInterval(mostraConvite, 13000);
  }
  setTimeout(comecarConvites, 9000);
  window.addEventListener('scroll', function aoRolar() {
    if (window.scrollY > window.innerHeight * 0.5) {
      comecarConvites();
      window.removeEventListener('scroll', aoRolar);
    }
  }, { passive: true });

  /* ---------------- mensagens ---------------- */
  function msg(quem, texto) {
    var d = document.createElement('div');
    d.className = 'df-m df-' + quem;
    d.textContent = texto;
    corpo.appendChild(d);
    corpo.scrollTop = corpo.scrollHeight;
    return d;
  }

  function botao(classe, href, html) {
    var a = document.createElement('a');
    a.className = classe;
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = html;
    return a;
  }

  function abrir() {
    aberto = true;
    painel.classList.add('df-ver');
    orbita.classList.add('df-off');
    convite.classList.remove('df-ver');
    if (giro) { clearInterval(giro); giro = null; }
    if (!jaAbriu) {
      jaAbriu = true;
      msg('ele', ABERTURA);
      chips(CHIPS);
      if (typeof gtag === 'function') gtag('event', 'abrir_assistente');
    }
    setTimeout(function () { campo.focus(); }, 120);
  }

  function fecharPainel() {
    aberto = false;
    painel.classList.remove('df-ver');
    orbita.classList.remove('df-off');
  }

  bolha.addEventListener('click', abrir);
  convite.addEventListener('click', abrir);
  fechar.addEventListener('click', fecharPainel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && aberto) fecharPainel();
  });

  /* ---------------- base de conhecimento ----------------
     r = resposta, l = botoes [texto, link], z = mensagem pronta do WhatsApp, chips = proximas opcoes.
     A ordem importa: os temas mais especificos ficam em cima. */
  var VER_LOJA = ['Ver os ebooks na loja', PRODUTOS];

  var BASE_CONH = [
    { k: ['perdi minha seed','perdi a seed','perdi as palavras','roubaram','golpe','hackead','invadiram','sumiu meu','sumiram','fui enganado','cai num'],
      r: 'Sinto muito. Primeiro: não passe sua seed, senha ou código para ninguém que prometa recuperar, porque esse é o golpe mais comum depois de um golpe. Fale direto com o Dione no WhatsApp para entender o seu caso.',
      z: 'Olá Dione! Vim pelo site e preciso de ajuda urgente com um problema na minha carteira.' },

    { k: ['wefi','deobank','deo bank','cartao cripto','cartao de cripto','cartao visa','banco onchain','cartao para gastar'],
      r: 'O Cartão WeFi é um cartão Visa ligado a um Deobank, um banco que funciona na blockchain. Você gasta direto do saldo, com zero taxa de câmbio nas moedas suportadas, e os ativos ficam em carteiras individuais protegidas por MPC. Tem virtual, plástico e metal.',
      l: [['Conhecer o Cartão WeFi', CARTAO]] },

    { k: ['combo','os tres','os 3','todos os ebooks','pacote','completo','completa','tudo junto'],
      r: 'O Combo Soberania Completa traz os 3 ebooks: Soberania Blindada, Vol 1 e Vol 2, por R$ 89,99 em pagamento único. Separados sairiam R$ 126,97. É a melhor escolha para ir do zero até a proteção avançada.',
      l: [['Quero o combo', LOJA + '#produtos']] },

    { k: ['blindada','celular velho','carteira fria','cold wallet','cofre','hardware wallet','ledger','trezor','offline'],
      r: 'O Soberania Blindada ensina a transformar um celular velho em uma carteira fria, o cofre mais seguro para guardar sua cripto, passo a passo e sem precisar ser técnico. Sai por R$ 27.',
      l: [VER_LOJA] },

    { k: ['vol 2','vol2','volume 2','volume dois','avancad','invisib','rastreio','confisco'],
      r: 'O Soberania Avançada (Vol 2) é o nível avançado: estratégias para blindar e fazer o patrimônio crescer no longo prazo, com proteção contra rastreio e confisco. Sai por R$ 59,99. Para quem está começando, o ideal é ir antes no Vol 1 ou pegar o combo.',
      l: [VER_LOJA] },

    { k: ['vol 1','vol1','volume 1','volume um','iniciante','comecar','começar','do zero','primeiro investimento','nunca investi','sou novo','leigo'],
      r: 'Para quem está começando, o caminho é o Soberania Digital (Vol 1): a base completa para investir em cripto com segurança, do zero ao primeiro investimento. Sai por R$ 39,99. Se quiser testar antes, tem o guia grátis "Bitcoin para Iniciantes".',
      l: [VER_LOJA, ['Baixar o guia grátis', GUIA]] },

    { k: ['gratis','grátis','de graca','free','guia','sem pagar','sem gastar'],
      r: 'Tem sim! O guia grátis "Bitcoin para Iniciantes" leva você do zero ao seu primeiro real em cripto. É só baixar na loja.',
      l: [['Baixar o guia grátis', GUIA]] },

    { k: ['cotacao','cotação','preco do bitcoin','preço do bitcoin','quanto ta o','quanto esta o'],
      r: 'A cotação ao vivo do Bitcoin, Ethereum, Solana e outras aparece na faixa no rodapé da página inicial do site.' },

    { k: ['consultoria','1 hora','1h','uma hora','call','videochamada','ligacao','sessao individual'],
      r: 'A Consultoria Bitcoin 1h é uma conversa individual com o Dione para montar a sua estratégia de segurança e soberania. Está saindo por R$ 97 (o valor normal é R$ 1.199).',
      l: [['Reservar a consultoria', CONSULTA]] },

    { k: ['heranca','herança','familia','família','falecer','morrer','sucessao','herdeiro'],
      r: 'Esse é um dos temas da Mentoria Private: o Dione desenha com você um protocolo para que sua família consiga acessar o patrimônio se for preciso, sem que ninguém tenha acesso enquanto você estiver no comando.',
      l: [['Ver a mentoria', MENTORIA]] },

    { k: ['mentoria','private','acompanhamento','sessoes','aulas particulares','individual'],
      r: 'A Mentoria Private Strategy é o acompanhamento individual com o Dione:\n• 1 sessão: R$ 1.199\n• 4 sessões: R$ 3.999\n• 8 sessões: R$ 7.199 (a mais procurada)\n• 12 sessões: R$ 9.999\nSe quiser começar menor, tem a Consultoria Bitcoin 1h por R$ 97.',
      l: [['Ver a mentoria', MENTORIA]] },

    { k: ['receb','entrega','acesso','download','baixar o ebook','email','e-mail','nao chegou','não chegou'],
      r: 'Assim que o pagamento é aprovado, o link de download chega automaticamente no seu e-mail. Se não chegou, confira o spam. Ainda não achou? O Dione resolve no WhatsApp.',
      z: 'Olá Dione! Comprei um ebook e ainda não recebi o acesso.' },

    { k: ['reembolso','devolu','garantia','cancelar','estorno'],
      r: 'Sobre reembolso e garantia, o próprio Dione te responde certinho no WhatsApp:',
      z: 'Olá Dione! Tenho uma dúvida sobre reembolso de uma compra.' },

    { k: ['ebook','e-book','livro','material','produto','loja','comprar','quero comprar'],
      r: 'São 3 ebooks, do zero à proteção avançada:\n• Soberania Blindada (carteira fria): R$ 27\n• Soberania Digital Vol 1 (a base): R$ 39,99\n• Soberania Avançada Vol 2: R$ 59,99\n• Combo com os 3: R$ 89,99\nE tem o guia grátis para começar.',
      l: [VER_LOJA],
      chips: ['Qual devo começar?', 'O que vem no combo?'] },

    { k: ['preco','preço','valor','quanto','custa','barato'],
      r: 'Os valores:\n• Soberania Blindada: R$ 27\n• Vol 1: R$ 39,99\n• Vol 2: R$ 59,99\n• Combo com os 3: R$ 89,99\n• Consultoria Bitcoin 1h: R$ 97\n• Mentoria: a partir de R$ 1.199',
      l: [VER_LOJA] },

    { k: ['pagamento','pagar','pix','boleto','cartao de credito','parcel','mercado pago'],
      r: 'O pagamento é pelo Mercado Pago, com Pix (aprovação na hora), cartão de crédito ou boleto.',
      l: [VER_LOJA] },

    { k: ['seed','frase','12 palavras','24 palavras','palavras de recuperacao','chave privada','private key'],
      r: 'A seed (as 12 ou 24 palavras) é a chave mestra da sua carteira: quem tem essas palavras tem o seu dinheiro. Regras de ouro: anote no papel, guarde em lugar seguro, nunca fotografe, nunca digite em site e nunca passe para ninguém, nem para o Dione. O Soberania Blindada ensina a guardar do jeito certo.',
      l: [VER_LOJA] },

    { k: ['corretora','exchange','binance','bybit','coinbase','ftx','quebrar','quebra','bloquear'],
      r: '"Não é sua chave, não é sua moeda." Na corretora você tem uma promessa, não a moeda: ela pode quebrar, bloquear sua conta ou ser hackeada. A corretora serve para comprar; para guardar, o ideal é a sua própria carteira. O Vol 1 mostra como tirar suas moedas de lá com segurança.',
      l: [VER_LOJA] },

    { k: ['kyc','sem kyc','anonim','cpf','declarar','imposto','receita'],
      r: 'KYC é a verificação de identidade que as corretoras pedem. Para dúvidas sobre o seu caso específico, como impostos e declaração, o ideal é falar com o Dione ou com um contador.',
      z: 'Olá Dione! Tenho uma dúvida sobre KYC e declaração de cripto.' },

    { k: ['carteira','wallet','metamask','trust','exodus','phantom'],
      r: 'Carteira é onde você guarda sua cripto com a sua própria chave. MetaMask, Trust, Exodus e Phantom são carteiras quentes (no celular ou computador, conectadas à internet), boas para o dia a dia. Para guardar valores maiores, o ideal é a carteira fria, e o Soberania Blindada ensina a montar a sua com um celular velho.',
      l: [VER_LOJA] },

    { k: ['autocustodia','autocustódia','soberania','self custody','custodia','custódia'],
      r: 'Autocustódia é guardar a sua cripto na sua própria carteira, com a sua chave, sem depender de corretora ou banco. Soberania é ter esse controle de verdade. É exatamente isso que o Dione ensina, do básico ao avançado.',
      l: [VER_LOJA],
      chips: ['Qual devo começar?', 'O que é seed?'] },

    { k: ['vai subir','vai cair','comprar agora','qual moeda','qual cripto','investir em','previsao','previsão','sinal','dica de','vale a pena','altcoin','memecoin'],
      r: 'Aqui eu não dou recomendação de compra nem previsão de preço. O foco do Dione é te ensinar a proteger e cuidar do seu próprio patrimônio. Para uma estratégia pensada para você, o caminho é a consultoria ou a mentoria.',
      l: [['Consultoria 1h por R$ 97', CONSULTA]] },

    { k: ['bitcoin','btc','o que e cripto','criptomoeda','blockchain'],
      r: 'Bitcoin é dinheiro digital que ninguém controla: nem banco, nem governo. Para entender do zero, comece pelo guia grátis "Bitcoin para Iniciantes".',
      l: [['Baixar o guia grátis', GUIA]] },

    { k: ['seguro','confiavel','confiável','confiar','piramide','pirâmide','e golpe','é golpe'],
      r: 'O Dione nunca pede sua seed, senha ou chave privada, e ninguém sério pede. Aqui não tem promessa de ficar rico rápido: o objetivo é você ter autonomia para cuidar do seu próprio patrimônio. E a dica de sempre: teste com valores pequenos antes de mover quantias maiores.' },

    { k: ['whatsapp','falar com o dione','falar com ele','atendente','humano','pessoa','contato','telefone'],
      r: 'Claro! É só chamar o Dione no WhatsApp:',
      z: 'Olá Dione! Vim pelo site dionefolador.com e quero falar com você.' },

    { k: ['quem e','quem é','dione','experiencia','experiência','sobre voce'],
      r: 'Dione Folador é investidor e estrategista com mais de 13 anos no mercado cripto, com destaque na mídia especializada desde 2017. Ele traduz o "tecniquês" para português claro, para você cuidar do seu dinheiro sem depender de banco ou corretora.',
      l: [VER_LOJA] },

    { k: ['obrigad','valeu','show','top','otimo','ótimo'],
      r: 'Por nada! Se surgir outra dúvida, é só escrever aqui.' },

    { k: ['oi','ola','olá','bom dia','boa tarde','boa noite','tudo bem','e ai'],
      r: 'Oi! Que bom ter você aqui. Sobre o que você quer saber?',
      chips: CHIPS_PADRAO() }
  ];

  function CHIPS_PADRAO() { return ['Qual ebook é pra mim?', 'Preços', 'Mentoria', 'O que é autocustódia?']; }
  var CHIPS = CHIPS_PADRAO().concat(['Cartão WeFi']);
  var ATALHOS = {
    'Qual ebook é pra mim?': 'qual ebook devo comecar do zero',
    'Qual devo começar?': 'comecar do zero',
    'O que vem no combo?': 'combo',
    'O que é seed?': 'seed',
    'Preços': 'precos',
    'Mentoria': 'mentoria',
    'O que é autocustódia?': 'autocustodia',
    'Cartão WeFi': 'wefi'
  };

  function limpa(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function resposta(texto) {
    var t = ' ' + limpa(texto) + ' ';
    for (var i = 0; i < BASE_CONH.length; i++) {
      var it = BASE_CONH[i];
      for (var j = 0; j < it.k.length; j++) {
        var k = limpa(it.k[j]);
        // palavras curtas precisam bater inteiras ("oi" nao pode casar com "boi")
        if (k.length <= 3 ? new RegExp('[^a-z0-9]' + k + '[^a-z0-9]').test(t) : t.indexOf(k) > -1) return it;
      }
    }
    return { r: 'Essa eu prefiro que o próprio Dione responda, para você ter a informação certa. Chama ele no WhatsApp:',
             z: 'Olá Dione! Vim pelo site dionefolador.com e tenho uma dúvida: ' + texto };
  }

  function chips(lista) {
    var c = document.createElement('div');
    c.className = 'df-ch';
    lista.forEach(function (n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = n;
      b.addEventListener('click', function () { c.remove(); perguntar(n, ATALHOS[n] || n); });
      c.appendChild(b);
    });
    corpo.appendChild(c);
    corpo.scrollTop = corpo.scrollHeight;
  }

  function perguntar(mostrado, busca) {
    if (!mostrado || ocupado) return;
    ocupado = true;
    enviar.disabled = true;
    corpo.querySelectorAll('.df-ch').forEach(function (el) { el.remove(); });
    msg('eu', mostrado);
    var pensando = document.createElement('div');
    pensando.className = 'df-pt';
    pensando.innerHTML = '<i></i><i></i><i></i>';
    corpo.appendChild(pensando);
    corpo.scrollTop = corpo.scrollHeight;
    var r = resposta(busca || mostrado);
    setTimeout(function () {
      pensando.remove();
      var bloco = msg('ele', r.r);
      if (r.l || r.z) {
        var acoes = document.createElement('div');
        acoes.className = 'df-acoes';
        (r.l || []).forEach(function (b) { acoes.appendChild(botao('df-ir', b[1], b[0])); });
        if (r.z) acoes.appendChild(botao('df-zap', 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(r.z), icoZap + 'Falar no WhatsApp'));
        bloco.appendChild(acoes);
      }
      if (r.chips) chips(r.chips);
      ocupado = false;
      enviar.disabled = false;
      corpo.scrollTop = corpo.scrollHeight;
    }, 650);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = campo.value.trim();
    if (!t) return;
    campo.value = '';
    perguntar(t);
  });
})();
