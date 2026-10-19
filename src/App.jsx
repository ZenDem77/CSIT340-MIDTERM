import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";
import RequestToBook from "./pages/RequestToBook";
import MyBooking from "./pages/MyBooking";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/hotel/:id/request" element={<RequestToBook />} />
        <Route path="/my-booking" element={<MyBooking />} />
      </Route>
    </Routes>
  );
}