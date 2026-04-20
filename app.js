/* ====== HELPERS ====== */
const getProductImage = (p) => p.image || p.images?.[0] || "";

/* ====== PRODUCTS LOAD ====== */
const loadProducts = async () => {
  try {
    const res = await fetch('./data/products.json'); // مهم فـ GitHub
    products = await res.json();
  } catch (e) {
    console.error("Products load error:", e);
    products = window.PRODUCTS_FALLBACK || [];
  }
  return products;
};

/* ====== CART ====== */
const addToCart = (product) => {
  const existing = cart.find(i => i.id === product.id);

  const img = getProductImage(product);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name[lang],
      price: product.price,
      image: img,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(t('toast.added') + ': ' + product.name[lang]);
};

/* ====== RENDER CART ====== */
const renderCartModal = () => {
  const body = document.getElementById('cart-body');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍</div>
        <p>${t('cart.empty')}</p>
      </div>
    `;
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img 
        src="${item.image || ''}" 
        alt="${item.name}" 
        class="cart-item-img"
        onerror="this.style.background='#F5E6DF';this.src=''"
      >

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
        <button onclick="BondApp.removeFromCart('${item.id}')">✕</button>
      </div>
    </div>
  `).join('');
};
