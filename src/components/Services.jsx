import {
  Brain,
  Component,
  GraduationCap,
  Monitor,
  Smartphone,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const serviceItems = [
  {
    icon: <Monitor size={32} />,
    video: (
      <DotLottieReact
        src="https://lottie.host/60a77df1-2ef2-49bf-98b0-5fd9f058e45d/fa5TUroMa4.lottie"
        loop
        autoplay
        muted
        className="w-full h-full object-cover"
      />
    ),
    headline: "Website Cepat & Modern",
    title: "Web Development",
    description:
      "Layanan pengembangan website modern, responsif, dan SEO-friendly untuk meningkatkan visibilitas bisnis Anda di dunia digital.",
  },
  {
    icon: <Smartphone size={32} />,
    video: (
      <DotLottieReact
        src="https://lottie.host/3050560d-7771-4945-b09f-6cbe359fbade/v750Q8Wn36.lottie"
        loop
        autoplay
        muted
        className="w-full h-full object-cover"
      />
    ),
    headline: "Aplikasi Android & iOS",
    title: "Mobile Development",
    description:
      "Membangun aplikasi mobile Android & iOS dengan performa tinggi, desain intuitif, dan fitur sesuai kebutuhan bisnis Anda.",
  },
  {
    icon: <Component size={32} />,
    video: (
      <DotLottieReact
        src="https://lottie.host/5306a9f8-7f09-404b-b8e5-f210f3e8c2ec/SVx2MxnLmo.lottie"
        loop
        autoplay
        muted
        className="w-full h-full object-cover"
      />
    ),
    headline: "Desain Kreatif & Interaktif",
    title: "UI/UX Design",
    description:
      "Desain antarmuka dan pengalaman pengguna yang kreatif, interaktif, dan mudah digunakan untuk meningkatkan kepuasan pelanggan.",
  },
  {
    icon: <Brain size={32} />,
    video: (
      <DotLottieReact
        src="https://lottie.host/bf557620-11ba-4d98-8321-f45cb67077ac/ghJFJnpAEm.lottie"
        loop
        autoplay
        muted
        className="w-full h-full object-cover"
      />
    ),
    headline: "AI & Otomasi Bisnis",
    title: "AI & Automation",
    description:
      "Solusi kecerdasan buatan dan otomasi untuk mempercepat proses bisnis, mengurangi biaya operasional, dan meningkatkan produktivitas.",
  },
  {
    icon: <GraduationCap size={32} />,
    video: (
      <DotLottieReact
        src="https://lottie.host/e5b60937-506b-4b32-82f8-c130a4fe6202/sQIyeg3jId.lottie"
        loop
        autoplay
        muted
        className="w-full h-full object-cover"
      />
    ),
    headline: "Belajar IT Terkini",
    title: "IT Academy",
    description:
      "Program pelatihan IT profesional dengan kurikulum terkini untuk membekali Anda dengan keterampilan digital yang dibutuhkan di industri.",
  },
];

const Services = () => {
  return (
    <section className="min-h-screen md:mb-20 flex items-center bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center md:justify-center gap-4 md:gap-6`}>
          {serviceItems.map((service, index) => (
            <div key={index}>
              <div className="group flex flex-col gap-4 justify-end text-gray-500 bg-[#f8f9fa] p-8 rounded-2xl w-[180px] h-[400px] hover:w-[452px] hover:h-[75vh] transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                <div className="block group-hover:hidden transition-opacity duration-300">
                  {service.icon}
                </div>
                <div className="opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 hidden group-hover:block aspect-video rounded-lg overflow-hidden transition-all duration-500 ease-out">
                  {/* <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  >
                    <source src="/sample-video.mp4" type="video/mp4" />
                  </video> */}
                  {service.video}
                </div>

                <h3 className="uppercase font-medium h-12 group-hover:h-auto transition-all duration-300">
                  {service.title}
                </h3>
                <div className="hidden group-hover:block space-y-3">
                  <h1 className="opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 hidden group-hover:block capitalize text-[42px] leading-tight text-blue-600 transition-all duration-500 delay-100 ease-out">
                    {service.headline}
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
