import React, { useState, useEffect } from 'react';
import { X, Home } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { baseUrl } from '../lib/base-url';

interface LeadCapturePopupProps {
  delaySeconds?: number; // How many seconds before showing popup
}

const LeadCapturePopup: React.FC<LeadCapturePopupProps> = ({ 
  delaySeconds = 300 // Default 5 minutes
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already seen or dismissed the popup
    const hasSeenPopup = localStorage.getItem('leadCaptureShown');
    const hasSubmitted = localStorage.getItem('leadCaptureSubmitted');
    
    if (hasSeenPopup || hasSubmitted) {
      console.log('Lead popup already shown or submitted, not showing again');
      return; // Don't show popup again
    }

    console.log(`Lead popup will appear in ${delaySeconds} seconds`);

    // Set timer to show popup after specified delay
    const timer = setTimeout(() => {
      console.log('Showing lead popup now');
      setIsOpen(true);
      localStorage.setItem('leadCaptureShown', 'true');
    }, delaySeconds * 1000); // Convert seconds to milliseconds

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/api/lead-capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: 'Early Access Popup',
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        toast.success('Thank you! You\'re on the list for early access to new listings!');
        localStorage.setItem('leadCaptureSubmitted', 'true');
        setIsOpen(false);
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Lead capture error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-[#0a131e] to-[#1a2330] p-8 text-white relative overflow-hidden">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Home size={24} />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-light tracking-wider">
                ADNAN KHAN
              </h3>
              <p className="font-body text-xs text-white/70">
                Cambridge Real Estate
              </p>
            </div>
          </div>
          
          <DialogTitle className="font-heading text-3xl font-light leading-tight mb-2 text-white">
            Get Early Access to New Listings
          </DialogTitle>
          <p className="font-body text-sm text-white/80">
            Be the first to know about exclusive properties before they hit the market.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="popup-name" className="font-body text-sm font-semibold text-[#0a131e]">
              Full Name *
            </Label>
            <Input
              id="popup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-body"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-email" className="font-body text-sm font-semibold text-[#0a131e]">
              Email Address *
            </Label>
            <Input
              id="popup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-body"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-phone" className="font-body text-sm font-semibold text-[#0a131e]">
              Phone Number *
            </Label>
            <Input
              id="popup-phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="font-body"
              placeholder="(555) 123-4567"
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              What You'll Get:
            </h4>
            <ul className="space-y-1 font-body text-sm text-[#6c757d]">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Early access to new listings before public</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Exclusive market insights and updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Personalized property recommendations</span>
              </li>
            </ul>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full font-button bg-[#0a131e] hover:bg-[#1a2330] h-12"
          >
            <span className="!text-white font-medium">
              {isSubmitting ? 'Submitting...' : 'Get Early Access'}
            </span>
          </Button>

          <p className="text-xs text-[#6c757d] font-body text-center">
            By submitting, you agree to receive updates about new listings. You can unsubscribe at any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCapturePopup;
