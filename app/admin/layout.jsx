'use client'
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <ToastContainer 
                    theme="dark"
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                
                <Sidebar />
                
                <div className="flex flex-col w-full">
                    <header className="flex items-center justify-between w-full py-4 px-6 bg-white border-b border-gray-200 shadow-sm">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                            <p className="text-sm text-gray-500">Manage your blog content</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-700">Administrator</p>
                                <p className="text-xs text-gray-500">Blog Manager</p>
                            </div>
                            <Image 
                                src={assets.profile_icon} 
                                width={40} 
                                height={40} 
                                alt="Admin profile" 
                                className="rounded-full border-2 border-gray-200"
                            />
                        </div>
                    </header>
                    
                    <main className="flex-1 overflow-auto bg-white">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}