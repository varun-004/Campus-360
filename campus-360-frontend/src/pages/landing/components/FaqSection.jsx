import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Who can create an account on Campus 360?",
    answer:
      "Students and Teachers can register directly through our public registration portal by selecting their respective role (STUDENT or TEACHER). To ensure governance and data security, Administrator accounts are provisioned internally by institutional system administrators.",
  },
  {
    question: "How does the attendance roll call workflow operate?",
    answer:
      "Instructors select any course assigned to them and conduct roll call by toggling students as Present, Late, or Absent. When submitted, attendance rates update immediately in the database and reflect in real time on student dashboards and institutional reports.",
  },
  {
    question: "What powers the AI Academic Risk Analysis?",
    answer:
      "Campus 360 utilizes a trained machine learning ensemble model that evaluates correlations between classroom attendance frequency and assessment test scores. The model classifies students into Low, Moderate, High, or Critical risk tiers and highlights specific factors (e.g. attendance drop-offs) so mentors can intervene before finals.",
  },
  {
    question: "Can teachers edit marks and review previous submissions?",
    answer:
      "Yes. Instructors can input marks for specific assessments and review past submissions via the dedicated Marks History view. Automated calculations immediately summarize subject averages and GPA statistics without manual calculation errors.",
  },
  {
    question: "Is Campus 360 fully accessible on mobile devices and tablets?",
    answer:
      "Yes. The interface is engineered with a mobile-first, responsive design. Students can check exam results and attendance between classes on smartphones, while faculty can record roll call on tablets directly in lecture halls.",
  },
  {
    question: "How is student data kept private and secure?",
    answer:
      "All sessions are authenticated using secure JSON Web Tokens (JWT). Strict Role-Based Access Control (RBAC) ensures students only have access to their personal academic records, faculty can only manage their assigned courses, and administrative controls are isolated.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs">
            <HelpCircle className="h-3.5 w-3.5 text-brand-600" />
            Common Questions Answered
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Clear, straightforward answers about platform access, security, and supported features.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition hover:border-slate-300"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between px-6 py-4.5 text-left text-base font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-inset"
                >
                  <span className="pr-4">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-600" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="border-t border-slate-100 bg-slate-50/60 px-6 py-4 text-sm leading-relaxed text-slate-600"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
