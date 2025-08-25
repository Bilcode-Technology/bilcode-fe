const Portfolio = () => {
  const projects = [
    {
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "Trust Indonesia to create Web Kandidatpro",
      date: "20 Januari 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "PLN to create web Strategy Navigation Flightdeck",
      date: "20 Januari 2025",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      partnerLabel: "WE PARTNERED WITH",
      title: "PLN to create web Strategy Navigation Flightdeck",
      date: "20 Januari 2025",
    },
  ];

  return (
    <section className="min-h-screen md:mb-20 flex items-center bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-center md:justify-start flex-wrap gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col hover:gap-4 opacity-50 hover:opacity-100 w-[300px] rounded-lg transition-all duration-300"
            >
              <div className="relative w-full h-full transition-all duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[500px] object-cover rounded-[12px]"
                />
              </div>
              <div className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-[130px] flex flex-col gap-1 transition-all duration-300">
                <span className="uppercase font-semibold text-xs text-gray-500">
                  {project.partnerLabel}
                </span>
                <h2 className="uppercase font-semibold text-lg md:text-xl">
                  {project.title}
                </h2>
                <time className="text-xs text-gray-400">{project.date}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
