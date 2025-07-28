const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your vision, goals, and requirements to create a detailed project roadmap.',
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      description: 'Crafting intuitive user interfaces and experiences, followed by interactive prototypes for your review.',
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'Bringing the design to life with clean, efficient code and rigorous testing to ensure quality.',
    },
    {
      number: '04',
      title: 'Deployment & Support',
      description: 'Launching your solution and providing ongoing support and maintenance to ensure smooth operation.',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">{step.number}</div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;