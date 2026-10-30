import React, { useState } from 'react';
import { MallProvider } from './context/MallContext';
import { MatrixNebulaCanvas } from './components/MatrixNebulaCanvas';
import { CyberNavbar } from './components/CyberNavbar';
import { CyberHero } from './components/CyberHero';
import { FloorNavigator } from './components/FloorNavigator';
import { ProductCatalogView } from './components/ProductCatalogView';
import { ShopsDirectory } from './components/ShopsDirectory';
import { HoloFittingRoom } from './components/HoloFittingRoom';
import { CyberConciergeModal } from './components/CyberConciergeModal';
import { QuantumCartDrawer } from './components/QuantumCartDrawer';
import { DroneTrackingModal } from './components/DroneTrackingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MallTelemetryBar } from './components/MallTelemetryBar';
import { CyberFooter } from './components/CyberFooter';
import { Toaster } from 'react-hot-toast';

export const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<'mall' | 'boutiques' | 'floors'>('mall');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Refined Ambient Caustics & Gold Motes Background */}
      <MatrixNebulaCanvas />

      {/* Luxury Navigation Header */}
      <CyberNavbar
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View */}
      <main className="flex-1 relative z-10 pb-16">
        {activeView === 'mall' ? (
          <>
            <CyberHero />
            <FloorNavigator />
            <ProductCatalogView searchQuery={searchQuery} />
          </>
        ) : (
          <ShopsDirectory />
        )}
      </main>

      {/* Grand Luxury Footer */}
      <CyberFooter />

      {/* Bespoke Modals & Fitting Suites */}
      <HoloFittingRoom />
      <CyberConciergeModal />
      <QuantumCartDrawer />
      <DroneTrackingModal />
      <ProductDetailModal />

      {/* Subtle Floating Dispatch Ticker */}
      <MallTelemetryBar />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#141418',
            color: '#f4f4f5',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            borderRadius: '12px'
          }
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <MallProvider>
      <AppContent />
    </MallProvider>
  );
}