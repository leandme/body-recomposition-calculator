import { Metadata } from "next";
import { Suspense } from "react";
import BodyRecompositionCalculatorTool from "../components/BodyRecompositionCalculatorTool";

const title = "Body Recomposition Calculator";
const description =
  "Estimate maintenance calories, choose a small deficit or surplus, and get macro targets for a practical body recomposition plan.";

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
      <BodyRecompositionCalculatorTool />
    </Suspense>
  );
}
