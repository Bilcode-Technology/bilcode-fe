const Contact = () => {
  return (
    <section className="bg-white min-h-screen container mx-auto px-6 max-w-7xl flex items-center border-t border-gray-200">
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl md:text-7xl text-gray-900 leading-[1.1] font-medium">
          Ready to take the leap? Let's discuss your next digital transformation
          project.
        </h2>
        <div className="flex items-center gap-1">
          <a
            href="mailto:info@bilcode.id"
            className="inline-flex items-center bg-blue-600 text-white font-semibold text-sm px-5 py-3 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Contact Us
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=6285128004772&text&type=phone_number&app_absent=0"
            className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="WhatsApp quick contact"
          >
            ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
