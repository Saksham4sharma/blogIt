import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: assets.facebook_icon, 
      href: '#',
      ariaLabel: 'Visit our Facebook page' 
    },
    { 
      name: 'Twitter', 
      icon: assets.twitter_icon, 
      href: '#',
      ariaLabel: 'Follow us on Twitter' 
    },
    { 
      name: 'Google Plus', 
      icon: assets.googleplus_icon, 
      href: '#',
      ariaLabel: 'Connect with us on Google Plus' 
    },
  ];

  return (
    <footer className='flex justify-around flex-col gap-4 sm:gap-0 sm:flex-row bg-black py-8 items-center'>
      <div className="flex flex-col items-center sm:items-start">
        <Image 
          src={assets.blogit_logo} 
          alt='BlogIt Logo' 
          width={120} 
          height={40}
          className="mb-2"
        />
      </div>
      
      <div className="text-center">
        <p className='text-sm text-gray-300'>
          © {currentYear} BlogIt. All rights reserved.
        </p>
      </div>
      
      <div className='flex gap-2' role="list" aria-label="Social media links">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            className="hover:opacity-80 transition-opacity duration-200 p-1"
            aria-label={social.ariaLabel}
            role="listitem"
          >
            <Image 
              src={social.icon} 
              alt={`${social.name} icon`} 
              width={36} 
              height={36}
              className="hover:scale-110 transition-transform duration-200"
            />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
