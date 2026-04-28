export default function Comparison() {
  return (
    <div className="hero min-h-screen mt-40 lg:mt-0 flex items-center justify-center">
      <div className="w-full px-6 lg:px-12">
        <h1 className="text-3xl lg:text-5xl font-bold text-center">Why Use an AI Canthal Tilt Test?</h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mt-12">
          <div className="card bg-[#FFEAEC] w-full lg:w-1/3 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-center justify-center text-xl font-bold">Manual Guesswork</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center text-neutral">
                  <span className="text-red-500 mr-2">❌</span>
                  Hard to measure accurately by eye
                </li>
                <li className="flex items-center text-neutral">
                  <span className="text-red-500 mr-2">❌</span>
                  Lighting and angles can mislead interpretation
                </li>
                <li className="flex items-center text-neutral">
                  <span className="text-red-500 mr-2">❌</span>
                  No consistent baseline for comparing photos
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-[#DEFCED] w-full lg:w-1/3 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-center justify-center text-xl font-bold">Canthal Tilt Test</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center text-neutral">
                  <span className="text-green-500 mr-2">✅</span>
                  Fast AI estimate in seconds
                </li>
                <li className="flex items-center text-neutral">
                  <span className="mr-2">✅</span>
                  Includes canthal tilt, eye shape, and eye color output
                </li>
                <li className="flex items-center text-neutral">
                  <span className="mr-2">✅</span>
                  Private, remote-first workflow from any device
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
