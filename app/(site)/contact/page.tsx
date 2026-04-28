import { Metadata } from "next";

const title = "Contact Canthal Tilt Test";
const description =
  "Contact Canthal Tilt Test support for help with uploads, canthal tilt results, and eye-shape analysis questions.";

export const metadata: Metadata = {
  title,
  description,
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-lg mb-4">
        Need help with your scan, upload flow, or interpretation? Reach out and we will help you
        troubleshoot quickly.
      </p>
      <p className="text-lg mb-8">
        Email:{" "}
        <a href="mailto:matt@leandme.com" className="text-primary hover:underline">
          matt@leandme.com
        </a>
      </p>

      <section className="space-y-3 text-base lg:text-lg">
        <p>For fastest support, include:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The page you were using</li>
          <li>What happened and what you expected instead</li>
          <li>A screenshot if the issue is visual</li>
        </ul>
      </section>
    </div>
  );
}
