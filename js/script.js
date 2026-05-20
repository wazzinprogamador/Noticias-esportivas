/* ============================================================
   Copa News Brasil 2026 — script.js
   Autor: Copa News Brasil
   Versão: 1.0
   Descrição: Interatividade e animações do portal
   ============================================================ */

'use strict';

/* ============================================================
   1. DADOS — TABELA DE CLASSIFICAÇÃO
============================================================ */
const standingsData = {
  D: [
    { pos: 1, flag: '🇧🇷', name: 'Brasil',    j:2, v:2, e:0, d:0, gp:5, gc:0, sg:+5, pts:6, qual: true },
    { pos: 2, flag: '🇦🇷', name: 'Argentina', j:2, v:1, e:0, d:1, gp:3, gc:2, sg:+1, pts:3, qual: false },
    { pos: 3, flag: '🇫🇷', name: 'França',    j:2, v:0, e:1, d:1, gp:2, gc:3, sg:-1, pts:1, qual: false },
    { pos: 4, flag: '🇲🇦', name: 'Marrocos',  j:2, v:0, e:1, d:1, gp:1, gc:4, sg:-3, pts:1, qual: false },
  ],
  A: [
    { pos: 1, flag: '🇪🇸', name: 'Espanha',   j:2, v:2, e:0, d:0, gp:6, gc:1, sg:+5, pts:6, qual: true },
    { pos: 2, flag: '🇩🇪', name: 'Alemanha',  j:2, v:1, e:1, d:0, gp:4, gc:2, sg:+2, pts:4, qual: false },
    { pos: 3, flag: '🇯🇵', name: 'Japão',     j:2, v:0, e:1, d:1, gp:2, gc:3, sg:-1, pts:1, qual: false },
    { pos: 4, flag: '🇺🇸', name: 'EUA',       j:2, v:0, e:0, d:2, gp:1, gc:5, sg:-4, pts:0, qual: false },
  ],
  B: [
    { pos: 1, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'Inglaterra', j:2, v:2, e:0, d:0, gp:4, gc:0, sg:+4, pts:6, qual: true },
    { pos: 2, flag: '🇵🇹', name: 'Portugal',   j:2, v:1, e:1, d:0, gp:3, gc:1, sg:+2, pts:4, qual: false },
    { pos: 3, flag: '🇳🇱', name: 'Holanda',    j:2, v:1, e:0, d:1, gp:2, gc:2, sg:0,  pts:3, qual: false },
    { pos: 4, flag: '🇲🇽', name: 'México',     j:2, v:0, e:0, d:2, gp:0, gc:4, sg:-4, pts:0, qual: false },
  ],
  C: [
    { pos: 1, flag: '🇮🇹', name: 'Itália',    j:2, v:1, e:1, d:0, gp:3, gc:2, sg:+1, pts:4, qual: true },
    { pos: 2, flag: '🇺🇾', name: 'Uruguai',   j:2, v:1, e:0, d:1, gp:3, gc:3, sg:0,  pts:3, qual: false },
    { pos: 3, flag: '🇨🇴', name: 'Colômbia',  j:2, v:0, e:2, d:0, gp:2, gc:2, sg:0,  pts:2, qual: false },
    { pos: 4, flag: '🇨🇦', name: 'Canadá',    j:2, v:0, e:0, d:2, gp:1, gc:4, sg:-3, pts:0, qual: false },
  ],
};

/* ============================================================
   2. NAVBAR — STICKY + SCROLL
============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ============================================================
   3. MENU MOBILE
============================================================ */
(function initMobileMenu() {
  const hamburger      = document.getElementById('hamburger');
  const mobileNav      = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const overlay        = document.getElementById('mobileNavOverlay');
  const mobileLinks    = document.querySelectorAll('.mobile-nav a');

  if (!hamburger || !mobileNav) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileNavClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ============================================================
   4. SEARCH BOX TOGGLE
============================================================ */
(function initSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchBox    = document.getElementById('searchBox');
  const searchInput  = document.getElementById('searchInput');

  if (!searchToggle) return;

  searchToggle.addEventListener('click', () => {
    searchBox.classList.toggle('open');
    if (searchBox.classList.contains('open')) {
      setTimeout(() => searchInput.focus(), 300);
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target)) {
      searchBox.classList.remove('open');
    }
  });

  // Pesquisa ao pressionar Enter
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      console.log('Busca por:', searchInput.value.trim());
      // Aqui integraria com backend real
      searchInput.value = '';
      searchBox.classList.remove('open');
    }
  });
})();

/* ============================================================
   5. PARALLAX LEVE NA HERO SECTION
============================================================ */
(function initParallax() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  // Não aplica parallax em dispositivos móveis para performance
  if (window.innerWidth < 768) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const factor  = 0.35;
        heroBg.style.transform = `translateY(${scrollY * factor}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   6. ANIMAÇÕES AO APARECER (Intersection Observer)
============================================================ */
(function initRevealAnimations() {
  // Elementos hero: ativam imediatamente
  const heroElements = document.querySelectorAll('.hero .reveal-up');
  // Delay escalonado para entrada da hero
  setTimeout(() => {
    heroElements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }, 200);

  // Elementos com scroll reveal
  const revealCards = document.querySelectorAll('.reveal-card');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Atraso escalonado para cards em grupo
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal-card:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 320);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealCards.forEach(card => observer.observe(card));
})();

/* ============================================================
   7. BOTÃO VOLTAR AO TOPO
============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   8. SCROLL SUAVE PARA ÂNCORAS
============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarH   = document.getElementById('navbar')?.offsetHeight || 96;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarH - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   9. NAVBAR ACTIVE LINK AO SCROLLAR
============================================================ */
(function initActiveNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const navbarH   = 96;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: `-${navbarH}px 0px -60% 0px` });

  sections.forEach(section => observer.observe(section));
})();

/* ============================================================
   10. TABELA DE CLASSIFICAÇÃO — DINÂMICA
============================================================ */
(function initStandings() {
  const tabs         = document.querySelectorAll('.group-tab');
  const tableBody    = document.getElementById('standingsBody');

  if (!tableBody) return;

  function renderStandings(groupKey) {
    const rows = standingsData[groupKey] || [];
    tableBody.innerHTML = '';

    rows.forEach((team, index) => {
      const tr = document.createElement('tr');
      if (team.qual) tr.classList.add('highlight-row');

      // Atraso de animação por linha
      tr.style.opacity = '0';
      tr.style.transform = 'translateX(-10px)';
      tr.style.transition = `opacity 0.3s ease ${index * 60}ms, transform 0.3s ease ${index * 60}ms`;

      const sgFormatted = team.sg > 0 ? `+${team.sg}` : `${team.sg}`;
      const posClass    = team.qual ? 'pos-q' : 'pos-n';

      tr.innerHTML = `
        <td><span class="table-pos ${posClass}">${team.pos}</span></td>
        <td>
          <div class="team-cell">
            <span class="team-cell-flag">${team.flag}</span>
            <span class="team-cell-name">${team.name}</span>
          </div>
        </td>
        <td>${team.j}</td>
        <td>${team.v}</td>
        <td>${team.e}</td>
        <td>${team.d}</td>
        <td>${team.gp}</td>
        <td>${team.gc}</td>
        <td>${sgFormatted}</td>
        <td>${team.pts}</td>
      `;
      tableBody.appendChild(tr);

      // Trigger reflow para animação
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          tr.style.opacity = '1';
          tr.style.transform = 'translateX(0)';
        });
      });
    });
  }

  // Inicializa com grupo D
  renderStandings('D');

  // Event listeners das abas
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const group = tab.getAttribute('data-group');
      renderStandings(group);
    });
  });
})();

/* ============================================================
   11. TABS DE ESTÁGIO (jogos)
============================================================ */
(function initStageTabs() {
  const tabs = document.querySelectorAll('.stage-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Em um site real, aqui filtraria as partidas por fase
    });
  });
})();

/* ============================================================
   12. TICKER AUTOMÁTICO — DUPLICAÇÃO PARA LOOP CONTÍNUO
============================================================ */
(function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  // Duplica os itens para criar loop contínuo
  const items   = track.innerHTML;
  track.innerHTML = items + items;
})();

/* ============================================================
   13. ANIMAÇÃO DA BARRA DOS ARTILHEIROS (ao entrar na tela)
============================================================ */
(function initScorerBars() {
  const fills = document.querySelectorAll('.scorer-fill');
  if (!fills.length) return;

  // Guarda os valores originais e reseta para 0
  fills.forEach(fill => {
    const originalWidth = fill.style.width;
    fill.dataset.width  = originalWidth;
    fill.style.width    = '0%';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.scorer-fill').forEach(fill => {
          setTimeout(() => {
            fill.style.width = fill.dataset.width;
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const section = document.getElementById('artilheiros');
  if (section) observer.observe(section);
})();

/* ============================================================
   14. CONTADOR DO PLACAR (efeito de flip nos gols)
============================================================ */
(function initScoreCounter() {
  const scores = document.querySelectorAll('.match-card--live .score');
  if (!scores.length) return;

  // Adiciona um pulso visual nos gols da partida ao vivo ao carregar
  setTimeout(() => {
    scores.forEach(score => {
      score.style.transform = 'scale(1.15)';
      score.style.color     = 'var(--clr-green)';
      score.style.transition = 'transform 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        score.style.transform = 'scale(1)';
      }, 400);
    });
  }, 1500);
})();

/* ============================================================
   15. NEWSLETTER FORM
============================================================ */
(function initNewsletter() {
  const form    = document.querySelector('.newsletter-form');
  if (!form) return;

  const input  = form.querySelector('input[type="email"]');
  const button = form.querySelector('button');

  button.addEventListener('click', () => {
    const email = input.value.trim();

    if (!email || !isValidEmail(email)) {
      input.style.borderColor = 'var(--clr-red)';
      input.placeholder = 'Digite um e-mail válido';
      setTimeout(() => {
        input.style.borderColor = '';
        input.placeholder = 'seu@email.com';
      }, 2000);
      return;
    }

    // Feedback de sucesso
    button.textContent = '✓ Inscrito!';
    button.style.background = 'var(--clr-yellow)';
    input.value = '';
    input.disabled = true;
    button.disabled = true;

    setTimeout(() => {
      button.textContent = 'Inscrever';
      button.style.background = '';
      input.disabled = false;
      button.disabled = false;
    }, 3000);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();

/* ============================================================
   16. BOTÕES DE PLAY — FEEDBACK VISUAL
============================================================ */
(function initPlayButtons() {
  document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Feedback: escurece brevemente
      btn.style.transform = 'translate(-50%, -50%) scale(0.9)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
      // Em um site real, abriria player de vídeo
    });
  });
})();

/* ============================================================
   17. RELÓGIO AO VIVO — ATUALIZA O MINUTO DO JOGO
============================================================ */
(function initLiveClock() {
  const liveStatus = document.querySelector('.match-status--live');
  if (!liveStatus) return;

  let minute = 67;

  const interval = setInterval(() => {
    minute++;
    if (minute > 90) {
      liveStatus.textContent = '⏱ ENCERRADO';
      liveStatus.classList.remove('match-status--live');
      liveStatus.classList.add('match-status--finished');
      clearInterval(interval);
      return;
    }
    liveStatus.innerHTML = `<span class="live-dot"></span> AO VIVO — ${minute}'`;
  }, 60000); // Atualiza a cada 60 segundos
})();

/* ============================================================
   18. INTERAÇÃO COM BOTÕES DE LEMBRETE
============================================================ */
(function initReminderButtons() {
  document.querySelectorAll('.btn-watch').forEach(btn => {
    if (btn.textContent.trim() === 'Lembrete') {
      btn.addEventListener('click', function() {
        if (this.textContent.includes('✓')) {
          this.textContent = 'Lembrete';
          this.style.background = '';
        } else {
          this.textContent = '✓ Ativado';
          this.style.background = 'var(--clr-yellow)';
          this.style.color = 'var(--clr-black)';
        }
      });
    }
  });
})();

/* ============================================================
   19. RESIZE HANDLER — AJUSTES RESPONSIVOS
============================================================ */
(function initResizeHandler() {
  let resizeTimer;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-inicializa parallax se viewport mudar
      const heroBg = document.getElementById('heroBg');
      if (window.innerWidth < 768 && heroBg) {
        heroBg.style.transform = '';
      }
    }, 250);
  });
})();

/* ============================================================
   20. INICIALIZAÇÃO GERAL (quando DOM está pronto)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏆 Copa News Brasil 2026 — Carregado com sucesso!');

  // Marca o link de navegação ativo baseado no hash da URL
  const hash = window.location.hash;
  if (hash) {
    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
    if (activeLink) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      activeLink.classList.add('active');
    }
  }
});