'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Calendar, Code } from 'lucide-react';

const Projects = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), 200);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Gleemeet',
      subtitle: 'Dating Application',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      description: 'Full-stack dating application built with Next.js and modern web technologies. Features server-side rendering, responsive design, and seamless user experience with advanced matching algorithms.',
      technologies: ['Next.js', 'Tailwind CSS', 'AWS', 'Node.js', 'Redux'],
      highlights: [
        'Leveraged Next.js for server-side rendering and static site generation',
        'Used Tailwind CSS for responsive UI design',
        'Implemented Redux for centralized state management',
        'Deployed on AWS for scalable performance'
      ],
      links: {
        demo: '#',
        github: '#'
      },
      year: '2024'
    },
    {
      title: 'Screenplay Scriptwriter',
      subtitle: 'Creative Writing Platform',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      description: 'Advanced scriptwriting platform for writers and producers with real-time collaboration features, rich text editing, and cloud synchronization capabilities.',
      technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux'],
      highlights: [
        'Built with React.js and AWS CloudFront for global reach',
        'Responsive and visually appealing design with Tailwind CSS',
        'Efficient centralized state management using Redux',
        'Real-time collaboration features for writing teams'
      ],
      links: {
        demo: '#',
        github: '#'
      },
      year: '2024'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`${inView ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <h2 className="heading-lg text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-body text-gray-600 mb-16 max-w-3xl">
            A selection of projects that showcase my expertise in full-stack development, 
            from dating applications to creative writing platforms.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${inView ? 'scale-in animate' : 'scale-in'}`}
              style={{ transitionDelay: `${0.2 + index * 0.2}s` }}
            >
              <div className="bg-white border border-gray-200 hover-lift overflow-hidden">
                {/* Project Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover-scale"
                  />
                </div>

                {/* Project Content */}
                <div className="p-8">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="heading-md text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-accent font-semibold text-lg">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} />
                      <span className="font-medium">{project.year}</span>
                    </div>
                  </div>

                  <p className="text-body text-gray-600 mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Code size={20} className="text-accent" />
                      <h4 className="font-semibold text-gray-900">Technologies</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 text-gray-700 px-3 py-1 text-sm font-medium border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Highlights</h4>
                    <div className="space-y-3">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0" />
                          <p className="text-gray-600">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={project.links.demo}
                      className="button-primary flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} />
                      View Demo
                    </a>
                    <a
                      href={project.links.github}
                      className="button-secondary flex items-center justify-center gap-2"
                    >
                      <Github size={18} />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`${inView ? 'fade-in-up animate' : 'fade-in-up'} text-center mt-16`} style={{ transitionDelay: '0.6s' }}>
          <div className="bg-white p-8 border border-gray-200 hover-lift">
            <h3 className="heading-md text-gray-900 mb-4">
              Want to See More?
            </h3>
            <p className="text-body text-gray-600 mb-6">
              Check out my GitHub for more projects and open-source contributions.
            </p>
            <a
              href="https://github.com/abhishekvaghela"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary inline-flex items-center gap-2"
            >
              <Github size={20} />
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;