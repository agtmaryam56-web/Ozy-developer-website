import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-Memory Database Store with initial records
interface UserRecord {
  id: string;
  fullName: string;
  phone: string;
  country: {
    name: string;
    code: string;
    flag: string;
  };
  gender: 'Male' | 'Female' | 'Other';
  role: string;
  createdAt: string;
}

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  status: 'Pending' | 'Reviewing' | 'Accepted';
  createdAt: string;
}

interface BakeryProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

interface BakeryOrder {
  orderId: string;
  customerName: string;
  phone: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  paymentMethod: string;
  status: 'Order Placed' | 'Baking in Oven' | 'Ready for Delivery' | 'Completed';
  isOtpVerified: boolean;
  customerGender?: 'Male' | 'Female' | 'Other';
  countryFlag?: string;
  createdAt: string;
}

// Global Order Security Settings
let orderSecuritySettings = {
  requirePhoneOtpForUnknownOrders: true,
  captureGenderAndFlag: true,
  blockUnknownSpam: true,
};

// Seed Database
const db = {
  users: [
    {
      id: 'USR-8901',
      fullName: 'Kamran Ali',
      phone: '+92 300 1234567',
      country: { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
      gender: 'Male' as const,
      role: 'Client (Retail)',
      createdAt: '2026-10-02 14:20:00',
    },
    {
      id: 'USR-8902',
      fullName: 'Ayesha Siddiqui',
      phone: '+92 333 9876543',
      country: { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
      gender: 'Female' as const,
      role: 'Bakery Brand Owner',
      createdAt: '2026-10-03 09:15:00',
    },
    {
      id: 'USR-8903',
      fullName: 'Marcus Vance',
      phone: '+1 415 5550192',
      country: { name: 'United States', code: '+1', flag: '🇺🇸' },
      gender: 'Male' as const,
      role: 'Agency Recruiter',
      createdAt: '2026-10-03 18:45:00',
    },
  ] as UserRecord[],

  otpStore: new Map<string, { code: string; expiresAt: number }>(),

  inquiries: [
    {
      id: 'INQ-101',
      name: 'Dr. Tariq Mahmood',
      email: 'tariq.care@gmail.com',
      phone: '+92 312 9988776',
      projectType: 'Clinic Appointment Portal',
      budget: '$1,500 - $3,000',
      message: 'Need a fast 3D responsive clinic booking portal with database sync for patient appointments.',
      status: 'Reviewing' as const,
      createdAt: '2026-10-01 11:30:00',
    },
    {
      id: 'INQ-102',
      name: 'Sofia Hernandez',
      email: 'sofia@designspark.co',
      phone: '+1 202 5550183',
      projectType: 'Full-Stack E-Commerce',
      budget: '$2,500 - $5,000',
      message: 'Impressed by your Gojaba Bakery demo. We want a custom food ordering system with WhatsApp checkout.',
      status: 'Accepted' as const,
      createdAt: '2026-10-03 16:10:00',
    },
  ] as InquiryRecord[],

  bakeryProducts: [
    {
      id: 'GB-01',
      name: 'Artisan Butter Croissant',
      category: 'Pastries',
      price: 4.50,
      description: 'Hand-laminated flaky French butter pastry, golden baked to crispy perfection.',
      rating: 4.9,
      reviewsCount: 128,
      inStock: true,
    },
    {
      id: 'GB-02',
      name: 'Organic Stoneground Sourdough',
      category: 'Breads',
      price: 6.80,
      description: '36-hour slow fermentation with wild yeast culture and crunchy crust.',
      rating: 5.0,
      reviewsCount: 94,
      inStock: true,
    },
    {
      id: 'GB-03',
      name: 'Gojaba Belgian Ganache Cake',
      category: 'Cakes',
      price: 28.00,
      description: 'Rich 70% dark Belgian chocolate sponge with silky chocolate truffle glaze.',
      rating: 4.8,
      reviewsCount: 156,
      inStock: true,
    },
    {
      id: 'GB-04',
      name: 'Fresh Raspberry Danish',
      category: 'Pastries',
      price: 5.20,
      description: 'Sweet Madagascar vanilla custard topped with glazed mountain raspberries.',
      rating: 4.9,
      reviewsCount: 82,
      inStock: true,
    },
    {
      id: 'GB-05',
      name: 'Pistachio & Rose Macarons (Box of 6)',
      category: 'Confections',
      price: 14.50,
      description: 'Delicate almond meringue shells filled with roasted Persian pistachio buttercream.',
      rating: 4.7,
      reviewsCount: 71,
      inStock: true,
    },
    {
      id: 'GB-06',
      name: 'Golden Cinnamon Brioche Buns',
      category: 'Breads',
      price: 4.20,
      description: 'Cardamom and Ceylon cinnamon swirl brioche with light brown sugar crust.',
      rating: 4.9,
      reviewsCount: 65,
      inStock: true,
    },
  ] as BakeryProduct[],

  bakeryOrders: [
    {
      orderId: 'GB-ORD-501',
      customerName: 'Zainab Qureshi',
      phone: '+92 316 9911223',
      items: [
        { name: 'Artisan Butter Croissant', quantity: 3, price: 4.50 },
        { name: 'Gojaba Belgian Ganache Cake', quantity: 1, price: 28.00 },
      ],
      totalAmount: 41.50,
      paymentMethod: 'Cash on Delivery',
      status: 'Baking in Oven' as const,
      createdAt: '2026-10-03 21:10:00',
    },
    {
      orderId: 'GB-ORD-502',
      customerName: 'Ahmed Bilal',
      phone: '+92 300 4455667',
      items: [
        { name: 'Organic Stoneground Sourdough', quantity: 2, price: 6.80 },
        { name: 'Fresh Raspberry Danish', quantity: 2, price: 5.20 },
      ],
      totalAmount: 24.00,
      paymentMethod: 'Online Payment',
      status: 'Ready for Delivery' as const,
      createdAt: '2026-10-03 22:45:00',
    },
  ] as BakeryOrder[],

  queryCount: 1420,
};

// API: Database Health & Live Status
app.get('/api/db/health', (req, res) => {
  db.queryCount++;
  res.json({
    status: 'connected',
    engine: 'Relational & Document Hybrid Database (OZY Engine)',
    latencyMs: Math.floor(Math.random() * 6) + 3,
    activeConnections: 8 + (db.users.length % 5),
    uptimeSeconds: Math.floor(process.uptime()),
    tables: {
      users: db.users.length,
      bakery_products: db.bakeryProducts.length,
      bakery_orders: db.bakeryOrders.length,
      inquiries: db.inquiries.length,
    },
    totalQueriesExecuted: db.queryCount,
    serverTimestamp: new Date().toISOString(),
  });
});

// API: Run Live DB Explorer / Query Runner
app.post('/api/db/query', (req, res) => {
  db.queryCount++;
  const { table, limit = 20 } = req.body;
  const target = (table || 'users').toLowerCase();

  let records: unknown[] = [];
  if (target === 'users') {
    records = db.users.slice(0, Number(limit));
  } else if (target === 'bakery_orders' || target === 'orders') {
    records = db.bakeryOrders.slice(0, Number(limit));
  } else if (target === 'bakery_products' || target === 'products') {
    records = db.bakeryProducts.slice(0, Number(limit));
  } else if (target === 'inquiries') {
    records = db.inquiries.slice(0, Number(limit));
  } else {
    records = db.users.slice(0, Number(limit));
  }

  res.json({
    success: true,
    table: target,
    rowCount: records.length,
    executionTimeMs: Number((Math.random() * 1.5 + 0.8).toFixed(2)),
    records,
  });
});

// API: Send Demo Phone OTP
app.post('/api/auth/send-otp', (req, res) => {
  const { phone, countryCode } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, error: 'Phone number is required.' });
  }

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const normalizedPhone = `${countryCode || '+92'}${phone.replace(/\D/g, '')}`;

  // Store with 5-minute expiry
  db.otpStore.set(normalizedPhone, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  return res.json({
    success: true,
    message: 'Demo OTP successfully generated & simulated SMS sent!',
    demoOtp: code, // returned for friendly one-click testing
    targetPhone: normalizedPhone,
    expiresInSeconds: 300,
  });
});

// API: Verify OTP & Sign Up User
app.post('/api/auth/signup', (req, res) => {
  const { fullName, phone, country, gender, role, otp } = req.body;

  if (!fullName || !phone || !gender || !otp) {
    return res.status(400).json({ success: false, error: 'All fields (Name, Phone, Gender, OTP) are required.' });
  }

  const normalizedPhone = `${country?.code || '+92'}${phone.replace(/\D/g, '')}`;
  const storedOtp = db.otpStore.get(normalizedPhone);

  // In demo mode: accept either stored OTP or '123456' as master test code
  if (otp !== '123456' && (!storedOtp || storedOtp.code !== otp)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid or expired OTP code. Click "Resend Demo OTP" or use 123456.',
    });
  }

  // Check if user already exists
  const existingUser = db.users.find(u => u.phone === normalizedPhone);
  if (existingUser) {
    return res.json({
      success: true,
      message: 'Welcome back! Logged in successfully.',
      user: existingUser,
      token: `ozy_auth_sess_${Date.now()}`,
    });
  }

  const newUser: UserRecord = {
    id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName,
    phone: normalizedPhone,
    country: country || { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
    gender,
    role: role || 'Client / Business Partner',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  db.users.unshift(newUser);
  db.queryCount++;

  return res.json({
    success: true,
    message: 'Registration successful! Connected to backend database.',
    user: newUser,
    token: `ozy_auth_sess_${Date.now()}`,
  });
});

// API: Get Users List
app.get('/api/auth/users', (req, res) => {
  res.json({
    success: true,
    users: db.users,
  });
});

// API: Bakery Demo Endpoints
app.get('/api/bakery/products', (req, res) => {
  res.json({
    success: true,
    products: db.bakeryProducts,
  });
});

app.get('/api/bakery/orders', (req, res) => {
  res.json({
    success: true,
    orders: db.bakeryOrders,
  });
});

// API: Get Order Security Settings
app.get('/api/settings/order-security', (req, res) => {
  res.json({
    success: true,
    settings: orderSecuritySettings,
  });
});

// API: Update Order Security Settings
app.post('/api/settings/order-security', (req, res) => {
  const { requirePhoneOtpForUnknownOrders, captureGenderAndFlag, blockUnknownSpam } = req.body;

  if (typeof requirePhoneOtpForUnknownOrders === 'boolean') {
    orderSecuritySettings.requirePhoneOtpForUnknownOrders = requirePhoneOtpForUnknownOrders;
  }
  if (typeof captureGenderAndFlag === 'boolean') {
    orderSecuritySettings.captureGenderAndFlag = captureGenderAndFlag;
  }
  if (typeof blockUnknownSpam === 'boolean') {
    orderSecuritySettings.blockUnknownSpam = blockUnknownSpam;
  }

  res.json({
    success: true,
    message: 'Order security policy updated successfully!',
    settings: orderSecuritySettings,
  });
});

app.post('/api/bakery/orders', (req, res) => {
  const { customerName, phone, items, paymentMethod, isOtpVerified, customerGender, countryFlag } = req.body;

  if (!customerName || !phone || !items || !items.length) {
    return res.status(400).json({ success: false, error: 'Missing order details.' });
  }

  // Check if unknown user verification is required
  const isExistingVerifiedUser = db.users.some((u) => u.phone === phone || u.phone.includes(phone.replace(/\D/g, '')));
  const verified = Boolean(isOtpVerified || isExistingVerifiedUser);

  if (orderSecuritySettings.requirePhoneOtpForUnknownOrders && !verified) {
    return res.status(403).json({
      success: false,
      requireOtpSignup: true,
      error: 'Security Notice: Unknown customer detected. Please sign up / verify your phone with Demo OTP to place your order.',
    });
  }

  const totalAmount = items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0
  );

  const newOrder: BakeryOrder = {
    orderId: `GB-ORD-${Math.floor(600 + Math.random() * 399)}`,
    customerName,
    phone,
    items,
    totalAmount: Number(totalAmount.toFixed(2)),
    paymentMethod: paymentMethod || 'Cash on Delivery',
    status: 'Order Placed',
    isOtpVerified: verified,
    customerGender: customerGender || 'Male',
    countryFlag: countryFlag || '🇵🇰',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  db.bakeryOrders.unshift(newOrder);
  db.queryCount++;

  return res.json({
    success: true,
    message: verified
      ? 'Bakery order verified with Phone OTP and recorded in database!'
      : 'Bakery order successfully written to backend database!',
    order: newOrder,
  });
});

// API: Inquiries / Contact
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, projectType, budget, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, error: 'Name, phone, and project message are required.' });
  }

  const newInquiry: InquiryRecord = {
    id: `INQ-${Math.floor(200 + Math.random() * 800)}`,
    name,
    email: email || 'Not provided',
    phone,
    projectType: projectType || 'Custom Full-Stack Website',
    budget: budget || 'Flexible',
    message,
    status: 'Pending',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  db.inquiries.unshift(newInquiry);
  db.queryCount++;

  return res.json({
    success: true,
    message: 'Your project inquiry has been recorded in OZY database. We will reply early on WhatsApp!',
    inquiry: newInquiry,
  });
});

app.get('/api/inquiries', (req, res) => {
  res.json({
    success: true,
    inquiries: db.inquiries,
  });
});

// Setup Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 OZY Developer Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
