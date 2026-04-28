import { Metadata } from "next";
import { Suspense } from "react";
import CanthalTiltTestTool from "../components/CanthalTiltTestTool";

const title = "Canthal Tilt Test - Eye Shape Detector";
const description =
  "Upload a clear portrait to run a canthal tilt test and detect eye shape and eye color with AI.";

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
      <CanthalTiltTestTool />
    </Suspense>
  );
}
