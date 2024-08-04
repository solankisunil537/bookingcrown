import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import UserDashboard from './user/pages/Dashboard/Dashboard';
import AddBooking from './user/pages/AddBooking/AddBooking';
import BookingList from './user/pages/BookingList/BookingList';
import EditBooking from './user/pages/EditBooking/EditBooking';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import ProtectedRoute from './services/protectedRoute/ProtectedRoute';
import BookingDetail from './user/pages/BookingDetail/BookingDetail';
import AddTables from './user/pages/AddTables/AddTables';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* ------------------ protected routes ------------------ */}
        <Route path="/user/dashboard" element={<ProtectedRoute element={UserDashboard} requiredRole="user" />} />
        <Route path="/user/add-booking" element={<ProtectedRoute element={AddBooking} requiredRole="user" />} />
        <Route path="/user/booking-list" element={<ProtectedRoute element={BookingList} requiredRole="user" />} />
        <Route path="/user/booking-details/:id" element={<ProtectedRoute element={BookingDetail} requiredRole="user" />} />
        <Route path="/user/edit-booking/:id" element={<ProtectedRoute element={EditBooking} requiredRole="user" />} />
        <Route path="/user/table-list" element={<ProtectedRoute element={AddTables} requiredRole="user" />} />

        <Route path="/admin/dashboard" element={<ProtectedRoute element={AdminDashboard} requiredRole="admin" />} />

      </Routes>
    </div>
  );
}

export default App;
