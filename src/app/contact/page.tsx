'use client';

import DynamicTitle from '@/components/DynamicTitle';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Invalid email';
    if (!form.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', form);
      alert('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
    }
  };

  return (
    <div>
      <DynamicTitle />
      <div className="min-h-screen py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

        <div className="w-full h-100 mb-10 rounded overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9026843174487!2d90.39150957529312!3d23.75087637867796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b855aa5ef77d%3A0x10b1872d73be899!2sDhaka%20University!5e0!3m2!1sen!2sbd!4v1719674505201!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <textarea
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-md"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 font-semibold rounded-full hover:bg-blue-500 cursor-pointer"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Our Address</h2>
            <p className="flex items-start gap-2 text-gray-700">
              <MapPin className="mt-1" />
              123 Education Lane, Dhaka, Bangladesh
            </p>
            <p>
              <strong>Phone:</strong> +880 123 456 789
            </p>
            <p>
              <strong>Email:</strong> support@edunest.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
