'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const [inView, setInView] = useState(false);
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

  const experiences = [
    {
      company: 'Screenplay',
      role: 'Full Stack Developer',
      location: 'Remote',
      duration: 'Nov 2024 – Present',
      current: true,
      description: [
        'Spearheaded backend development for a cutting-edge platform empowering writers and producers to create screenplays with ease',
        'Leveraged Prose Mirror and Tiptap APIs for a rich, intuitive editor experience',
        'Designed and optimized scalable backend architectures to support real-time collaboration',
        'Collaborated closely with cross-functional teams to enhance platform features'
      ]
    },
    {
      company: 'Xbyte Solutions',
      role: 'Full Stack Developer',
      location: 'Ahmedabad, India',
      duration: 'Aug 2023 – Nov 2024',
      description: [
        'Gained extensive expertise in building scalable architectures',
        'Successfully implemented and deployed MERN stack projects on AWS',
        'Took ownership of full-stack development for internal projects',
        'Managed entire lifecycle including design, development, testing, and DevOps tasks'
      ]
    },
    {
      company: 'Simform Solutions',
      role: 'Full Stack Developer',
      location: 'Ahmedabad, India',
      duration: 'Feb 2023 – July 2023',
      description: [
        'Built user-friendly API dashboards with emphasis on security and scalability',
        'Demonstrated expertise in documentation, testing, and version control',
        'Developed 18+ responsive web applications optimized for SEO',
        'Integrated tools like Google Analytics and SEMrush to enhance performance'
      ]
    },
    {
      company: 'Impactoverse',
      role: 'Frontend Developer',
      location: 'Remote',
      duration: 'July 2021 – Dec 2022',
      description: [
        'Designed and developed visually captivating static pages using React.js',
        'Incorporated complex animations and interactive features for engaging UX',
        'Collaborated with a global team of over 100 developers',
        'Optimized performance through React state and lifecycle methods'
      ]
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`${inView ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <h2 className="heading-lg text-gray-900 mb-16">
            Work Experience
          </h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`slide-in-left ${inView ? 'animate' : ''}`}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h3 className="heading-md text-gray-900 mb-2">
                      {exp.role}
                    </h3>
                    <h4 className="text-xl font-semibold text-accent mb-4">
                      {exp.company}
                      {exp.current && (
                        <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 text-sm font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </h4>
                  </div>
                  <div className="flex flex-col md:items-end space-y-2">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} />
                      <span className="font-medium">{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={16} />
                      <span className="font-medium">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.description.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0" />
                      <p className="text-body text-gray-600">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`scale-in ${inView ? 'animate' : ''} mt-16 text-center`} style={{ transitionDelay: '0.8s' }}>
          <p className="text-body text-gray-600 mb-6">
            Ready to discuss your next project?
          </p>
          <a
            href="#contact"
            className="bg-gray-900 text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all duration-300 hover:transform hover:-translate-y-1 inline-flex items-center gap-2"
          >
            Let's Work Together
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;