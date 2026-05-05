"use client";

import UploadDropzone from "../UploadDropZone";
import ReviewBox from "../ReviewBox";

export default function Hero() {
  return (
    <div className="hero min-h-screen -mt-40 flex items-center justify-center">
      <div className="hero-content flex flex-col lg:flex-row items-center gap-24 lg:gap-24">
        <img
          src="/tools/height-estimator/height-example-1.jpg"
          className="w-64 lg:w-80 rounded-lg shadow-xl"
          alt="Body recomposition planning example"
        />
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-4xl font-bold">Body Recomposition Calculator</h1>
          <p className="py-6">Set your strategy and get daily calories plus macro guidance.</p>
          <UploadDropzone />
        </div>
      </div>
      <ReviewBox />
    </div>
  );
}
