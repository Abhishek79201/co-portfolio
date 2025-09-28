'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Github, Linkedin, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:vaghelaabhishek2580@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'vaghelaabhishek2580@gmail.com',
      href: 'mailto:vaghelaabhishek2580@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+91 8200394360',
      href: 'tel:+918200394360'
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: 'abhishekvaghela',
      href: 'https://github.com/abhishekvaghela'
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'abhishekvaghela',
      href: 'https://linkedin.com/in/abhishekvaghela'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'India',
      href: null
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`${inView ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <h2 className="heading-lg text-gray-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-body text-gray-600 mb-16 max-w-3xl">
            Ready to bring your ideas to life? Let's discuss your next project and 
            create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className={`slide-in-left ${inView ? 'animate' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <h3 className="heading-md text-gray-900 mb-8">
              Get In Touch
            </h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <div key={index} className={`flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 scale-in ${inView ? 'animate' : ''}`} style={{ transitionDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="text-blue-600 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-6 bg-green-50 border border-green-200 hover:shadow-lg transition-all duration-300 scale-in ${inView ? 'animate' : ''}`} style={{ transitionDelay: '0.8s' }}>
              <h4 className="font-semibold text-gray-900 mb-3">Availability</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-700">Available for new projects</span>
              </div>
              <p className="text-gray-600">
                Open to freelance projects, full-time opportunities, and exciting collaborations.
                Response time: Usually within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`slide-in-right ${inView ? 'animate' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-semibold text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-semibold text-gray-900 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-300"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-4 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none transition-colors duration-300"
                  placeholder="Tell me about your project, requirements, or just say hello!"
                />
              </div>

              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all duration-300 hover:transform hover:-translate-y-1 w-full flex items-center justify-center gap-3"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className={`fade-in-up ${inView ? 'animate' : ''} text-center mt-24 pt-12 border-t border-gray-200`} style={{ transitionDelay: '1s' }}>
          <p className="text-gray-500 mb-2">
            Built with Next.js, Tailwind CSS, and lots of ☕
          </p>
          <p className="text-gray-500">
            © 2024 Abhishek Vaghela. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;