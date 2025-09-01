import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import OurTeam from "../components/OurTeam";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

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
