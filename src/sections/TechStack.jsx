const TechStack = () => {
  const techLogos = [
    { name: "React", logo: "https://via.placeholder.com/100x50?text=React" },
    {
      name: "Node.js",
      logo: "https://via.placeholder.com/100x50?text=Node.js",
    },
    { name: "Python", logo: "https://via.placeholder.com/100x50?text=Python" },
    { name: "AWS", logo: "https://via.placeholder.com/100x50?text=AWS" },
    {
      name: "Tailwind CSS",
      logo: "https://via.placeholder.com/100x50?text=Tailwind",
    },
    {
      name: "MongoDB",
      logo: "https://via.placeholder.com/100x50?text=MongoDB",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {techLogos.map((tech, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-center"
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
