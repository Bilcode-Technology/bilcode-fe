const Portfolio = () => {
  const projects = [
    {
      image: 'https://via.placeholder.com/300',
      title: 'Project Alpha',
      description: 'A cutting-edge web application for a fintech startup.',
    },
    {
      image: 'https://via.placeholder.com/300',
      title: 'Project Beta',
      description: 'Mobile e-commerce solution with seamless user experience.',
    },
    {
      image: 'https://via.placeholder.com/300',
      title: 'Project Gamma',
      description: 'Enterprise-level data visualization dashboard.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;