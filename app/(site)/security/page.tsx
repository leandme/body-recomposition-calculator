import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Policy - Body Recomposition Calculator",
  description: "Security practices and data-protection approach for Body Recomposition Calculator.",
};

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Security Policy</h1>
      <p className="text-lg mb-4">
        Protecting your data is important to us. This page outlines how Body Recomposition Calculator
        approaches security and data protection.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Transport Security</h2>
        <p>
          Traffic to and from Body Recomposition Calculator is intended to be served over HTTPS using
          modern TLS standards provided by our hosting infrastructure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Operational Security</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access controls for service infrastructure.</li>
          <li>Monitoring for reliability, abuse, and anomalous activity.</li>
          <li>Ongoing updates to dependencies and runtime components.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Responsible Use</h2>
        <p>
          Users should avoid submitting personal health records, credentials, or other sensitive
          information in form fields.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Security Contact</h2>
        <p>
          To report a security concern, contact{" "}
          <a href="mailto:matt@leandme.com" className="text-primary hover:underline">
            matt@leandme.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
