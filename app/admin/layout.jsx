'use client'
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import AdminProtection from "@/Components/AdminProtection";
import { useAdminAuth } from "@/lib/useAdminAuth";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }) {
    const { handleLogout } = useAdminAuth();

    return (
        <AdminProtection>
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
                        <div className="flex items-center gap-4">
                            <Image 
                                src={assets.blogit_logo} 
                                width={120} 
                                alt='BlogIt Admin' 
                                className='w-[100px] sm:w-[120px]'
                            />
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                                <p className="text-sm text-gray-500">Manage your BlogIt content</p>
                            </div>
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
                            <button
                                onClick={handleLogout}
                                className="ml-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                                title="Logout from admin panel"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </header>
                    
                    <main className="flex-1 overflow-auto bg-white">
                        {children}
                    </main>
                </div>
            </div>
        </AdminProtection>
    );
}