'use client';

import { useState } from 'react';
import { Search, TrendingUp, Target, BarChart3, Globe, Zap, Sparkles, Play } from 'lucide-react';
import PlanetAnimation from '../../components/PlanetAnimation';

export default function SEOPage() {
  // Set up particles with CSS animations
  const [particles] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animation: `${i % 3 === 0 ? 'float' : i % 3 === 1 ? 'floatReverse' : 'floatSlow'} ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: Math.random() * 3,
    }))
  );

  const seoServices = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Keyword Research",
      description: "Comprehensive keyword analysis to target the right audience and drive qualified traffic.",
      features: ["Competitor Analysis", "Search Volume Analysis", "Long-tail Keywords", "Intent Mapping"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "On-Page SEO",
      description: "Optimizing your website's content and structure for better search engine visibility.",
      features: ["Title Optimization", "Meta Descriptions", "Header Tags", "Internal Linking"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Technical SEO",
      description: "Improving your website's technical foundation for better crawling and indexing.",
      features: ["Site Speed", "Mobile Optimization", "Schema Markup", "XML Sitemaps"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reporting",
      description: "Comprehensive tracking and reporting to measure SEO performance and ROI.",
      features: ["Google Analytics", "Search Console", "Rank Tracking", "Performance Reports"]
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section (UI/UX style) */}
      <section className="section-container parallax-section hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Enhanced background with particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#040422] via-[#0a0a0a] to-[#1a1a2e]"></div>
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#1b1ac7]/20 to-transparent"></div>
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#7784e4]/20 to-transparent"></div>
        </div>
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#7784e4] rounded-full opacity-60"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: particle.animation,
                animationDelay: `${particle.animationDelay}s`
              }}
            />
          ))}
        </div>
        {/* Central glowing arc with enhanced effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-1 bg-gradient-to-r from-transparent via-[#7784e4] to-transparent rounded-full opacity-80 blur-sm shadow-lg shadow-[#7784e4]/50"></div>
        </div>
        {/* Additional glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7784e4]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#1b1ac7]/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="space-y-12 max-w-5xl mx-auto animate-fade-in-up [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-200 [&>*:nth-child(3)]:animate-delay-300">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                <div className="gradient-text">SEO</div>
                <div className="text-white">Optimization</div>
              </h1>
              <p className="text-xl lg:text-2xl xl:text-3xl text-[#b8c5ff] leading-relaxed max-w-4xl mx-auto opacity-90">
                Boost your online visibility and drive organic traffic with our data-driven SEO strategies and proven methodologies.
              </p>
            </div>
            {/* Enhanced feature badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Data-Driven</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Technical Excellence</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#1b1ac7]/20 to-[#7784e4]/20 rounded-full border border-[#7784e4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-[#b8c5ff] font-medium">Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About/Description Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Why <span className="gradient-text">SEO</span> Matters
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-4xl mx-auto leading-relaxed">
              SEO is the backbone of digital visibility. Our approach combines technical expertise, content strategy, and analytics to help your business rank higher, attract more visitors, and convert them into loyal customers.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center [&>*]:animate-fade-in-up [&>*:nth-child(1)]:animate-delay-100 [&>*:nth-child(2)]:animate-delay-200">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Technical SEO Excellence
                </h3>
                <p className="text-lg text-[#b8c5ff] leading-relaxed">
                  We ensure your website is built on a solid technical foundation, optimized for speed, mobile, and search engine crawling.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Content & Strategy
                </h3>
                <p className="text-lg text-[#b8c5ff] leading-relaxed">
                  Our team crafts compelling content and implements strategies that engage users and drive organic growth.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Analytics & Results
                </h3>
                <p className="text-lg text-[#b8c5ff] leading-relaxed">
                  We track, analyze, and report on every aspect of your SEO campaign to ensure measurable success and continuous improvement.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#040422]/80 to-[#0c0c7a]/40 rounded-2xl p-8 border border-[#7784e4]/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Keyword Research</h4>
                      <p className="text-[#b8c5ff]">Targeting the right audience with data-driven insights</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">On-Page Optimization</h4>
                      <p className="text-[#b8c5ff]">Enhancing your site&apos;s content and structure for better rankings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1b1ac7] to-[#7784e4] rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Technical SEO</h4>
                      <p className="text-[#b8c5ff]">Optimizing site speed, mobile experience, and crawlability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our SEO <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-[#b8c5ff] max-w-3xl mx-auto">
              Comprehensive SEO solutions to improve your search rankings and drive results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 [&>*]:animate-fade-in-up [&>*:nth-child(odd)]:animate-delay-100 [&>*:nth-child(even)]:animate-delay-200">
            {seoServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 p-8 rounded-2xl neon-border card-hover card-3d"
              >
                <div className="text-[#7784e4] mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                
                <p className="text-[#b8c5ff] mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-[#b8c5ff]">
                      <div className="w-1.5 h-1.5 bg-[#7784e4] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-[#0c0c7a]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proven <span className="gradient-text">Results</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "300%", label: "Average Traffic Increase" },
              { number: "85%", label: "First Page Rankings" },
              { number: "150+", label: "Successful Projects" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-[#040422] to-[#0c0c7a]/20 rounded-2xl neon-border card-hover card-3d"
              >
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                  {stat.number}
                </div>
                <div className="text-[#b8c5ff] text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}