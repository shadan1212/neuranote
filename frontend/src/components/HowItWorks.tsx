import { BrainCircuit, Library, CheckCircle, Brain } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="font-mono bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Turn your digital world into a personal, intelligent knowledge base in
          two simple steps.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-7xl">
        {/* --- Step 1: Capture Everything --- */}
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-24">
          <div className="md:order-2">
            <h3 className="text-3xl font-semibold leading-tight text-gray-900">
              1. Effortlessly Capture Your World
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              Save everything that sparks your interest—from insightful{" "}
              <span className="font-semibold text-gray-800">
                YouTube videos
              </span>{" "}
              and viral{" "}
              <span className="font-semibold text-gray-800">Tweets</span> to
              in-depth{" "}
              <span className="font-semibold text-gray-800">Articles</span> and
              your own raw{" "}
              <span className="font-semibold text-gray-800">Ideas</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Video Links
              </span>
              <span className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                Tweets
              </span>
              <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                Blogs & Articles
              </span>
              <span className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                Personal Notes
              </span>
            </div>
          </div>
          {/* Replaced the dummy form with a clean icon display */}
          <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl bg-slate-50 p-8 border border-slate-200">
            <Library className="h-32 w-32 text-indigo-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* --- Separator --- */}
        <div className="my-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* --- Step 2: Query & Brainstorm with AI --- */}
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="text-3xl font-semibold leading-tight text-gray-900">
              2. Query, Brainstorm & Recall with AI
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              Never lose an idea again. Effortlessly recall past content,
              brainstorm new concepts, and let our AI help you find the
              connections you might have missed.
            </p>
            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 shrink-0 text-emerald-600" />
                <span>
                  <strong>Recall:</strong> Describe a video you saw months ago,
                  and your Second Brain finds it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 shrink-0 text-emerald-600" />
                <span>
                  <strong>Brainstorm:</strong> Generate new ideas based on your
                  accumulated insights.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 shrink-0 text-emerald-600" />
                <span>
                  <strong>Connect:</strong> Uncover relationships between
                  seemingly unrelated notes.
                </span>
              </li>
            </ul>
          </div>
          {/* Replaced the dummy form with a clean icon display */}
          <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl bg-slate-50 p-8 border border-slate-200">
            <Brain className="h-32 w-32 text-emerald-500" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
