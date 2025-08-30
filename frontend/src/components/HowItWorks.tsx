const HowItWorks = () => {
  return (
    <section className="font-mono bg-gradient-to-br from-white to-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          How it Works?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
          Turn your digital world into a personal, intelligent knowledge base.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-7xl">
        {/* Step 1: Capture Everything */}
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-24">
          <div className="md:order-1">
            <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              1. Effortlessly Capture Your World
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              Save everything that sparks your interest – from insightful{" "}
              <span className="text-black font-semibold">YouTube videos</span>{" "}
              and viral <span className="text-black font-semibold">Tweets</span>{" "}
              to in-depth{" "}
              <span className="text-black font-semibold">Articles</span> and
              your own raw{" "}
              <span className="text-black font-semibold">Ideas</span>. Use a
              simple form to store links or type out your thoughts, instantly
              building your personal knowledge base.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-gray-700">
              <span className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700 text-sm font-medium">
                Video Links
              </span>
              <span className="flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sky-700 text-sm font-medium">
                Tweets
              </span>
              <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 text-sm font-medium">
                Blogs & Articles
              </span>
              <span className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-purple-700 text-sm font-medium">
                Personal Notes
              </span>
            </div>
          </div>
          <div className="relative flex justify-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl border border-indigo-100">
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 max-w-xs text-left">
              <h4 className="font-semibold text-lg text-gray-800">
                New Memory
              </h4>
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="URL..."
                  className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-300 focus:border-indigo-300 pointer-events-none select-none"
                  tabIndex={-1}
                />
                <input
                  type="text"
                  placeholder="Title/Tags"
                  className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-300 focus:border-indigo-300 pointer-events-none select-none"
                  tabIndex={-1}
                />
                <textarea
                  placeholder="Description..."
                  rows={2}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-300 focus:border-indigo-300 pointer-events-none select-none"
                  tabIndex={-1}
                ></textarea>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-md">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative my-24 flex justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        </div>

        {/* Step 2: Query & Brainstorm with AI */}
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-24">
          <div className="relative flex justify-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-green-100">
            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 max-w-xs text-left">
              <h4 className="font-semibold text-lg text-gray-800">Ask AI...</h4>
              <div className="mt-4 space-y-3">
                <textarea
                  placeholder="Tell me about the video in my collections where someone explained react hooks..."
                  rows={3}
                  className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-green-300 focus:border-green-300 pointer-events-none select-none"
                  tabIndex={-1}
                ></textarea>
                <button className="w-full bg-green-600 text-white py-2 rounded-md">
                  Search / Brainstorm
                </button>
                {/* <p className="text-xs text-gray-500 mt-2">
                  "Find connections between my recent notes and that video about
                  AI."
                </p> */}
              </div>
            </div>
          </div>
          <div className="md:order-2">
            {" "}
            {/* Added md:order-2 for responsiveness */}
            <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              2. Query, Brainstorm & Recall with AI
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              Never lose an idea again. Effortlessly{" "}
              <span className="text-black font-semibold">
                recall past content
              </span>{" "}
              by vaguely explaining what you remember. Brainstorm new concepts
              using your stored knowledge, and let AI help you explore and
              expand on your ideas, making connections you might have missed.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700 text-base">
              <li className="flex items-start gap-3">
                <span>
                  Recall: Describe a video you saw months ago, and SecBrain
                  finds it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span>
                  AI Brainstorming: Generate new ideas based on your accumulated
                  insights.
                </span>
              </li>
              <li>
                <span>
                  Contextual Connections: Uncover relationships between
                  seemingly unrelated notes.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
