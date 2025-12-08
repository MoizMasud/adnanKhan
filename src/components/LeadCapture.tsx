import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const LeadCapture = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: 'buyer'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', propertyType: 'buyer' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background Image with Grayscale and Grey Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80"
          srcSet="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1080&q=75 768w, https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80 1920w"
          alt="Contact Background"
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-[#f8f8f8]/93" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column - Additional Info */}
          <div>
            <div className="mb-6 sm:mb-8">
              <span className="font-body text-xs sm:text-sm tracking-widest text-[#0e1721] uppercase">
                Start Your Journey
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a1a] mt-3 sm:mt-4 mb-3 sm:mb-4">
                Ready to Make a Move?
              </h2>
              <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mb-4 sm:mb-6" />
              <p className="font-body text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Whether you're buying your first home, upgrading to your dream property, or selling your current house, I'm here to guide you through every step of the process.
              </p>
              <p className="font-body text-sm sm:text-base text-gray-600 leading-relaxed">
                Fill out the form and I'll get back to you within 24 hours to discuss your real estate goals and how I can help you achieve them.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#b7b7b7] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#1a1a1a] mb-1 !mt-0">Call or Text</h3>
                  <p className="font-body text-sm sm:text-base text-gray-600">(519) 555-0123</p>
                  <p className="font-body text-xs sm:text-sm text-gray-500 mt-1">Available 7 days a week</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#b7b7b7] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#1a1a1a] mb-1 !mt-0">Email</h3>
                  <p className="font-body text-sm sm:text-base text-gray-600 break-all">adnan@adnankhanrealty.com</p>
                  <p className="font-body text-xs sm:text-sm text-gray-500 mt-1">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#b7b7b7] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#1a1a1a] mb-1 !mt-0">Service Area</h3>
                  <p className="font-body text-sm sm:text-base text-gray-600">Cambridge & Surrounding Areas</p>
                  <p className="font-body text-xs sm:text-sm text-gray-500 mt-1">Waterloo Region & Beyond</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#b7b7b7] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#1a1a1a] mb-1 !mt-0">Office Hours</h3>
                  <p className="font-body text-sm sm:text-base text-gray-600">Monday - Friday: 9am - 7pm</p>
                  <p className="font-body text-sm sm:text-base text-gray-600">Saturday - Sunday: 10am - 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-6 sm:p-8 md:p-12 shadow-lg">
            <h3 className="font-heading text-xl sm:text-2xl font-light text-[#1a1a1a] mb-4 sm:mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="font-body text-xs sm:text-sm text-[#1a1a1a] mb-2 block">
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] h-10 sm:h-12 text-sm sm:text-base"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-body text-xs sm:text-sm text-[#1a1a1a] mb-2 block">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] h-10 sm:h-12 text-sm sm:text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="font-body text-xs sm:text-sm text-[#1a1a1a] mb-2 block">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] h-10 sm:h-12 text-sm sm:text-base"
                  placeholder="(519) 555-0123"
                />
              </div>

              <div>
                <label htmlFor="propertyType" className="font-body text-xs sm:text-sm text-[#1a1a1a] mb-2 block">
                  I'm interested in... *
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  required
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full h-10 sm:h-12 bg-white border border-gray-300 rounded-md px-3 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] font-body text-sm sm:text-base"
                >
                  <option value="buyer">Buying a home</option>
                  <option value="seller">Selling my home</option>
                  <option value="both">Both buying and selling</option>
                  <option value="consultation">General consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="font-body text-xs sm:text-sm text-[#1a1a1a] mb-2 block">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] text-sm sm:text-base"
                  placeholder="Tell me about your real estate goals..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full font-button tracking-wider px-6 sm:px-10 py-5 sm:py-6 transition-all duration-300 !bg-transparent hover:!bg-[#0a131e] text-sm sm:text-base"
                style={{
                  backgroundColor: isHovering ? '#0a131e !important' : 'transparent !important',
                  color: isHovering ? 'white' : '#0a131e',
                  borderWidth: '2px',
                  borderColor: '#0a131e'
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </Button>

              {submitStatus === 'success' && (
                <div className="p-3 sm:p-4 bg-green-50 border border-green-200 text-green-800 text-center font-body text-sm">
                  Thank you! I'll get back to you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 sm:p-4 bg-red-50 border border-red-200 text-red-800 text-center font-body text-sm">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
