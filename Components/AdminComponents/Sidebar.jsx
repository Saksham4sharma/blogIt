import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        {
            href: '/admin/addBlog',
            icon: assets.add_icon,
            label: 'Add blogs',
            description: 'Create new blog posts'
        },
        {
            href: '/admin/blogList',
            icon: assets.blog_icon,
            label: 'Blog lists',
            description: 'Manage existing blogs'
        },
        {
            href: '/admin/subscriptions',
            icon: assets.email_icon,
            label: 'Subscriptions',
            description: 'Manage email subscribers'
        }
    ];

    const isActiveLink = (href) => pathname === href;

    return (
        <nav className='flex flex-col bg-slate-100' role="navigation" aria-label="Admin navigation">
            {/* Logo Header */}
            <div className='px-2 sm:pl-14 py-3 border border-black'>
                <Link href="/admin" className="block">
                    <Image 
                        src={assets.logo} 
                        width={120} 
                        alt='Admin Dashboard Logo' 
                        priority
                    />
                </Link>
            </div>

            {/* Navigation Menu */}
            <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
                <div className='w-[50%] sm:w-[80%] absolute right-0 space-y-4'>
                    {menuItems.map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={`flex items-center border border-black gap-3 font-medium px-3 py-3 transition-all duration-200 ${
                                isActiveLink(item.href)
                                    ? 'bg-black text-white shadow-[-5px_5px_0px_#333333]'
                                    : 'bg-white hover:bg-gray-50 shadow-[-5px_5px_0px_#000000] hover:shadow-[-3px_3px_0px_#000000]'
                            }`}
                            aria-label={item.description}
                            title={item.description}
                        >
                            <Image 
                                src={item.icon} 
                                alt={`${item.label} icon`} 
                                width={28} 
                                height={28}
                                className={isActiveLink(item.href) ? 'brightness-0 invert' : ''}
                            />
                            <span className='hidden sm:inline-block text-sm'>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-8 right-0 w-[50%] sm:w-[80%]">
                    <div className="text-xs text-gray-500 text-center hidden sm:block">
                        <p>Admin Panel v1.0</p>
                        <p className="mt-1">Blog Management System</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
