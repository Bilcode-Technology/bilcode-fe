const Testimonials = () => {
  const testimonials = [
    {
      quote: '"Bilcode-fe transformed our ideas into a stunning and highly functional website. Their attention to detail and professionalism were outstanding!"',
      name: 'Jane Doe, CEO of Tech Solutions',
    },
    {
      quote: '"The team at Bilcode-fe delivered an exceptional mobile application that exceeded our expectations. Highly recommend their services!"',
      name: 'John Smith, Founder of Innovate App',
    },
    {
      quote: '"Their expertise in cloud solutions helped us scale our infrastructure seamlessly. A truly reliable and skilled partner."',
      name: 'Emily White, CTO of Cloud Innovations',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
              <p className="text-lg italic text-gray-700 mb-4">{testimonial.quote}</p>
              <p className="text-md font-semibold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;