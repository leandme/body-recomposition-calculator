import { Metadata } from "next";

const title = "Contact Body Recomposition Calculator";
const description =
  "Contact Body Recomposition Calculator support for help with calorie targets, activity settings, and result interpretation.";

export const metadata: Metadata = {
  title,
  description,
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-lg mb-4">
        Need help with your body recomposition setup or daily calorie target? Reach out and we will
        help you troubleshoot quickly.
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
          <li>Your age, height, weight, and activity setup</li>
          <li>The calorie result you expected vs what you got</li>
          <li>A screenshot if the issue is visual</li>
        </ul>
      </section>
    </div>
  );
}
