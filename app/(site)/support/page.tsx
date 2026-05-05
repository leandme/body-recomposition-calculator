import { Metadata } from "next";

const title = "Support";
const description = "Support and troubleshooting for Bulking Calorie Calculator.";

export const metadata: Metadata = {
  title,
  description,
};

export default function SupportPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center mt-10 gap-6 max-w-3xl text-center px-4">
        <h2 className="text-xl lg:text-4xl font-bold">Support</h2>
        <p className="py-6 text-lg mb-6">
          Have a question or need help with your bulking targets? Reach out to our support team by
          sending an <a href="mailto:matt@leandme.com" className="text-primary">email</a> and we will
          get back to you as soon as we can.
        </p>
      </div>
    </div>
  );
}
