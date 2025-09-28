'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Database, Server, Smartphone, Users, Coffee } from 'lucide-react';

const About = () => {
  const [inView, setInView] = useState(false);
  const [showTeamReveal, setShowTeamReveal] = useState(false);
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

  const skills = [
    {
      category: 'Frontend',
      icon: <Smartphone size={24} />,
      technologies: ['JavaScript', 'React.js', 'Redux', 'Next.js 14', 'TypeScript', 'GSAP'],
    },
    {
      category: 'Backend',
      icon: <Server size={24} />,
      technologies: ['Node.js', 'Express.js', 'TypeScript'],
    },
    {
      category: 'Database',
      icon: <Database size={24} />,
      technologies: ['MySQL', 'MongoDB', 'Firebase', 'DynamoDB', 'OpenSearch', 'Redis'],
    },
    {
      category: 'DevOps',
      icon: <Code size={24} />,
      technologies: ['Docker', 'AWS'],
    },
  ];

  const teamMembers = [
    {
      name: "Abhishek Vaghela",
      role: "Full Stack MERN Developer",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      description: "Turns coffee into code and builds digital experiences that actually work"
    },
    {
      name: "Vatsal Zinzuvadiya",
      role: "Backend Developer",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      description: "Backend wizard who makes databases dance and APIs sing"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`${inView ? 'fade-in-up animate' : 'fade-in-up'}`}>
          <h2 className="heading-lg text-gray-900 mb-16">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div className={`stagger-2 ${inView ? 'slide-in-left animate' : 'slide-in-left'}`}>
            <div className="space-y-6">
              <p className="text-body text-gray-600">
                I'm a passionate Full Stack Developer with a strong foundation in MERN stack development. 
                As a computer engineer with a deep enthusiasm for creating functional software and stunning websites, 
                I've been building and designing web applications since my third semester of college.
              </p>
              
              <p className="text-body text-gray-600">
                My professional journey includes <strong>2.5+ years of corporate experience</strong> coupled with 
                <strong> 2+ years of freelancing work</strong> since 2021. I'm committed to continuous learning 
                and staying updated with the latest technologies and best practices in the industry.
              </p>

              <p className="text-body text-gray-600">
                Currently working remotely at <strong>Screenplay</strong>, where I'm spearheading backend development 
                for a cutting-edge platform that empowers writers and producers to create screenplays with ease.
              </p>

              <div className="bg-white p-6 border border-gray-200 hover-lift">
                <h3 className="heading-md text-gray-900 mb-4">Education</h3>
                <div className="border-l-4 border-accent pl-6">
                  <p className="font-semibold text-gray-900">Government Engineering College, Modasa</p>
                  <p className="text-gray-600">Bachelor's Degree in Computer Engineering</p>
                  <p className="text-small text-gray-500">NAAC A++ | Aug 2019 - May 2023</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`stagger-3 ${inView ? 'slide-in-right animate' : 'slide-in-right'}`}>
            <h3 className="heading-md text-gray-900 mb-8">Technical Skills</h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.category} className={`bg-white p-6 border border-gray-200 hover-lift ${inView ? 'scale-in animate' : 'scale-in'}`} style={{ transitionDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-accent">
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900">{skill.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-700 px-3 py-1 text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={`fade-in-up ${inView ? 'animate' : ''}`} style={{ transitionDelay: '0.8s' }}>
          <h3 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            The Team
          </h3>

          {!showTeamReveal ? (
            <>
              <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-5xl mx-auto">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className={`bg-white p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 scale-in ${inView ? 'animate' : ''}`}
                    style={{ transitionDelay: `${1.0 + index * 0.2}s` }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                        <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowTeamReveal(true)}
                  className="border-2 border-gray-300 text-gray-900 px-8 py-4 font-medium hover:border-gray-900 transition-all duration-300 hover:transform hover:-translate-y-1 inline-flex items-center gap-3"
                >
                  <Coffee size={20} />
                  Wait... something's not quite right here 🤔
                </button>
              </div>
            </>
          ) : (
            <div className="text-center scale-in animate">
              <div className="bg-white p-12 border border-gray-200 max-w-4xl mx-auto hover:shadow-lg transition-all duration-300">
                <h4 className="text-3xl font-bold text-blue-600 mb-6">
                  Plot Twist! 🎭
                </h4>
                <p className="text-xl text-gray-600 mb-6">
                  Okay okay, it's actually just me and my homie <strong>Vatsal</strong> 😅
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We're the dynamic duo crushing full-stack applications, debugging at 3AM with energy drinks, 
                  and somehow making it look easy. No corporate BS, no endless meetings – just two devs 
                  who actually know what they're doing and have fun doing it.
                </p>
                <div className="flex items-center justify-center gap-4 text-blue-600 mb-4">
                  <Coffee size={24} />
                  <span className="text-xl font-semibold">Dynamic Duo Since 2021</span>
                  <Coffee size={24} />
                </div>
                <p className="text-gray-500">
                  (We're basically the Avengers of web development, but cooler 😎)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-xl text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-accent font-medium text-lg mb-4">{member.role}</p>
                    <p className="text-gray-600 italic">{member.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowTeamReveal(true)}
                  className="button-secondary inline-flex items-center gap-3"
                >
                  <Coffee size={20} />
                  Wait... something's not quite right here 🤔
                </button>
              </div>
            </>
          ) : (
            <div className="text-center scale-in animate">
              <div className="bg-white p-12 border border-gray-200 max-w-4xl mx-auto hover-lift">
                <h4 className="heading-md text-gray-900 mb-6 text-accent">
                  Plot Twist! 🎭
                </h4>
                <p className="text-body text-gray-600 mb-6">
                  Okay okay, it's actually just me and my homie <strong>Vatsal</strong> 😅
                </p>
                <p className="text-body text-gray-600 mb-6">
                  We're the dynamic duo crushing full-stack applications, debugging at 3AM with energy drinks, 
                  and somehow making it look easy. No corporate BS, no endless meetings – just two devs 
                  who actually know what they're doing and have fun doing it.
                </p>
                <div className="flex items-center justify-center gap-4 text-accent">
                  <Coffee size={24} />
                  <span className="font-semibold">Dynamic Duo Since 2021</span>
                  <Coffee size={24} />
                </div>
                <p className="text-small text-gray-500 mt-4">
                  (We're basically the Avengers of web development, but cooler 😎)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;