import dns from 'dns';
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // Ignore DNS error
  }
}
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mallRoutes from './routes/mallRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Register 2060 Mall API routes (both on /api and root)
app.use('/api', mallRoutes);
app.use('/', mallRoutes);

app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    system: 'VALKYRIE 2060 // Grand Pavilion Luxury API',
    year: 2060,
    timestamp: new Date()
  });
});

// Serve frontend static build if available
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/mall') || req.path.startsWith('/products') || req.path.startsWith('/shops') || req.path.startsWith('/orders') || req.path.startsWith('/concierge')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Connect MongoDB with timeout safeguard (doesn't block server if offline)
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.log('⚠️ MongoDB offline, running in High-Speed Luxury In-Memory Mode:', err.message));
} else {
  console.log('⚡ Running in 2060 High-Speed In-Memory Luxury Store Mode');
}

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 VALKYRIE 2060 Grand Pavilion online at http://localhost:${PORT}`));
}

export default app;