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
        <nav className='flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 shadow-lg' role="navigation" aria-label="Admin navigation">
            {/* Logo Header */}
            <div className='px-2 sm:pl-14 py-4 border-b-2 border-gray-300 bg-white shadow-sm'>
                <Link href="/admin" className="block">
                    <Image 
                        src={assets.blogit_logo} 
                        width={120} 
                        alt='BlogIt Admin Dashboard Logo' 
                        priority
                        className="hover:scale-105 transition-transform duration-200"
                    />
                </Link>
            </div>

            {/* Navigation Menu */}
            <div className='w-28 sm:w-80 h-[100vh] relative py-12 bg-gradient-to-b from-gray-50 to-gray-100'>
                <div className='w-[50%] sm:w-[80%] absolute right-0 space-y-4'>
                    {menuItems.map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={`flex items-center gap-3 font-medium px-4 py-4 mx-2 rounded-lg transition-all duration-300 ${
                                isActiveLink(item.href)
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                    : 'bg-white hover:bg-blue-50 shadow-md hover:shadow-lg hover:transform hover:scale-102 border border-gray-200'
                            }`}
                            aria-label={item.description}
                            title={item.description}
                        >
                            <Image 
                                src={item.icon} 
                                alt={`${item.label} icon`} 
                                width={28} 
                                height={28}
                                className={`transition-all duration-200 ${isActiveLink(item.href) ? 'brightness-0 invert' : 'opacity-70'}`}
                            />
                            <span className='hidden sm:inline-block text-sm font-medium'>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-8 right-0 w-[50%] sm:w-[80%]">
                    <div className="text-xs text-gray-600 text-center hidden sm:block bg-white rounded-lg p-3 mx-2 shadow-sm border border-gray-200">
                        <p className="font-semibold text-blue-600">BlogIt Admin v1.0</p>
                        <p className="mt-1 text-gray-500">Blog Management System</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
