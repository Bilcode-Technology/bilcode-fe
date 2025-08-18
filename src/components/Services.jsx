import {
  Brain,
  Component,
  GraduationCap,
  Monitor,
  Smartphone,
} from "lucide-react";

const serviceItems = [
  {
    icon: <Monitor size={32} />,
    title: "Web Development",
    description: "Gathering comprehensive datasets...",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Development",
    description: "Cleaning, processing...",
  },
  {
    icon: <Component size={32} />,
    title: "UI UX Design",
    description:
      "Data patterns are identified by machine learning models in training. They can then spot them in any unseen data or generate novel data, given a prompt.",
  },
  {
    icon: <Brain size={32} />,
    title: "AI & Automation",
    description: "Rigorous testing and validation...",
  },
  {
    icon: <GraduationCap size={32} />,
    title: "IT Academy",
    description: "Rigorous testing and validation...",
  },
];

const Services = () => {
  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-center gap-4 md:gap-6`}>
          {serviceItems.map((service, index) => (
            <div key={index}>
              <div className="group flex flex-col gap-4 justify-end text-gray-500 bg-[#f8f9fa] p-8 rounded-2xl w-[180px] h-[400px] hover:w-[452px] hover:h-[75vh] transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                <div className="block group-hover:hidden transition-opacity duration-300">
                  {service.icon}
                </div>
                <div className="opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 hidden group-hover:block aspect-video rounded-lg overflow-hidden transition-all duration-500 ease-out">
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  >
                    <source src="/sample-video.mp4" type="video/mp4" />
                  </video>
                </div>

                <h3 className="uppercase font-medium h-12 group-hover:h-auto transition-all duration-300">
                  {service.title}
                </h3>
                <div className="hidden group-hover:block space-y-3">
                  <h1 className="opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 hidden group-hover:block capitalize text-[42px] text-blue-600 transition-all duration-500 delay-100 ease-out">
                    {service.title}
                  </h1>
                  <p className="opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 hidden group-hover:block leading-relaxed transition-all duration-500 ease-out delay-200">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
