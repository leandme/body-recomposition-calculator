import { Metadata } from "next";

const title = "About";
const description =
  "Learn what Body Recomposition Calculator does, how calorie targets are estimated, and how to use results responsibly.";

export const metadata: Metadata = {
  title,
  description,
};

export default function AboutPage() {
  return (
    <div className="hero min-h-screen flex mt-10 items-center justify-center">
      <div className="flex flex-col items-center gap-10 px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-center">About</h1>

        <div className="prose prose-invert max-w-3xl text-center lg:text-left">
          <p className="text-lg">
            Body Recomposition Calculator is a free tool built to help you balance fat loss and
            muscle gain with practical daily calorie and macro targets.
          </p>

          <h2>Why this tool exists</h2>
          <p className="text-lg">
            Most people trying to recomp either cut too aggressively or eat too much to stay lean.
            This calculator gives you a realistic starting point around maintenance so you can make
            smaller, smarter adjustments.
          </p>

          <h2>How the estimate works (high level)</h2>
          <p className="text-lg">
            The calculator uses your age, sex, height, weight, and activity level to estimate BMR
            and maintenance calories. It then applies your selected adjustment to generate:
          </p>
          <ul className="text-lg">
            <li>Daily recomposition calorie target</li>
            <li>Estimated daily deficit or surplus vs maintenance</li>
            <li>Suggested starting macro split (protein, carbs, fats)</li>
          </ul>

          <h2>How to use your results</h2>
          <ul className="text-lg">
            <li>Run the target for 2-3 weeks before making major changes</li>
            <li>Track weekly body-weight trend and training performance together</li>
            <li>Adjust by about 100-150 kcal if progress stalls or shifts too fast</li>
            <li>Keep protein intake and resistance training consistent</li>
          </ul>

          <h2>Accuracy and limitations</h2>
          <p className="text-lg">
            This is a planning estimate, not a guarantee. Real calorie needs vary by non-exercise
            activity, sleep, stress, training volume, and adherence.
          </p>
          <ul className="text-lg">
            <li>Treat this as a baseline, then personalize from real data</li>
            <li>Use weekly trends, not single-day scale changes</li>
            <li>Consult a professional for medical nutrition therapy</li>
          </ul>

          <h2>Who should use this tool</h2>
          <ul className="text-lg">
            <li>Lifters aiming to lose fat while preserving or gaining muscle</li>
            <li>People returning from long cuts or bulks who want a middle-ground strategy</li>
            <li>Anyone who wants a structured starting target before meal planning</li>
          </ul>

          <h2 id="founder">About the Founder</h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center border gap-6 rounded-2xl p-6 bg-white">
            <img
              src="/profiles/matt-phelps.jpeg"
              alt="Matt Phelps"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-center sm:text-left">
              <div className="flex items-baseline justify-center sm:justify-start gap-3">
                <p className="text-lg font-bold">Matt Phelps</p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/in/matt-phelps/"
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-[#0A66C2] hover:opacity-80 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 relative top-[1px]">
                      <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.9h4.56V24H.22V8.9zM8.9 8.9h4.37v2.06h.06c.61-1.15 2.1-2.37 4.33-2.37 4.63 0 5.48 3.05 5.48 7.01V24h-4.56v-6.93c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.79-2.65 3.64V24H8.9V8.9z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@mgphelps"
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label="YouTube"
                    className="text-[#FF0000] hover:opacity-80 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 relative top-[4px]">
                      <path d="M23.5 6.2s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C16.9 2.5 12 2.5 12 2.5h-.01s-4.9 0-8.19.34c-.46.05-1.46.06-2.36 1-.71.72-.94 2.36-.94 2.36S0 8.14 0 10.1v1.8c0 1.96.5 3.9.5 3.9s.23 1.64.94 2.36c.9.94 2.08.91 2.6 1.01 1.89.18 7.96.34 7.96.34s4.9-.01 8.19-.35c.46-.05 1.46-.06 2.36-1 .71-.72.94-2.36.94-2.36s.5-1.94.5-3.9v-1.8c0-1.96-.5-3.9-.5-3.9zM9.75 14.65V7.55l6.25 3.55-6.25 3.55z" />
                    </svg>
                  </a>
                </div>
              </div>
              <p className="text-gray-500 mt-1">
                Independent product builder focused on practical fitness and nutrition tools.
              </p>
            </div>
          </div>

          <h2>Contact</h2>
          <p className="text-lg mb-12">
            Have questions or feedback? Reach us at{" "}
            <a href="mailto:matt@leandme.com" className="text-primary">
              matt@leandme.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
