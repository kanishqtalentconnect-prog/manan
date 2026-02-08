import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddProperty from "./pages/AddProperty";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PropertyDetail from "./pages/PropertyDetail";
import EditPropertyPage from "./pages/EditProperty";
import AdminProperties from "./pages/AdminProperties";
import AdminBookings from "./pages/AdminBookings";
import AdminEnquiries from "./components/admin/AdminEnquiries";
import AdminCategories from "./components/admin/Categories";
import Faq from "./pages/FAQ";
import ContentManagement from "./pages/ContentManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/admin/add-property" element={<AddProperty />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/edit-property/:id" element={<EditPropertyPage />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/content-management" element={<ContentManagement />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
