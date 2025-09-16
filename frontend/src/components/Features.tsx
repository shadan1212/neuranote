import {
  Lightbulb,
  BrainCircuit,
  Code,
  Search,
  Cloud,
  GitMerge,
  Library,
  Sparkles,
  Lock,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Library className="h-6 w-6 text-indigo-600" />,
    title: "Capture Everything",
    description:
      "Save articles, videos, tweets, and notes in one unified library.",
    gradient: "from-indigo-100 to-white",
  },

  {
    icon: <Sparkles className="h-6 w-6 text-amber-600" />,
    title: "AI Conversations",
    description:
      "Ask questions in natural language to get answers from your content.",
    gradient: "from-amber-100 to-white",
  },
  {
    icon: <GitMerge className="h-6 w-6 text-emerald-600" />,
    title: "Uncover Connections",
    description:
      "Discover links and themes between your notes with AI assistance.",
    gradient: "from-emerald-100 to-white",
  },
  {
    icon: <Cloud className="h-6 w-6 text-rose-600" />,
    title: "Always In Sync",
    description:
      "Access your knowledge on any device. Everything stays up-to-date.",
    gradient: "from-rose-100 to-white",
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-sky-600" />,
    title: "Intelligent Processing",
    description:
      "Content is auto-analyzed, making it instantly searchable by the AI.",
    gradient: "from-sky-100 to-white",
  },
  {
    icon: <Lock className="h-6 w-6 text-slate-600" />,
    title: "Private & Secure",
    description:
      "All your content and AI conversations are encrypted and confidential.",
    gradient: "from-slate-100 to-white",
  },
];

const Features = () => {
  return (
    <section className="font-mono bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Why Second Brain?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Everything you need to think clearly, capture fast, and act
          confidently - powered by AI.
        </p>

        <div className="mx-auto mt-16 grid max-w-lg gap-8 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-gradient-to-br from-gray-200 to-gray-100 p-px shadow-lg"
            >
              {/* Actual Card Content */}
              <motion.div
                whileHover={{ y: -5 }}
                className="flex h-full flex-col gap-3 rounded-[11px] bg-white p-6"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
