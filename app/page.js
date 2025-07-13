'use client'
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  return (
    <>
      <ToastContainer 
        theme="dark"
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
