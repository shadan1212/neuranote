import dashboardImge from "../assets/dashboard.png";

const DashboardSS = () => {
  return (
    <section className="font-mono bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          See the Second Brain in Action
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
          A glimpse into your personalized knowledge hub, powered by AI.
        </p>
      </div>

      {/* Dashboard Screenshot Container */}
      <div className="mx-auto mt-16 max-w-7xl px-4">
        <div
          className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl"
          style={{ paddingTop: "56.25%" }} // 16:9 Aspect Ratio (9 / 16 * 100)
        >
          <img
            src={dashboardImge}
            alt="SecBrain Dashboard Screenshot"
            className="absolute left-0 top-0 h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardSS;
