import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Will the app be free?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Euismod ac id in placerat et massa massa est egestas',
    },
    {
      question: 'When will the app be available?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Eget interdum eget morbi nec morbi lorem. Et cursus erat eget euismod faucibus. Mauris pellentesque id amet blandit vulputate vitae lectus. Accumsan proin at nunc ornare id auctor aliquam.',
    },
    {
      question: 'What dialects can I learn with Aralects?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Euismod ac id in placerat et massa massa est egestas.',
    },
    {
      question: 'Will Aralects help me with both spoken and written Arabic?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Euismod ac id in placerat et massa massa est egestas',
    },
    {
      question: 'What dialects can I learn with Aralects?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Euismod ac id in placerat et massa massa est egestas',
    },
    {
      question: 'Will Aralects help me with both spoken and written Arabic?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Euismod ac id in placerat et massa massa est egestas',
    },
  ];

  return (
    <section className="bg-white w-full text-gray-900 px-5 relative md:px-20 py-12">
      <img src="/images/faqbgimage.png" alt="faq-bg-image" className=' absolute -left-5 top-[100px]'/>
      {/* FAQ Header */}
      <div className="text-start">
        <h2 className="text-3xl md:text-4xl text-gray-700 font-SpaceGrotesk font-bold">FAQs</h2>
      </div>

      {/* FAQ Items */}
      <div className="grid grid-cols-1 max-h-[500px] overflow-y-auto mt-10 md:grid-cols-2 gap-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b w-[90%] border-gray-300 pb-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3
                className={`text-lg font-semibold text-gray-700 font-SpaceGrotesk transition-colors duration-200 ${
                  openIndex === index ? 'text-purple-600' : 'text-gray-900'
                }`}
              >
                {faq.question}
              </h3>
              <span className="text-xl font-bold">
                {openIndex === index ? '↑' : '↓'}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-4 text-gray-700 font-SpaceGrotesk">
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
