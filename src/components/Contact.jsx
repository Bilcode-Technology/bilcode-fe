const Contact = () => {
  return (
    <section className="bg-white py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] max-w-5xl">
            Ready to take the leap? Let's discuss your next digital transformation project.
          </h2>
          <div className="flex items-center gap-2">
            <a href="mailto:info@bilcode.id" className="inline-flex items-center bg-blue-600 text-white font-semibold text-sm px-5 py-3 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Contact Us</a>
            <a
              href="https://api.whatsapp.com/send/?phone=6285128004772&text&type=phone_number&app_absent=0"
              className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="WhatsApp quick contact"
            >
              ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;