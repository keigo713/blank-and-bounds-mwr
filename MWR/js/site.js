(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', isOpen);
      icon.classList.toggle('fa-xmark', !isOpen);
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'メニューを開く');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });

  // 画像とセクションのふわっと表示（高級感のある演出）
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // 子要素のテキストrevealアニメーションがあれば実行を助ける（CSSだけでも良いが確実にするため）
        const reveals = entry.target.querySelectorAll('.reveal-text');
        reveals.forEach((el, index) => {
          el.style.animationDelay = `${0.2 * index}s`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('main figure, .img-container, section, .grid article, .group').forEach(el => {
    observer.observe(el);
  });

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
})();
