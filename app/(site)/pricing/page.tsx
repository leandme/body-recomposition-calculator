import { Metadata } from "next";

const title = "Pricing";
const description = "Pricing details for Body Recomposition Calculator.";

export const metadata: Metadata = {
  title,
  description,
};

export default function PricingPage() {
  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center mt-10 gap-6 max-w-3xl text-center px-4">
        <h1 className="text-xl lg:text-4xl font-bold">Simple Pricing</h1>
        <p className="py-2 text-lg">
          Body Recomposition Calculator is currently free to use. Enter your stats, choose your
          strategy, and get your daily targets instantly.
        </p>
      </div>
    </div>
  );
}
