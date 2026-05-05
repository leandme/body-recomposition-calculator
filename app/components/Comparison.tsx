export default function Comparison() {
  return (
    <div className="hero min-h-screen mt-40 lg:mt-0 flex items-center justify-center">
      <div className="w-full px-6 lg:px-12">
        <h1 className="text-3xl lg:text-5xl font-bold text-center">Why Use a Body Recomposition Calculator?</h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mt-12">
          <div className="card bg-[#FFEAEC] w-full lg:w-1/3 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-center justify-center text-xl font-bold">Manual Guesswork</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center text-neutral">
                  <span className="text-red-500 mr-2">X</span>
                  Hard to estimate maintenance accurately
                </li>
                <li className="flex items-center text-neutral">
                  <span className="text-red-500 mr-2">X</span>
                  Easy to swing too far into a big deficit or surplus
                </li>
                <li className="flex items-center text-neutral">
                  <span className="text-red-500 mr-2">X</span>
                  No clear baseline for week-to-week adjustments
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-[#DEFCED] w-full lg:w-1/3 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-center justify-center text-xl font-bold">Body Recomposition Calculator</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center text-neutral">
                  <span className="text-green-500 mr-2">OK</span>
                  Daily target anchored to your maintenance estimate
                </li>
                <li className="flex items-center text-neutral">
                  <span className="mr-2">OK</span>
                  Strategy options for fat-loss focus, maintenance recomp, or lean gain
                </li>
                <li className="flex items-center text-neutral">
                  <span className="mr-2">OK</span>
                  Macro starting point you can run and adjust from real data
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
