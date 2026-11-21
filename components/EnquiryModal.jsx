'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle } from 'lucide-react';

export default function EnquiryModal() {
  const { isEnquiryOpen, setIsEnquiryOpen, enquiryTitle } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (!isEnquiryOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        onClick={() => {
          setIsEnquiryOpen(false);
          setSubmitted(false);
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />
      <div className="relative w-full max-w-lg bg-[#141312] border border-white/10 rounded-lg p-8 z-10 shadow-2xl">
        <button
          onClick={() => {
            setIsEnquiryOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-4 right-4 text-stone-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-gold-400 mx-auto mb-3 animate-bounce" />
            <h3 className="font-serif text-2xl text-white mb-2">Enquiry Received</h3>
            <p className="text-xs text-stone-300 max-w-sm mx-auto mb-6">
              Thank you for sharing your project details. Our Senior Architectural Consultant in Dubai will review your requirements and reach out within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsEnquiryOpen(false);
                setSubmitted(false);
              }}
              className="px-6 py-2 bg-gold-400 text-stone-950 text-xs uppercase tracking-luxury font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-gold-400">Architectural Advisory</span>
            <h3 className="font-serif text-2xl text-white mt-1 mb-2">{enquiryTitle}</h3>
            <p className="text-xs text-stone-400 mb-6">
              Our Dubai showroom specialists will assist you with custom dimensions and material selections.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Your Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Maya Al Mansoori"
                  className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Email *</label>
                <input
                  required
                  type="email"
                  placeholder="maya@architects.ae"
                  className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+971 50 000 0000"
                  className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Project Details</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your project or selected piece..."
                  className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gold-400 hover:bg-gold-300 text-stone-950 text-xs uppercase tracking-luxury font-medium transition-colors"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

