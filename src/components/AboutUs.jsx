import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const valuesRef = useRef(null);

  const coreValues = [
    { icon: '💡', title: 'Innovation', description: 'We constantly push boundaries to deliver cutting-edge solutions that drive progress.' },
    { icon: '⭐', title: 'Quality', description: 'Excellence is our standard. We deliver superior results that exceed expectations.' },
    { icon: '🤝', title: 'Collaboration', description: 'Together we achieve more. We believe in the power of teamwork and partnership.' },
    { icon: '🛡️', title: 'Integrity', description: 'Honesty and transparency guide every decision we make and relationship we build.' },
    { icon: '🎯', title: 'Customer Success', description: 'Your success is our mission. We are committed to delivering value that matters.' },
    { icon: '🚀', title: 'Growth', description: 'We embrace continuous learning and improvement to stay ahead of the curve.' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const values = valuesRef.current;
    if (!section || !image || !text || !values) return;

    // Initial states
    gsap.set(image, { x: -100, opacity: 0 });
    gsap.set(text.children, { x: 100, opacity: 0 });
    gsap.set(values.children, { y: 50, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(image, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to(text.children, { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.5')
      .to(values.children, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3');

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      {/* Abstract shapes */}


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div ref={imageRef} className="relative order-1 lg:order-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Our Team"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={textRef} className="space-y-8 order-2 lg:order-none">
            {/* Title */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#2E7D32] mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                About Us
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-[18px] text-gray-700" style={{ lineHeight: '1.8' }}>
                We are a passionate team of innovators, creators, and problem-solvers dedicated to transforming ideas into reality. With years of experience and a commitment to excellence, we help businesses navigate the digital landscape and achieve their goals.
              </p>
              <p className="text-[18px] text-gray-700" style={{ lineHeight: '1.8' }}>
                Our journey began with a simple belief: that technology should empower people and businesses to reach their full potential. Today, we continue to push boundaries, embrace challenges, and deliver solutions that make a real difference.
              </p>
            </div>

            {/* Core Values Section */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Our Core Values
              </h3>

              <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {value.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#2E7D32] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {value.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;