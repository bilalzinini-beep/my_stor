/* ====== BOND JEWELRY — APP STATE ====== */

const BondApp = (() => {
  /* ---------- STATE ---------- */
  let lang = localStorage.getItem('bj_lang') || 'en';
  let theme = localStorage.getItem('bj_theme') || 'light';
  let cart = JSON.parse(localStorage.getItem('bj_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('bj_wishlist') || '[]');
  let user = JSON.parse(localStorage.getItem('bj_user') || 'null');
  let products = [];

  /* ---------- PERSIST ---------- */
  const saveCart = () => localStorage.setItem('bj_cart', JSON.stringify(cart));
  const saveWishlist = () => localStorage.setItem('bj_wishlist', JSON.stringify(wishlist));
  const saveUser = () => localStorage.setItem('bj_user', JSON.stringify(user));

  /* ---------- LANGUAGE ---------- */
  const setLang = (l) => {
    lang = l;
    localStorage.setItem('bj_lang', l);
    document.documentElement.setAttribute('lang', l);
    document.documentElement.setAttribute('dir', TRANSLATIONS[l].dir);
    renderApp();
  };
  const t = (path) => {
    const parts = path.split('.');
    let obj = TRANSLATIONS[lang];
    for (const p of parts) obj = obj?.[p];
    return obj || path;
  };

  /* ---------- THEME ---------- */
  const setTheme = (th) => {
    theme = th;
    localStorage.setItem('bj_theme', th);
    document.documentElement.setAttribute('data-theme', th);
  };
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  /* ---------- CART ---------- */
  const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else cart.push({ id: product.id, name: product.name[lang], price: product.price, image: product.image, qty: 1 });
    saveCart();
    updateCartUI();
    showToast(t('toast.added') + ': ' + product.name[lang]);
  };

  const removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
    renderCartModal();
  };

  const updateQty = (id, qty) => {
    const item = cart.find(i => i.id === id);
    if (item) { if (qty < 1) removeFromCart(id); else { item.qty = qty; saveCart(); updateCartUI(); renderCartModal(); } }
  };

  const updateCartUI = () => {
    const cnt = cartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cnt;
      el.style.display = cnt > 0 ? 'flex' : 'none';
    });
  };

  /* ---------- WISHLIST ---------- */
  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(w => w !== id);
      showToast(t('toast.removed'));
    } else {
      wishlist.push(id);
      showToast(t('toast.wishlisted'));
    }
    saveWishlist();
    document.querySelectorAll(`[data-wishlist="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', wishlist.includes(id));
    });
  };

  /* ---------- AUTH ---------- */
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('bj_users') || '[]');
    const found = users.find(u => u.email === email && u.password === btoa(password));
    if (found) {
      user = { name: found.name, email: found.email };
      saveUser();
      updateAuthUI();
      closeModal('auth-modal');
      showToast(t('auth.welcome') + ', ' + found.name + '!');
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('bj_users') || '[]');
    if (users.find(u => u.email === email)) return false;
    users.push({ name, email, password: btoa(password) });
    localStorage.setItem('bj_users', JSON.stringify(users));
    user = { name, email };
    saveUser();
    updateAuthUI();
    closeModal('auth-modal');
    showToast('Welcome to Bond, ' + name + '! ✦');
    return true;
  };

  const logout = () => {
    user = null;
    saveUser();
    updateAuthUI();
    showToast('See you soon! ✦');
  };

  const updateAuthUI = () => {
    document.querySelectorAll('.user-greeting').forEach(el => {
      el.textContent = user ? user.name.split(' ')[0] : t('auth.guest');
    });
    document.querySelectorAll('.auth-btn-login').forEach(el => el.style.display = user ? 'none' : '');
    document.querySelectorAll('.auth-btn-logout').forEach(el => el.style.display = user ? '' : 'none');
  };

  /* ---------- PRODUCTS ---------- */
  const loadProducts = async () => {
    try {
      const res = await fetch('data/products.json');
      products = await res.json();
    } catch {
      products = window.PRODUCTS_FALLBACK || [];
    }
    return products;
  };

  /* ---------- TOAST ---------- */
  const showToast = (msg, duration = 3000) => {
    let toast = document.getElementById('bj-toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'bj-toast'; document.body.appendChild(toast); }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), duration);
  };

  /* ---------- MODALS ---------- */
  const openModal = (id) => document.getElementById(id)?.classList.add('open');
  const closeModal = (id) => document.getElementById(id)?.classList.remove('open');

  /* ---------- RENDER CART MODAL ---------- */
  const renderCartModal = () => {
    const body = document.getElementById('cart-body');
    if (!body) return;
    if (cart.length === 0) {
      body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛍</div><p>${t('cart.empty')}</p><button class="btn-primary" onclick="BondApp.closeModal('cart-modal'); document.getElementById('products').scrollIntoView({behavior:'smooth'})">${t('cart.continue')}</button></div>`;
      document.getElementById('cart-footer').style.display = 'none';
      return;
    }
    document.getElementById('cart-footer').style.display = '';
    const shipping = cartTotal() >= 150 ? 0 : 12;
    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.style.background='#F5E6DF';this.src=''">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
          <div class="cart-item-controls">
            <button onclick="BondApp.updateQty('${item.id}', ${item.qty - 1})">−</button>
            <span>${item.qty}</span>
            <button onclick="BondApp.updateQty('${item.id}', ${item.qty + 1})">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-total">$${(item.price * item.qty).toFixed(0)}</span>
          <button class="cart-remove" onclick="BondApp.removeFromCart('${item.id}')">✕</button>
        </div>
      </div>
    `).join('');
    document.getElementById('cart-subtotal').textContent = '$' + cartTotal().toFixed(0);
    document.getElementById('cart-shipping').textContent = shipping === 0 ? t('cart.free') : '$' + shipping;
    document.getElementById('cart-total').textContent = '$' + (cartTotal() + shipping).toFixed(0);
  };

  /* ---------- RENDER APP ---------- */
  const renderApp = () => {
    updateCartUI();
    updateAuthUI();
    renderCartModal();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
  };

  /* ---------- PUBLIC API ---------- */
  return { setLang, t, toggleTheme, setTheme, addToCart, removeFromCart, updateQty,
    toggleWishlist, login, register, logout, loadProducts, showToast, openModal, closeModal,
    renderCartModal, renderApp, getCart: () => cart, getUser: () => user,
    getWishlist: () => wishlist, getProducts: () => products, getLang: () => lang,
    cartTotal, cartCount };
})();
