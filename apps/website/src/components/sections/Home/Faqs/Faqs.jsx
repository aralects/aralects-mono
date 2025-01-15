import React, { useState } from "react";

const FAQs = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndices.includes(index)) {
      // If the FAQ is already open, remove it from the openIndices array
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      // Otherwise, add it to the openIndices array
      setOpenIndices([...openIndices, index]);
    }
  };

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
      answer:
        "",
    }, {
      question: "What makes Aralects different from other Arabic learning apps?",
      answer:
        "",
    }, {
      question: "Can I access Aralects on multiple devices?",
      answer:
        "For now, we’re all about that mobile life. Your phone will be your Arabic dojo—convenient, portable, and always with you. Multi-device? It’s on our radar for the future.",
    }, {
      question: "Do I need to know any Arabic to start using Aralects?",
      answer:
        "Nope! Whether you’re a complete newbie who can’t tell alif from baa, or a native speaker looking to explore another dialect, Aralects will be here for everyone.",
    },
  ];

  return (
    <section className="bg-white md:w-[90%] px-5 m-auto text-gray-900 relative md:px-20 py-12">
      <img
        src="/images/faqbgimage.png"
        alt="faq-bg-image"
        className="absolute -left-5 hidden md:block top-[100px]"
      />
      {/* FAQ Header */}
      <div className="text-start">
        <h2 className="text-[24px] md:text-[72px] text-gray-700 md:py-4 mt-8 font-SpaceGrotesk font-bold">
          FAQs
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="grid grid-cols-1 mt-10 gap-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3
                className={`text-[17px] md:text-[24px] font-semibold text-gray-700 font-SpaceGrotesk transition-colors duration-200 ${
                  openIndices.includes(index) ? "text-purple-600" : "text-gray-900"
                }`}
              >
                {faq.question}
              </h3>
              <span className="text-xl font-bold">
                {openIndices.includes(index) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-up"
                  >
                    <path d="M8 6L12 2L16 6" />
                    <path d="M12 2V22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-down"
                  >
                    <path d="M8 18L12 22L16 18" />
                    <path d="M12 2V22" />
                  </svg>
                )}
              </span>
            </div>
            {openIndices.includes(index) && (
              <p className="mt-4 text-gray-700 text-[14px] md:text-[20px] font-SpaceGrotesk">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
