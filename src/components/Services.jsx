const Services = () => {
  const serviceItems = [
    {
      icon: '💡',
      title: 'Web Development',
      description: 'Building responsive and high-performance web applications.',
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Creating intuitive and engaging mobile experiences for iOS and Android.',
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Leveraging cloud technologies for scalable and secure infrastructure.',
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Transforming raw data into actionable insights.',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceItems.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;