'use client';

import { useState } from 'react';

export default function ContactForm({ form }: { form: any }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fields = form?.fields || {};
  const interestOptions: string[] = Array.isArray(form?.interestOptions)
    ? form.interestOptions
    : [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        formEl.reset();
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-10 shadow-lg border border-green-100 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-xl shadow-green-500/30">
          <i className="fas fa-check text-white text-3xl" />
        </div>
        <h3 className="font-display text-3xl font-extrabold text-gray-900 mb-3">
          {form.successTitle || 'Message sent successfully!'}
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          {form.successText || "Thank you for reaching out. We'll be in touch soon."}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 transition-colors"
        >
          <i className="fas fa-plus" /> Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100">
      <div className="mb-8 pb-6 border-b border-gray-100">
        <span className="section-badge bg-green-50 text-green-700 mb-4">
          <i className="fas fa-paper-plane mr-2" />
          {form.eyebrow}
        </span>
        <h3 className="font-display text-3xl font-extrabold text-gray-900 mb-2">
          {form.title} <span className="text-gradient-green">{form.titleAccent}</span>
        </h3>
        <p className="text-gray-500">{form.subtitle}</p>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 flex items-start gap-2">
          <i className="fas fa-exclamation-circle text-red-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Web3Forms required fields */}
        <input
          type="hidden"
          name="access_key"
          value={form.web3formsKey || 'YOUR_WEB3FORMS_KEY_HERE'}
        />
        <input type="hidden" name="subject" value="New message from MSA website contact form" />
        <input type="hidden" name="from_name" value="MSA Website Contact Form" />
        <input type="hidden" name="botcheck" value="" />

        {/* Name row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {fields.firstName || 'First Name'} <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              type="text"
              required
              placeholder="John"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white text-sm transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {fields.lastName || 'Last Name'} <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              type="text"
              required
              placeholder="Doe"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white text-sm transition-all"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {fields.email || 'Email Address'} <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white text-sm transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {fields.phone || 'Phone Number'}
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+211 925 784 075"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white text-sm transition-all"
            />
          </div>
        </div>

        {/* Organization */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {fields.organization || 'Organization (optional)'}
          </label>
          <input
            name="organization"
            type="text"
            placeholder="Your organization or company"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white text-sm transition-all"
          />
        </div>

        {/* Interest */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {fields.interest || "I'm interested in"} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="interest"
              required
              defaultValue=""
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white text-sm appearance-none cursor-pointer pr-10 text-gray-700 transition-all"
            >
              <option value="" disabled>
                Select a topic...
              </option>
              {interestOptions.map((o, i) => (
                <option key={i} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {fields.subject || 'Subject'}
          </label>
          <input
            name="subject"
            type="text"
            placeholder="Brief subject of your message"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white text-sm transition-all"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {fields.message || 'Your Message'} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows={5}
            required
            placeholder={fields.messagePlaceholder || "Tell us how you'd like to contribute..."}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none bg-white resize-none text-sm transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full btn-primary py-4 rounded-xl font-bold text-base justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-3" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>{form.submitText || 'Send Message'}</span>
              <i className="fas fa-paper-plane ml-3" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center leading-relaxed">
          <i className="fas fa-lock mr-1.5" />
          Your information is kept private and never shared.
        </p>
      </form>
    </div>
  );
}