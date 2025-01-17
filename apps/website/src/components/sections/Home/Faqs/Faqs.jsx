import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui";
import Blobs from "src/assets/blobs";

const faqs = [
  {
    question: "Can I learn for free?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Euismod ac id in placerat et massa massa est egestas",
  },
  {
    question: "When will the app be available?",
    answer:
      "We’re working harder than a barista during morning rush hour to get this app out. Keep your eyes peeled—Aralects is coming soon to revolutionize how you learn Arabic! Hint: signing up for our updates means you’ll know first 😉",
  },
  {
    question: "What dialects can I learn with Aralects?",
    answer:
      "We’ve got the big four covered: Egyptian (think ya habibi!), Levantine (the smooth operator), Gulf (hello, Khaleeji charm!), and Maghrebi (the mystery dialect with a French twist). We’ll start with broad regional vibes and then dive deeper into each country’s unique flavor over time.",
  },
  {
    question: "Will Aralects help me with both spoken and written Arabic?",
    answer: "",
  },
  {
    question: "What makes Aralects different from other Arabic learning apps?",
    answer: "",
  },
  {
    question: "Can I access Aralects on multiple devices?",
    answer:
      "For now, we’re all about that mobile life. Your phone will be your Arabic dojo—convenient, portable, and always with you. Multi-device? It’s on our radar for the future.",
  },
  {
    question: "Do I need to know any Arabic to start using Aralects?",
    answer:
      "Nope! Whether you’re a complete newbie who can’t tell alif from baa, or a native speaker looking to explore another dialect, Aralects will be here for everyone.",
  },
];

const FAQs = () => {
  return (
    <section className="relative m-auto px-5 py-[60px] text-gray-900 md:w-[90%] md:px-20 md:py-[90px]">
      <Blobs
        filled={false}
        className="absolute left-32 top-16 -z-[1] hidden origin-top-left rotate-90 opacity-15 md:block"
      />
      {/* FAQ Header */}
      <h2 className="font-SpaceGrotesk text-start text-2xl font-bold text-gray-700 md:text-5xl">
        FAQs
      </h2>

      {/* FAQ Items */}
      <Accordion
        type="single"
        collapsible
        className="mt-10 grid grid-cols-1 gap-y-2"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={faq.question}
            className="border-gray-300 pb-2"
          >
            <AccordionTrigger className="hover:no-underline [&[data-state=open]>h3]:text-purple-600">
              <h3 className="font-SpaceGrotesk text-left text-lg font-bold text-gray-900 transition-colors duration-200 hover:text-purple-600 md:text-xl">
                {faq.question}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="font-SpaceGrotesk mt-2 text-gray-700 md:text-xl">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQs;
