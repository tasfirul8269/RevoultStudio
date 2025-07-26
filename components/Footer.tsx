'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-[#040422] to-[#0c0c7a]/20 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">NEXUS</h3>
              <p className="text-[#b8c5ff] leading-relaxed">
                Transforming digital experiences with innovative solutions and cutting-edge technology.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-[#7784e4] hover:text-white transition-colors duration-300">
                <Github size={20} />
              </a>
              <a href="#" className="text-[#7784e4] hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[#7784e4] hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/uiux" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">UI/UX Design</Link></li>
              <li><Link href="/web-development" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Web Development</Link></li>
              <li><Link href="/seo" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">SEO Optimization</Link></li>
              <li><a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Mobile Apps</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Our Team</a></li>
              <li><a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-[#b8c5ff] hover:text-[#7784e4] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-[#b8c5ff]">
                <Mail size={16} className="mr-3 text-[#7784e4]" />
                hello@nexus.com
              </li>
              <li className="flex items-center text-[#b8c5ff]">
                <Phone size={16} className="mr-3 text-[#7784e4]" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-[#b8c5ff]">
                <MapPin size={16} className="mr-3 text-[#7784e4]" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#7784e4]/20 pt-8 text-center">
          <p className="text-[#b8c5ff]">
            © {currentYear} NEXUS. All rights reserved. Built with passion and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;