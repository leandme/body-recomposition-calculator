type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does this bulking calorie calculator work?",
    answer:
      "It estimates BMR from your body stats, applies an activity multiplier for maintenance, then adds your chosen surplus to produce a bulking target.",
  },
  {
    question: "How accurate is the result?",
    answer:
      "It is a strong starting estimate, not a guarantee. Real-world needs vary based on training volume, NEAT, sleep, and tracking consistency.",
  },
  {
    question: "How much surplus should I use?",
    answer:
      "Most lifters do well with 5-10% above maintenance. Use 5% for leaner gains, 10% for faster progress, and 15% only if you tolerate faster fat gain.",
  },
  {
    question: "How fast should body weight increase while bulking?",
    answer:
      "A common target is roughly 0.25-0.5% of body weight per week. Beginners can often push slightly faster than advanced lifters.",
  },
  {
    question: "When should I adjust calories?",
    answer:
      "Check your 2-3 week trend. If weight is rising too slowly, add 100-150 kcal/day. If it is rising too fast, reduce by 100-150 kcal/day.",
  },
  {
    question: "How should I use the macro split?",
    answer:
      "Treat it as a baseline. Keep protein stable, set fats at a healthy minimum, and let carbs scale with training demand and appetite.",
  },
  {
    question: "Can I use this for cutting?",
    answer:
      "This page is tuned for bulking. For cutting, use a calorie deficit calculator and monitor weekly trend changes the same way.",
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
