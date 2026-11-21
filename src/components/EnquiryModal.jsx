import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle, Send, Building2, User, Mail, Phone, Calendar } from 'lucide-react';

export default function EnquiryModal() {
  const { isEnquiryOpen, setIsEnquiryOpen } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Private Residence',
    timeline: 'Within 3 Months',
    message: '',
  });

  if (!isEnquiryOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep message visible then close
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-[125] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsEnquiryOpen(false);
          setSubmitted(false);
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-xl bg-[#141312] border border-white/10 rounded-lg shadow-2xl p-8 z-10 animate-fade-in">
        <button
          onClick={() => {
            setIsEnquiryOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-14 h-14 text-gold-400 mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-3xl text-white mb-2">Enquiry Received</h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto mb-6">
              Thank you for sharing your project details. Our Senior Architectural Consultant in Dubai will review your requirements and reach out within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsEnquiryOpen(false);
                setSubmitted(false);
              }}
              className="px-8 py-2.5 bg-gold-400 text-stone-950 text-xs uppercase tracking-luxury font-medium"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xs uppercase tracking-luxury text-gold-400 font-medium">Bespoke Architectural Advisory</span>
            <h3 className="font-serif text-3xl text-white mt-1 mb-2">Find the Right Piece for Your Project</h3>
            <p className="text-xs text-stone-400 mb-6">
              Connect with our Dubai design team for trade pricing, bespoke material sourcing, and tailored spec sheets.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="elena@studio.ae"
                    className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">Project Type</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none"
                  >
                    <option>Private Luxury Residence</option>
                    <option>Boutique Hotel / Hospitality</option>
                    <option>Interior Architecture Firm</option>
                    <option>Superyacht Interior</option>
                    <option>Commercial Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">Project Notes / Pieces of Interest</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your space dimensions, preferred material (teak, hammered copper, verde marble), or quantity..."
                  className="w-full px-3 py-2 bg-stone-900 border border-white/10 rounded text-sm text-white focus:border-gold-400 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gold-400 hover:bg-gold-300 text-stone-950 text-xs uppercase tracking-luxury font-medium flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Architectural Enquiry</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

