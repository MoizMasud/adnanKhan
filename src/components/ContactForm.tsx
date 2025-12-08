import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';
import { baseUrl } from '../lib/base-url';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation(0.2);
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation(0.2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json() as { ok?: boolean };

      if (data?.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div 
            ref={leftRef}
            className={`animate-on-scroll animate-fade-left ${leftVisible ? 'visible' : ''}`}
          >
            <div className="mb-6 sm:mb-8">
              <span className="font-body text-xs sm:text-sm tracking-widest text-[#b7b7b7] uppercase">
                Get In Touch
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#0a131e] mt-3 sm:mt-4 mb-4 sm:mb-6">
                Let's Start a Conversation
              </h2>
              <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mb-4 sm:mb-6" />
              <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] leading-relaxed">
                Whether you're looking to buy, sell, or simply have questions about the Cambridge real estate market, I'm here to help. Reach out today for a consultation.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#b7b7b7]" />
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#0a131e] mb-1">Phone</h3>
                  <p className="font-body text-sm sm:text-base text-gray-600">(519) 555-0123</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#b7b7b7]" />
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#0a131e] mb-1">Email</h3>
                  <p className="font-body text-sm sm:text-base text-gray-600 break-all">adnan@adnankhanrealty.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#b7b7b7]" />
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#0a131e] mb-1">Office</h3>
                  <p className="font-body text-sm sm:text-base text-gray-600">Cambridge, Ontario</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div 
            ref={rightRef}
            className={`bg-[#f8f8f8] p-6 sm:p-8 md:p-10 lg:p-12 animate-on-scroll animate-fade-right ${rightVisible ? 'visible' : ''}`}
          >
            <form onSubmit={handleSubmit} method="POST" action={`${baseUrl}/api/contact`} className="space-y-4 sm:space-y-6">
              <div>
                <Label htmlFor="fullName" className="font-body text-xs sm:text-sm text-[#0a131e] mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] text-sm sm:text-base"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-body text-xs sm:text-sm text-[#0a131e] mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] text-sm sm:text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="font-body text-xs sm:text-sm text-[#0a131e] mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] text-sm sm:text-base"
                  placeholder="(519) 555-0123"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="font-body text-xs sm:text-sm text-[#0a131e] mb-2 block">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] text-sm sm:text-base"
                  placeholder="How can I help you?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-body text-xs sm:text-sm text-[#0a131e] mb-2 block">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-[#b7b7b7] focus:ring-[#b7b7b7] text-sm sm:text-base"
                  placeholder="Tell me about your real estate needs..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0a131e] hover:bg-white !text-white hover:!text-[#0a131e] font-button tracking-wider py-5 sm:py-6 text-sm sm:text-base !border-2 !border-[#0a131e] hover:!border-[#0a131e] transition-colors duration-300"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </Button>

              {submitStatus === 'success' && (
                <div className="mt-6 p-6 sm:p-8 bg-white border-l-4 border-[#0a131e] shadow-sm animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#0a131e] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl text-[#0a131e] mb-2">
                        Message Sent Successfully
                      </h3>
                      <p className="font-body text-sm sm:text-base text-gray-600 leading-relaxed">
                        Thank you for reaching out. I will review your message and get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-6 p-6 sm:p-8 bg-white border-l-4 border-red-600 shadow-sm animate-fadeIn">
                  <div className="flex items-start gap-4">
                    <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl text-[#0a131e] mb-2">
                        Unable to Send Message
                      </h3>
                      <p className="font-body text-sm sm:text-base text-gray-600 leading-relaxed">
                        We encountered an issue sending your message. Please try again or contact me directly via phone or email.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
