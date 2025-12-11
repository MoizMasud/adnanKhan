import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import MortgageCalculator from './MortgageCalculator';

const Footer = () => {
  return (
    <footer className="bg-[#0a131e] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-heading text-2xl font-light tracking-wider mb-4">
              ADNAN KHAN
            </h3>
            <p className="font-body text-sm text-gray-400 leading-relaxed mb-6">
              Cambridge & Ontario's Premier Real Estate Specialist
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-[#b7b7b7] hover:text-[#b7b7b7] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:border-[#b7b7b7] hover:text-[#b7b7b7] transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-light tracking-wider mb-4 text-[#b7b7b7]">
              Quick Links
            </h4>
            <ul className="space-y-2 list-none !p-0 !m-0" style={{ paddingLeft: '0 !important' }}>
              <li>
                <a href={`${baseUrl}/`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/about`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/search`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Search Homes
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/listings`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Featured Listings
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/buyers`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Buying a Home
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/sellers`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Selling Your Home
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/news`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/contact`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-light tracking-wider mb-4 text-[#b7b7b7]">
              Services
            </h4>
            <ul className="space-y-2 list-none !p-0 !m-0" style={{ paddingLeft: '0 !important' }}>
              <li>
                <MortgageCalculator 
                  variant="link" 
                  className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors !no-underline"
                  style={{ color: 'var(--color-gray-400)' }}
                />
              </li>
              <li>
                <a href={`${baseUrl}/contact`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Home Evaluation
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/buyers`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Buyer Services
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/sellers`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Seller Services
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/contact`} className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-light tracking-wider mb-4 text-[#b7b7b7]">
              Get in Touch
            </h4>
            <ul className="space-y-3 list-none !p-0 !m-0" style={{ paddingLeft: '0 !important' }}>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#b7b7b7] flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-gray-400">
                  Cambridge, Ontario
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#b7b7b7] flex-shrink-0 mt-0.5" />
                <a href="tel:+15551234567" className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#b7b7b7] flex-shrink-0 mt-0.5" />
                <a href="mailto:adnan@adnankhanrealty.com" className="font-body text-sm text-gray-400 hover:text-[#b7b7b7] transition-colors">
                  adnan@adnankhanrealty.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-gray-500">
              © {new Date().getFullYear()} Adnan Khan Realty. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-xs text-gray-500 hover:text-[#b7b7b7] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-body text-xs text-gray-500 hover:text-[#b7b7b7] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
