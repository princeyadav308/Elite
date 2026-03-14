import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Onboarding
import GymIdentityStep1 from './pages/onboarding/GymIdentityStep1';
import MembershipPricingStep2 from './pages/onboarding/MembershipPricingStep2';
import StaffOperationsStep3 from './pages/onboarding/StaffOperationsStep3';
import EquipmentProgramsStep4 from './pages/onboarding/EquipmentProgramsStep4';
import BusinessGoalsStep5 from './pages/onboarding/BusinessGoalsStep5';
import ReviewLaunchStep6 from './pages/onboarding/ReviewLaunchStep6';

// Admin Layouts
import AdminLayout from './layouts/AdminLayout';
import SettingsLayout from './layouts/SettingsLayout';

// Trainer Layouts
import TrainerLayout from './layouts/TrainerLayout';

// Trainer Pages
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerSchedule from './pages/trainer/TrainerSchedule';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Members from './pages/admin/Members';
import StaffManagement from './pages/admin/StaffManagement';
import AddStaff from './pages/admin/AddStaff';
import AddEquipment from './pages/admin/AddEquipment';
import Financials from './pages/admin/Financials';
import RevenueCalculator from './pages/admin/RevenueCalculator';

// Settings Pages
import ProfileInformation from './pages/admin/settings/ProfileInformation';
import GymProfile from './pages/admin/settings/GymProfile';
import Payouts from './pages/admin/settings/Payouts';
import Subscriptions from './pages/admin/settings/Subscriptions';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Onboarding Routes */}
        <Route path="/onboarding/gym-identity" element={<GymIdentityStep1 />} />
        <Route path="/onboarding/membership-pricing" element={<MembershipPricingStep2 />} />
        <Route path="/onboarding/staff-operations" element={<StaffOperationsStep3 />} />
        <Route path="/onboarding/equipment-programs" element={<EquipmentProgramsStep4 />} />
        <Route path="/onboarding/business-goals" element={<BusinessGoalsStep5 />} />
        <Route path="/onboarding/review-launch" element={<ReviewLaunchStep6 />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="staff/add" element={<AddStaff />} />
          <Route path="equipment/add" element={<AddEquipment />} />
          <Route path="financials" element={<Financials />} />
          <Route path="revenue-calculator" element={<RevenueCalculator />} />

          {/* Settings with nested layout */}
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileInformation />} />
            <Route path="gym-profile" element={<GymProfile />} />
            <Route path="payouts" element={<Payouts />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>
        </Route>

        {/* Trainer Routes */}
        <Route path="/trainer" element={<TrainerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="schedule" element={<TrainerSchedule />} />
          <Route path="clients" element={<div className="p-8 font-semibold">Clients coming soon</div>} />
          <Route path="library" element={<div className="p-8 font-semibold">Library coming soon</div>} />
          <Route path="profile" element={<div className="p-8 font-semibold">Profile coming soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
