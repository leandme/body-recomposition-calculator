type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does this body recomposition calculator work?",
    answer:
      "It estimates BMR from your stats, scales to maintenance with activity level, then applies your chosen calorie adjustment to generate a daily recomposition target.",
  },
  {
    question: "How accurate is the result?",
    answer:
      "It is a strong starting estimate, not a guarantee. Real-world needs vary based on training volume, NEAT, sleep, stress, and tracking consistency.",
  },
  {
    question: "Should I choose a deficit, maintenance, or surplus?",
    answer:
      "Use a small deficit if fat loss is the priority, maintenance for slow recomp, and a small surplus if performance and muscle gain are the priority.",
  },
  {
    question: "How fast should body weight change during recomposition?",
    answer:
      "Most recomp plans aim for slow changes. A common range is about 0-0.5% of body weight per week depending on your starting point and goal focus.",
  },
  {
    question: "When should I adjust calories?",
    answer:
      "Check your 2-3 week trend. If progress is too slow, adjust by 100-150 kcal/day in the direction of your goal and reassess.",
  },
  {
    question: "How should I use the macro split?",
    answer:
      "Treat it as a baseline. Keep protein high and consistent, keep fats at a healthy minimum, and let carbs flex with training demand.",
  },
  {
    question: "Can I use this for a pure bulk or deep cut?",
    answer:
      "You can, but this page is tuned for recomposition ranges. If your goal is an aggressive massing or cutting phase, use a dedicated bulk or deficit calculator.",
  },
  {
    question: "I still have a question. How can I contact support?",
    answer: "Email matt@leandme.com and include a brief description of your issue.",
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="hero mt-10 lg:mt-40 flex items-center justify-center bg-base-100">
      <div className="hero-content w-full px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl lg:text-4xl text-center font-bold">Frequently Asked Questions</h2>
          <p className="py-6 text-lg mb-6 text-center">
            Have another question? Reach out by sending an{" "}
            <a href="mailto:matt@leandme.com" className="text-primary">
              email
            </a>
            .
          </p>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={`${item.question}-${idx}`} className="collapse collapse-plus bg-base-500 rounded-lg">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg lg:text-xl">{item.question}</div>
                <div className="collapse-content">
                  <p className="text-lg">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
