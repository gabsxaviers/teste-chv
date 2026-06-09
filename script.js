/* ============================================================
   CHV Geossintéticos — interações e conteúdo
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  // ativa animações de entrada só quando o JS está rodando (conteúdo visível por padrão)
  document.documentElement.classList.add('js-anim');
  const ICON = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- Header scroll state ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile drawer ---------- */
  const drawer = $('#drawer'), menuBtn = $('#menuBtn');
  const openDrawer = () => { drawer.classList.add('open'); menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
  const closeDrawer = () => { drawer.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
  menuBtn.addEventListener('click', openDrawer);
  $$('[data-close]', drawer).forEach(el => el.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* ---------- Clientes (marquee) ---------- */
  const clients = ['Vale Verde', 'MineraSul', 'Aterro Central', 'AquaSan', 'AgroPampa', 'EcoBarragens', 'Construtora RGM', 'Hidromax', 'PETRO Norte', 'Sanea Brasil'];
  const clientHTML = clients.map(n => {
    const initials = n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `<span class="client-logo"><span class="mk">${initials}</span>${n}</span>`;
  }).join('');
  $('#clientsRow').innerHTML = clientHTML;
  $('#clientsRow2').innerHTML = clientHTML;

  /* ---------- Produtos ---------- */
  const produtos = [
    { tag: 'PEAD / PEBDL', nome: 'Geomembranas', desc: 'Barreira impermeável em polietileno de alta e baixa densidade, de 0,5 a 3,0 mm.' },
    { tag: 'Confinamento', nome: 'Geocélulas', desc: 'Estrutura em colmeia para contenção, estabilização de taludes e controle de erosão.' },
    { tag: 'Drenagem', nome: 'Geocomposto drenante', desc: 'Núcleo drenante com geotêxtil para captação e condução de fluidos.' },
    { tag: 'Separação / filtro', nome: 'Geotêxtil não tecido', desc: 'Filtragem, separação e proteção mecânica da geomembrana.' },
    { tag: 'Tubulação', nome: 'Tubos PEAD corrugados', desc: 'Alta resistência e flexibilidade para drenagem e condução de efluentes.' },
    { tag: 'Drenagem', nome: 'Tubos de drenagem', desc: 'Perfurados e revestidos para sistemas de drenagem subterrânea.' },
    { tag: 'Condução', nome: 'Tubos lisos PEAD', desc: 'Para adução, recalque e transporte de água e fluidos sob pressão.' },
    { tag: 'Acessórios', nome: 'Perfis PEAD', desc: 'Perfis e acessórios de ancoragem, vedação e arremate do sistema.' }
  ];
  $('#prodGrid').innerHTML = produtos.map((p, i) => `
    <article class="prod reveal" data-d="${(i % 4) + 1}">
      <div class="prod__img ph" data-label="Foto — ${p.nome}"></div>
      <div class="prod__body">
        <span class="prod__tag">${p.tag}</span>
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <div class="prod__foot">
          <a href="#contato" class="link-arrow">Solicitar ${ICON.arrow}</a>
        </div>
      </div>
    </article>`).join('');

  /* ---------- Setores (tabs) ---------- */
  const ico = {
    agro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8M12 8c0-3 2-5 5-5 0 3-2 5-5 5ZM12 12c0-3-2-5-5-5 0 3 2 5 5 5Z"/></svg>',
    min: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m14 3 7 7-4 4-7-7zM10 7 3 14l3 3 7-7M5 21l3-3"/></svg>',
    aterro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18 9 8l4 5 3-4 5 9z"/></svg>',
    infra: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg>',
    san: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11Z"/></svg>',
    ind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l6 4V9l6 4V5l6 3v13z"/></svg>'
  };
  const setores = [
    { id: 'mineracao', icon: ico.min, label: 'Mineração', titulo: 'Contenção segura para a mineração', desc: 'Sistemas de impermeabilização para o ciclo completo da operação mineral, com foco em segurança e conformidade ambiental.', apps: ['Barragens de rejeitos e estéril', 'Lixiviação em pilhas (heap leaching)', 'Fechamento de minas e aterros', 'Bacias de contenção', 'Cobertura flutuante', 'Canalizações'] },
    { id: 'saneamento', icon: ico.san, label: 'Saneamento', titulo: 'Proteção dos recursos hídricos', desc: 'Soluções para tratamento de efluentes e proteção do solo e da água em sistemas de saneamento.', apps: ['Lagoas de oxidação', 'Aterros sanitários', 'Reservatórios de água', 'Estações de tratamento', 'Túneis', 'Canalizações'] },
    { id: 'agro', icon: ico.agro, label: 'Agronegócio', titulo: 'Eficiência hídrica no campo', desc: 'Armazenamento e condução de água com segurança e durabilidade para a produção rural.', apps: ['Reservatórios de água', 'Canal de irrigação por gravidade', 'Reservatórios para peixes', 'Biodigestores', 'Lagoas ornamentais e piscinas', 'Cobertura flutuante'] },
    { id: 'aterros', icon: ico.aterro, label: 'Aterros', titulo: 'Aterros sanitários e industriais', desc: 'Impermeabilização de base e cobertura para a contenção segura de resíduos.', apps: ['Aterros sanitários e industriais', 'Lagoas de oxidação', 'Sistema de drenagem de chorume', 'Cobertura final', 'Análise geoelétrica', 'Fechamento de células'] },
    { id: 'infra', icon: ico.infra, label: 'Infraestrutura', titulo: 'Obras de infraestrutura', desc: 'Reforço, drenagem e impermeabilização para obras civis e de grande porte.', apps: ['Túneis', 'Canalizações', 'Estabilização de taludes', 'Drenagem de rodovias', 'Reservatórios', 'Reforço de solos'] },
    { id: 'industria', icon: ico.ind, label: 'Indústria', titulo: 'Contenção para a indústria', desc: 'Bacias e sistemas de contenção que garantem a segurança operacional e ambiental.', apps: ['Bacias de contenção', 'Lagoas industriais', 'Reservatórios de processo', 'Soldas de tubulação PEAD', 'Pisos impermeáveis', 'Análise geoelétrica'] }
  ];
  const tabsEl = $('#tabs'), panelsEl = $('#tabpanels');
  tabsEl.innerHTML = setores.map((s, i) => `<button class="tab" role="tab" id="tab-${s.id}" aria-controls="panel-${s.id}" aria-selected="${i === 0}">${s.icon}${s.label}</button>`).join('');
  panelsEl.innerHTML = setores.map((s, i) => `
    <div class="tabpanel ${i === 0 ? 'active' : ''}" id="panel-${s.id}" role="tabpanel" aria-labelledby="tab-${s.id}">
      <div class="ph" data-label="Foto — ${s.label}"></div>
      <div>
        <h3 class="text-balance">${s.titulo}</h3>
        <p class="desc text-pretty">${s.desc}</p>
        <ul class="apps">${s.apps.map(a => `<li>${ICON.check}<span>${a}</span></li>`).join('')}</ul>
        <a href="#contato" class="btn btn--primary" style="margin-top:28px">Solicitar orçamento para ${s.label}</a>
      </div>
    </div>`).join('');
  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.tab'); if (!btn) return;
    $$('.tab', tabsEl).forEach(t => t.setAttribute('aria-selected', t === btn));
    const id = btn.id.replace('tab-', 'panel-');
    $$('.tabpanel', panelsEl).forEach(p => p.classList.toggle('active', p.id === id));
  });

  /* ---------- Projetos ---------- */
  const projetos = [
    { cat: 'Mineração', t: 'Barragem de rejeitos — 120.000 m²', cls: 'wide' },
    { cat: 'Saneamento', t: 'Lagoa de oxidação municipal', cls: 'tall' },
    { cat: 'Agronegócio', t: 'Reservatório de irrigação', cls: '' },
    { cat: 'Indústria', t: 'Bacia de contenção industrial', cls: '' },
    { cat: 'Aterros', t: 'Aterro sanitário regional', cls: 'wide' },
    { cat: 'Infraestrutura', t: 'Impermeabilização de túnel', cls: '' },
    { cat: 'Mineração', t: 'Pilha de lixiviação', cls: '' }
  ];
  $('#projGrid').innerHTML = projetos.map((p, i) => `
    <article class="proj reveal ${p.cls}" data-d="${(i % 3) + 1}">
      <div class="ph" data-label="Foto — ${p.t}"></div>
      <div class="proj__meta"><div class="cat">${p.cat}</div><div class="t">${p.t}</div></div>
    </article>`).join('');

  /* ---------- Blog ---------- */
  const posts = [
    { cat: 'Técnico', date: '12 mai 2026', read: '6 min', t: 'Como escolher a espessura ideal da geomembrana PEAD' },
    { cat: 'Normas', date: '28 abr 2026', read: '8 min', t: 'Ensaios de solda: o que exige a NBR e por que importam' },
    { cat: 'Cases', date: '03 abr 2026', read: '5 min', t: 'Análise geoelétrica: detectando vazamentos antes do aterro' }
  ];
  $('#blogGrid').innerHTML = posts.map((p, i) => `
    <article class="post reveal" data-d="${i + 1}">
      <div class="post__img ph" data-label="Imagem do artigo"></div>
      <div class="post__body">
        <div class="post__meta"><span class="cat">${p.cat}</span><span>·</span><span>${p.date}</span><span>·</span><span>${p.read} de leitura</span></div>
        <h3 class="text-balance">${p.t}</h3>
        <a href="#" class="link-arrow post__more">Ler artigo ${ICON.arrow}</a>
      </div>
    </article>`).join('');

  /* ---------- Reveal on scroll (scroll-based, robusto) ---------- */
  const reveals = $$('.reveal');
  let revealTicking = false, firstRevealRun = true;
  const checkReveals = () => {
    revealTicking = false;
    const vh = window.innerHeight;
    for (let i = reveals.length - 1; i >= 0; i--) {
      const el = reveals[i];
      const r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 0) {
        if (firstRevealRun) el.classList.add('instant'); // 1ª dobra aparece sem fade
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
    firstRevealRun = false;
  };
  const requestReveal = () => { if (!revealTicking) { revealTicking = true; requestAnimationFrame(checkReveals); } };
  window.addEventListener('scroll', requestReveal, { passive: true });
  window.addEventListener('resize', requestReveal, { passive: true });
  checkReveals();
  // segurança: garante visibilidade mesmo sem scroll
  setTimeout(checkReveals, 250);
  window.addEventListener('load', checkReveals);

  /* ---------- Newsletter ---------- */
  const newsForm = $('#newsForm');
  newsForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = newsForm.email;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) { input.focus(); input.style.borderColor = '#fff'; return; }
    newsForm.style.display = 'none';
    const note = $('#newsNote');
    note.innerHTML = '✓ Inscrição confirmada! Obrigado por se cadastrar.';
    note.style.color = '#fff'; note.style.fontWeight = '600';
  });

  /* ---------- Form de orçamento ---------- */
  const form = $('#quoteForm');
  const validators = {
    nome: v => v.trim().length >= 2,
    email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim()),
    telefone: v => v.replace(/\D/g, '').length >= 10,
    mensagem: v => v.trim().length >= 8
  };
  // máscara simples de telefone
  const tel = form.telefone;
  tel.addEventListener('input', () => {
    let d = tel.value.replace(/\D/g, '').slice(0, 11);
    if (d.length > 6) tel.value = `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
    else if (d.length > 2) tel.value = `(${d.slice(0,2)}) ${d.slice(2)}`;
    else if (d.length > 0) tel.value = `(${d}`;
  });
  const validateField = (name) => {
    const input = form[name]; if (!input || !validators[name]) return true;
    const ok = validators[name](input.value);
    input.closest('.field').classList.toggle('invalid', !ok);
    return ok;
  };
  Object.keys(validators).forEach(name => {
    form[name].addEventListener('blur', () => validateField(name));
    form[name].addEventListener('input', () => { if (form[name].closest('.field').classList.contains('invalid')) validateField(name); });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    Object.keys(validators).forEach(name => { if (!validateField(name)) valid = false; });
    if (!valid) { const first = $('.field.invalid input, .field.invalid textarea', form); if (first) first.focus(); return; }
    form.style.display = 'none';
    $('#formOk').style.display = 'block';
  });

  /* ---------- Active nav link (scroll-based) ---------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav a');
  const updateActive = () => {
    const mid = window.innerHeight * 0.4;
    let current = null;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) { current = s.id; break; }
    }
    navLinks.forEach(a => a.style.color = (current && a.getAttribute('href') === '#' + current) ? 'var(--green)' : '');
  };
  window.addEventListener('scroll', () => requestAnimationFrame(updateActive), { passive: true });
  updateActive();
})();
