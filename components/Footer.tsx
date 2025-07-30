'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-[#040422] to-[#0c0c7a]/20 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6 md:col-span-1">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">Revoult Studio</h3>
              <p className="text-[#b8c5ff] leading-relaxed">
                Transforming your ideas into visually stunning realities with our creative expertise in video, design, and digital solutions.
              </p>
            </div>

          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/video-editing" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Video Editing</Link></li>
              <li><Link href="/services/graphics-design" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Graphics Design</Link></li>
              <li><Link href="/services/3d-animation" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">3D Animation</Link></li>
              <li><Link href="/services/website-development" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Website Development</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-[#b8c5ff]">
                <Mail size={16} className="mr-3 text-[#7784e4]" />
                revoultstudio@gmail.com
              </li>
              <li className="flex items-center text-[#b8c5ff]">
                <Phone size={16} className="mr-3 text-[#7784e4]" />
                +880 1620-264528
              </li>
              <li className="flex items-center text-[#b8c5ff]">
                <MapPin size={16} className="mr-3 text-[#7784e4]" />
                Chittagong, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#7784e4]/20 pt-8 text-center">
          <p className="text-[#b8c5ff]">
            © {currentYear} Revoult Studio. All rights reserved. Crafting digital excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;