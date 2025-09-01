import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Portfolio from "../sections/Portfolio";
import OurTeam from "../sections/OurTeam";
import Testimonials from "../../../components/Testimonials";
import Contact from "../sections/Contact";

const LandingPage = () => {
  return (
    <main className="relative z-20">
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="team">
        <OurTeam />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default LandingPage;
