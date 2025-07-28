const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg text-gray-700 mb-4">
              We are a passionate team of software engineers dedicated to crafting innovative and high-quality digital solutions. Our mission is to empower businesses with technology that drives growth and efficiency.
            </p>
            <p className="text-lg text-gray-700">
              With years of experience and a commitment to excellence, we transform complex challenges into elegant, user-friendly applications.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Core Values</h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>Innovation: Continuously exploring new technologies and ideas.</li>
              <li>Quality: Delivering robust, reliable, and maintainable software.</li>
              <li>Collaboration: Working closely with clients to achieve shared goals.</li>
              <li>Integrity: Operating with honesty and transparency.</li>
              <li>Customer Success: Prioritizing our clients' growth and satisfaction.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;