import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
const faqs = [
  {
    question: "What is Swifternships?",
    answer:
      "Swifternships is a unique service that connects Northwestern students with local businesses and startups, providing them with short-term, unpaid internship opportunities. The platform aims to provide students with meaningful professional experience and to help businesses and startups find talented students to help them grow.",
  },
  {
    question: "Why should I join a micro-internship?",
    answer:
      "Micro-internships are a great way to gain practical work experience and enhance your resume. They are also a great way to explore different career paths and industries, and to build your professional network.",
  },
  {
    question: "Who is eligible to apply for micro-internships?",
    answer:
      "All currently enrolled Northwestern students, regardless of their major, are eligible to apply for micro-internships through the platform.",
  },
  {
    question: "How long do micro-internships last?",
    answer:
      "Micro-internships typically last from one week to one month, depending on the project requirements and the student's availability.",
  },
  {
    question: "How competitive are micro-internships?",
    answer:
      "The competitiveness of each micro-internship varies depending on the number of applicants and the specific skills required for the position. However, the platform aims to provide ample opportunities for students to gain professional experience.",
  },
  {
    question: "How can I make the most of my micro-internship experience?",
    answer:
      "To maximize your micro-internship experience, be proactive in asking questions, seeking feedback, and taking on new tasks. Communicate openly with your supervisor and co-workers to build relationships and develop your professional network.",
  },
];

export default function FAQs() {
  return (
    <div className="bg-white" id="faq">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
