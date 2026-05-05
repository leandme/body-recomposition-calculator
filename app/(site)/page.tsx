import { Metadata } from "next";
import { Suspense } from "react";
import BulkingCalorieCalculatorTool from "../components/BulkingCalorieCalculatorTool";

const title = "Bulking Calorie Calculator";
const description =
  "Estimate your bulking calories using BMR, activity level, and surplus target, with macro guidance for lean or aggressive gaining phases.";

export const metadata: Metadata = {
  title,
  description,
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <BulkingCalorieCalculatorTool />
    </Suspense>
  );
}
