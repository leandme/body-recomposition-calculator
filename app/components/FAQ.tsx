type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does the canthal tilt test work?",
    answer:
      "Upload a clear front-facing portrait and the model estimates canthal tilt, eye shape, and eye color from visible eye-region cues.",
  },
  {
    question: "How long does it take?",
    answer: "Most scans complete in under 20 seconds.",
  },
  {
    question: "What do positive, neutral, and negative canthal tilt mean?",
    answer:
      "Positive means the outer corner appears higher than the inner corner, neutral means they are close to level, and negative means the outer corner appears lower.",
  },
  {
    question: "How accurate is this tool?",
    answer:
      "It is an appearance-based estimate, not a clinical measurement. Accuracy improves with clear, front-facing photos and stable lighting.",
  },
  {
    question: "What does confidence mean?",
    answer:
      "Confidence indicates how clearly the model can detect eye landmarks in your photo. Better image quality and visible eyes generally improve confidence.",
  },
  {
    question: "Why did I get an uncertain result?",
    answer:
      "Uncertain results can happen when the eyes are blocked, blurred, closed, strongly filtered, or captured at a difficult angle.",
  },
  {
    question: "Why can my result change between photos?",
    answer:
      "Lighting, reflections, head tilt, expression, and camera distance can all change visual cues and affect the estimate.",
  },
  {
    question: "What photos should I upload?",
    answer:
      "Use a front-facing portrait where both eyes are open and unobstructed. Avoid heavy shadows, reflective glasses, and extreme head tilt.",
  },
  {
    question: "Can glasses, contacts, or makeup affect results?",
    answer:
      "Yes. Glare from glasses and heavy eye makeup can alter landmark visibility. For the most neutral estimate, use minimal reflections and lighter makeup.",
  },
  {
    question: "Can I upload a photo with multiple people?",
    answer:
      "No. For best results, use a single-person image with one clearly visible face.",
  },
  {
    question: "Can I use this for medical diagnosis?",
    answer:
      "No. This tool is for appearance-based estimation only and is not a medical or diagnostic service.",
  },
  {
    question: "Is my data safe?",
    answer:
      "We prioritize privacy and process uploads to generate your scan results. See the Privacy Policy for details on data handling.",
  },
  {
    question: "How should I compare results over time?",
    answer:
      "Keep setup consistent: similar lighting, camera distance, head position, and expression across scans.",
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
