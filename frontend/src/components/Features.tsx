import { Lightbulb, BrainCircuit, Code, Search, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    title: "Capture Ideas Instantly",
    description: "Save notes, thoughts, and tasks in seconds with text.",
    gradient: "from-teal-100 to-white",
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-sky-600" />,
    title: "Smarter Organization",
    description:
      "Our AI understands your content and auto-organizes it contextually.",
    gradient: "from-sky-100 to-white",
  },
  {
    icon: <Code className="h-6 w-6 text-indigo-600" />,
    title: "Integrates With Everything",
    description: "Sync with your tools – Notion, Google Docs, Slack, and more.",
    gradient: "from-indigo-100 to-white",
  },
  {
    icon: <Search className="h-6 w-6 text-amber-600" />,
    title: "Powerful Semantic Search",
    description: "Find any note in an instant with natural language search.",
    gradient: "from-amber-100 to-white",
  },
  {
    icon: <Cloud className="h-6 w-6 text-rose-600" />,
    title: "Cross-Device Sync",
    description:
      "Your brain, everywhere. Seamlessly synced across all your devices.",
    gradient: "from-rose-100 to-white",
  },
  {
    icon: <Cloud className="h-6 w-6 text-rose-600" />,
    title: "Cross-Device Sync",
    description:
      "Your brain, everywhere. Seamlessly synced across all your devices.",
    gradient: "from-rose-100 to-white",
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
