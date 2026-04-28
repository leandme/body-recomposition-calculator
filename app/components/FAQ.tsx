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
            <div className="collapse collapse-plus bg-base-500 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg lg:text-xl">How does the canthal tilt test work?</div>
              <div className="collapse-content">
                <p className="text-lg">
                  Upload a clear front-facing portrait and the model estimates your canthal tilt,
                  primary eye shape, and eye color from visible eye-region cues.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-500 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg lg:text-xl">How long does it take?</div>
              <div className="collapse-content">
                <p className="text-lg">Most scans complete in under 20 seconds.</p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-500 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg lg:text-xl">Is it accurate?</div>
              <div className="collapse-content">
                <p className="text-lg">
                  It is an appearance-based estimate, not a clinical measurement. Results improve
                  with even lighting, straight head position, and clear eye visibility.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-500 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg lg:text-xl">What photos should I upload?</div>
              <div className="collapse-content">
                <p className="text-lg">
                  Use a front-facing portrait where both eyes are open and unobstructed. Avoid heavy
                  shadows, extreme head tilt, and reflective eyewear.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-500 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg lg:text-xl">Is my data safe?</div>
              <div className="collapse-content">
                <p className="text-lg">
                  Yes. We prioritize privacy and process uploads to generate your scan results. See
                  our Privacy Policy for details on data handling.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-500 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg lg:text-xl">I have another question...</div>
              <div className="collapse-content">
                <p className="text-lg">
                  Contact us via{" "}
                  <a href="mailto:matt@leandme.com" className="text-primary">
                    email
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
