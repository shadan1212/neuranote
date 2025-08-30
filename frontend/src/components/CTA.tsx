import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="font-mono bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 px-6 py-20 text-center shadow-xl sm:px-16">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 max-w-full mx-auto overflow-hidden">
              <div className="absolute -left-56 -top-40 w-[80rem] h-[80rem] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/30 via-gray-900 to-gray-900"></div>
            </div>
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Build Your Second Brain?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-gray-300">
              Stop losing brilliant ideas. Start capturing, connecting, and
              creating with the power of AI today.
            </p>

            <a
              href="#" // Make sure this path is correct for your app's routing
              className="mt-10 inline-flex items-center gap-3 rounded-lg bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:bg-emerald-600 hover:scale-105 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Start for Free
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
