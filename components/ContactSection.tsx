'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import PlanetAnimation from './PlanetAnimation';
import ScrollAnimation from './ScrollAnimation';
import StaggerItem from './StaggerItem';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger the animations
          setTimeout(() => setFormVisible(true), 150);
          setTimeout(() => setContactVisible(true), 300);
        }
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Encode the email components
    const recipient = 'revoultstudio@gmail.com'; // Your email address
    const subject = formData.subject || 'New Contact Form Submission';
    const body = `Name: ${formData.firstName} ${formData.lastName}\n\n` +
                (formData.message || 'No message provided');
    
    // Open Gmail in a new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
    // Show success message
    setSubmitSuccess(true);
    setFormData({ firstName: '', lastName: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  // Generate particles effect similar to HeroSection
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate particles on client side
    const newParticles = Array.from({ length: 20 }, () => ({
      width: Math.random() * 5 + 2,
      height: Math.random() * 5 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0613] to-[#0c0c7a]/10">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: '10%',
            left: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle at 30% 30%, #a78bfa 0%, transparent 70%)',
            opacity: 0.7,
            filter: 'blur(80px)'
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '0%',
            right: '10%',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle at 70% 70%, #1b1ac7 0%, transparent 70%)',
            opacity: 0.6,
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <ScrollAnimation duration={0.7} delay={0.1} direction="up" once={false}>
          <div className="text-center mb-16">
            <h2 ref={titleRef} className="text-4xl lg:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto opacity-90">
              Ready to start your next project? Let&apos;s discuss how we can help bring your vision to life.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <ScrollAnimation duration={0.7} delay={0.2} direction="up" once={false}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-[#b8c5ff] mb-2 font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#040422]/50 border border-[#7784e4]/30 rounded-lg text-white placeholder-[#b8c5ff]/30 focus:border-[#7784e4] focus:ring-1 focus:ring-[#7784e4] focus:outline-none transition-all duration-300 group-hover:border-[#7784e4]/60"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-[#b8c5ff] mb-2 font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#040422]/50 border border-[#7784e4]/30 rounded-lg text-white placeholder-[#b8c5ff]/30 focus:border-[#7784e4] focus:ring-1 focus:ring-[#7784e4] focus:outline-none transition-all duration-300 group-hover:border-[#7784e4]/60"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-[#b8c5ff] mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#040422]/50 border border-[#7784e4]/30 rounded-lg text-white placeholder-[#b8c5ff]/30 focus:border-[#7784e4] focus:ring-1 focus:ring-[#7784e4] focus:outline-none transition-all duration-300 group-hover:border-[#7784e4]/60"
                  placeholder="Subject"
                  required
                />
              </div>
            
            <div className="group">
              <label className="block text-[#b8c5ff] mb-2 font-medium">Message</label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#040422]/50 border border-[#7784e4]/30 rounded-lg text-white placeholder-[#b8c5ff]/30 focus:border-[#7784e4] focus:ring-1 focus:ring-[#7784e4] focus:outline-none transition-all duration-300 resize-none group-hover:border-[#7784e4]/60"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group w-full btn-primary flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#7784e4]/30 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </>
                )}
              </button>
              
              {submitSuccess && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm text-center">
                  Thank you! Your message has been sent. We&apos;ll get back to you soon.
                </div>
              )}
            </div>
          </form>
          </ScrollAnimation>

          {/* Contact Information */}
          <ScrollAnimation duration={0.7} delay={0.3} direction="right" once={false}>
            <div ref={contactInfoRef} className="space-y-6">
              <div className="relative bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 p-6 rounded-2xl border border-[#7784e4]/20 backdrop-blur-sm overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#1b1ac7]/20 rounded-full filter blur-xl"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-[#a78bfa]/20 rounded-full filter blur-xl"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                Contact <span className="text-[#7784e4]">Information</span>
              </h3>
              
              <div className="space-y-2 relative z-10">
                <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-[#0c0c7a]/20 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[#b8c5ff] text-sm">Email</div>
                    <a href="mailto:triplembravo@gmail.com" className="text-white font-medium hover:text-[#a78bfa] transition-colors duration-300">
                    revoultstudio@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[#0c0c7a]/20 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[#b8c5ff] text-sm">Phone</div>
                    <a href="tel:+8801620264528" className="text-white font-medium hover:text-[#a78bfa] transition-colors duration-300">
                      +880 1620-264528
                    </a>
                  </div>
                </div>
                
                <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[#0c0c7a]/20 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[#b8c5ff] text-sm">Location</div>
                    <div className="text-white font-medium">Chittagong, Bangladesh</div>
                    <a 
                      href="https://www.google.com/maps/place/Chittagong" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#7784e4] hover:underline inline-block mt-1"
                    >
                      View on map →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 p-6 rounded-2xl neon-border">
              <h3 className="text-xl font-bold text-white mb-3">Response Time</h3>
              <p className="text-[#b8c5ff] leading-relaxed">
                We typically respond to all inquiries within 24 hours. For urgent matters, 
                please call us directly.
              </p>
            </div>
          </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;