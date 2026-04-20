# Bond Jewelry — Full Stack Setup Guide

## Project Structure
```
bond-jewelry/
├── index.html           ← Main store (open this in browser)
├── data/
│   └── products.json    ← All product data (edit here)
├── css/
│   └── style.css        ← Design system
├── js/
│   ├── i18n.js          ← EN / FR / AR translations
│   └── app.js           ← Cart, Auth, State management
└── README.md
```

## Features Implemented (Frontend)
- ✅ Real cart with localStorage persistence
- ✅ Login / Register (localStorage auth)
- ✅ Multi-language: EN / FR / AR (with RTL support)
- ✅ Dark mode toggle
- ✅ products.json data source
- ✅ Real images (Unsplash)
- ✅ Checkout modal with Stripe / PayPal UI
- ✅ Live search
- ✅ Wishlist
- ✅ Category filter
- ✅ Scroll reveal animations
- ✅ Mobile responsive

---

## Backend Options

### Option A: Firebase (Recommended — no server needed)
```bash
npm install firebase
```
Replace localStorage in `js/app.js` with Firestore:
```js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const app = initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id"
});
const db = getFirestore(app);
const auth = getAuth(app);

// Save cart to Firestore
await setDoc(doc(db, "carts", userId), { items: cart });

// Real auth
await signInWithEmailAndPassword(auth, email, password);
```

### Option B: Node.js + Express Backend
```bash
mkdir server && cd server
npm init -y
npm install express cors dotenv stripe
```

#### server/index.js
```js
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve products
const products = require('../data/products.json');
app.get('/api/products', (req, res) => res.json(products));

// Stripe checkout
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    })),
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000',
  });
  res.json({ url: session.url });
});

app.listen(3000, () => console.log('Bond API running on :3000'));
```

#### .env
```
STRIPE_SECRET_KEY=sk_test_your_key_here
PAYPAL_CLIENT_ID=your_paypal_client_id
```

#### Connect Stripe in frontend (replace placeOrder function):
```js
async function placeOrder() {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: BondApp.getCart() })
  });
  const { url } = await response.json();
  window.location.href = url; // Redirect to Stripe hosted checkout
}
```

---

## Stripe Setup
1. Create account at https://stripe.com
2. Get test keys from Dashboard → Developers → API Keys
3. Use `sk_test_...` in .env, `pk_test_...` in frontend

## PayPal Setup
1. Go to https://developer.paypal.com
2. Create App → get Client ID
3. Add to frontend:
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>
```

## Real Images
All images use Unsplash (free, no API key needed for the URLs used).
To use your own: replace `image` URLs in `data/products.json`.

## Deploy
- **Netlify**: drag & drop the `bond-jewelry/` folder
- **Vercel**: `vercel deploy`
- **GitHub Pages**: push to repo, enable Pages

## Add More Products
Edit `data/products.json` — copy any product block and change the `id`, `slug`, and content.
