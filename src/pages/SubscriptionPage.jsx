import Subscription from "../components/Subscription";

const SubscriptionPage = () => {
  return (
    <div className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Langganan</h2>
          <p className="text-lg text-gray-600 mt-2">Dapatkan update terbaru dari kami.</p>
        </div>
        <Subscription />
      </div>
    </div>
  );
};

export default SubscriptionPage;
