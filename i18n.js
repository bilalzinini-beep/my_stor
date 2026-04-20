const TRANSLATIONS = {
  en: {
    dir: "ltr",
    nav: {
      collections: "Collections", shop: "Shop", about: "About", reviews: "Reviews",
      cart: "Cart", login: "Login", logout: "Logout", account: "My Account",
      search: "Search jewelry..."
    },
    hero: {
      badge: "New Collection 2025",
      h1a: "Adorned in", h1b: "Pure Elegance",
      sub: "Handcrafted fine jewelry that celebrates every moment of your story",
      cta1: "Explore Collection", cta2: "Our Story"
    },
    marquee: ["Free Shipping Over $150", "Handcrafted with Love", "14K Gold & Sterling Silver", "30-Day Returns", "Certified Gemstones", "Gift Wrapping Available"],
    cats: { title: "Discover Our Collections", label: "Shop by Category",
      necklaces: "Necklaces", rings: "Rings", bracelets: "Bracelets", earrings: "Earrings",
      pieces: "pieces" },
    products: { title: "Most Loved Pieces", label: "Curated Picks",
      all: "All", addCart: "Add to Cart", outStock: "Out of Stock",
      wishlist: "Wishlist", reviews: "reviews" },
    cart: {
      title: "Your Cart", empty: "Your cart is empty",
      subtotal: "Subtotal", shipping: "Shipping", free: "FREE",
      total: "Total", checkout: "Proceed to Checkout",
      continue: "Continue Shopping", remove: "Remove"
    },
    checkout: {
      title: "Checkout", info: "Contact Information",
      name: "Full Name", email: "Email", phone: "Phone",
      address: "Shipping Address", city: "City", zip: "ZIP Code", country: "Country",
      payment: "Payment Method", cardNum: "Card Number", expiry: "MM/YY", cvv: "CVV",
      placeOrder: "Place Order", or: "or pay with",
      stripe: "Pay with Stripe", paypal: "Pay with PayPal",
      success: "Order placed successfully!", successSub: "You'll receive a confirmation email shortly.",
      backShop: "Back to Shop"
    },
    auth: {
      login: "Sign In", register: "Create Account",
      email: "Email address", password: "Password", confirmPass: "Confirm Password",
      name: "Full Name", loginBtn: "Sign In", registerBtn: "Create Account",
      noAccount: "Don't have an account?", hasAccount: "Already have an account?",
      forgotPass: "Forgot password?", or: "or continue with",
      google: "Continue with Google", logout: "Sign Out",
      welcome: "Welcome back", guest: "Guest"
    },
    reviews: { title: "What Our Clients Say", label: "Customer Love", verified: "Verified Purchase" },
    toast: { added: "Added to cart", removed: "Removed from cart", wishlisted: "Added to wishlist", subscribed: "Welcome! 10% off on its way ✦" }
  },
  fr: {
    dir: "ltr",
    nav: {
      collections: "Collections", shop: "Boutique", about: "À propos", reviews: "Avis",
      cart: "Panier", login: "Connexion", logout: "Déconnexion", account: "Mon Compte",
      search: "Rechercher des bijoux..."
    },
    hero: {
      badge: "Nouvelle Collection 2025",
      h1a: "Parée d'une", h1b: "Élégance Pure",
      sub: "Bijoux fins artisanaux qui célèbrent chaque moment de votre histoire",
      cta1: "Explorer la Collection", cta2: "Notre Histoire"
    },
    marquee: ["Livraison gratuite +150$", "Fait avec Amour", "Or 14K & Argent Sterling", "Retours 30 jours", "Gemmes Certifiées", "Emballage Cadeau"],
    cats: { title: "Découvrez Nos Collections", label: "Acheter par Catégorie",
      necklaces: "Colliers", rings: "Bagues", bracelets: "Bracelets", earrings: "Boucles d'oreilles",
      pieces: "pièces" },
    products: { title: "Pièces les Plus Aimées", label: "Sélection Curatée",
      all: "Tout", addCart: "Ajouter au Panier", outStock: "Épuisé",
      wishlist: "Liste de souhaits", reviews: "avis" },
    cart: {
      title: "Votre Panier", empty: "Votre panier est vide",
      subtotal: "Sous-total", shipping: "Livraison", free: "GRATUIT",
      total: "Total", checkout: "Passer la Commande",
      continue: "Continuer les Achats", remove: "Supprimer"
    },
    checkout: {
      title: "Paiement", info: "Informations de Contact",
      name: "Nom Complet", email: "Email", phone: "Téléphone",
      address: "Adresse de Livraison", city: "Ville", zip: "Code Postal", country: "Pays",
      payment: "Mode de Paiement", cardNum: "Numéro de Carte", expiry: "MM/AA", cvv: "CVV",
      placeOrder: "Passer la Commande", or: "ou payer avec",
      stripe: "Payer avec Stripe", paypal: "Payer avec PayPal",
      success: "Commande passée avec succès!", successSub: "Vous recevrez un email de confirmation bientôt.",
      backShop: "Retour à la Boutique"
    },
    auth: {
      login: "Se Connecter", register: "Créer un Compte",
      email: "Adresse email", password: "Mot de passe", confirmPass: "Confirmer le mot de passe",
      name: "Nom Complet", loginBtn: "Se Connecter", registerBtn: "Créer un Compte",
      noAccount: "Pas encore de compte?", hasAccount: "Déjà un compte?",
      forgotPass: "Mot de passe oublié?", or: "ou continuer avec",
      google: "Continuer avec Google", logout: "Déconnexion",
      welcome: "Bon retour", guest: "Invité"
    },
    reviews: { title: "Ce que Disent nos Clientes", label: "Amour Client", verified: "Achat Vérifié" },
    toast: { added: "Ajouté au panier", removed: "Retiré du panier", wishlisted: "Ajouté aux favoris", subscribed: "Bienvenue! -10% en route ✦" }
  },
  ar: {
    dir: "rtl",
    nav: {
      collections: "المجموعات", shop: "المتجر", about: "عنا", reviews: "التقييمات",
      cart: "السلة", login: "تسجيل الدخول", logout: "خروج", account: "حسابي",
      search: "ابحث عن المجوهرات..."
    },
    hero: {
      badge: "مجموعة 2025 الجديدة",
      h1a: "مزيّنة بـ", h1b: "أناقة خالصة",
      sub: "مجوهرات فاخرة مصنوعة يدوياً تحتفل بكل لحظة من قصتك",
      cta1: "استكشفي المجموعة", cta2: "قصتنا"
    },
    marquee: ["شحن مجاني فوق 150$", "مصنوعة بحب", "ذهب 14 قيراط وفضة", "إرجاع 30 يوم", "أحجار كريمة معتمدة", "تغليف هدايا متاح"],
    cats: { title: "اكتشفي مجموعاتنا", label: "تسوق حسب الفئة",
      necklaces: "قلادات", rings: "خواتم", bracelets: "أساور", earrings: "أقراط",
      pieces: "قطعة" },
    products: { title: "القطع الأكثر حباً", label: "مختارات مميزة",
      all: "الكل", addCart: "أضف للسلة", outStock: "نفذ المخزون",
      wishlist: "المفضلة", reviews: "تقييم" },
    cart: {
      title: "سلتك", empty: "سلتك فارغة",
      subtotal: "المجموع الفرعي", shipping: "الشحن", free: "مجاني",
      total: "الإجمالي", checkout: "إتمام الشراء",
      continue: "متابعة التسوق", remove: "حذف"
    },
    checkout: {
      title: "الدفع", info: "معلومات التواصل",
      name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف",
      address: "عنوان الشحن", city: "المدينة", zip: "الرمز البريدي", country: "الدولة",
      payment: "طريقة الدفع", cardNum: "رقم البطاقة", expiry: "MM/YY", cvv: "CVV",
      placeOrder: "إتمام الطلب", or: "أو الدفع بـ",
      stripe: "الدفع بـ Stripe", paypal: "الدفع بـ PayPal",
      success: "تم تقديم الطلب بنجاح!", successSub: "ستتلقى بريد تأكيد قريباً.",
      backShop: "العودة للمتجر"
    },
    auth: {
      login: "تسجيل الدخول", register: "إنشاء حساب",
      email: "البريد الإلكتروني", password: "كلمة المرور", confirmPass: "تأكيد كلمة المرور",
      name: "الاسم الكامل", loginBtn: "دخول", registerBtn: "إنشاء الحساب",
      noAccount: "ليس لديك حساب؟", hasAccount: "لديك حساب؟",
      forgotPass: "نسيت كلمة المرور؟", or: "أو المتابعة بـ",
      google: "المتابعة مع Google", logout: "تسجيل الخروج",
      welcome: "مرحباً بعودتك", guest: "زائر"
    },
    reviews: { title: "ما تقوله عميلاتنا", label: "آراء العملاء", verified: "شراء موثق" },
    toast: { added: "تمت الإضافة للسلة", removed: "تمت الإزالة من السلة", wishlisted: "تمت الإضافة للمفضلة", subscribed: "أهلاً! خصم 10% في الطريق ✦" }
  }
};
