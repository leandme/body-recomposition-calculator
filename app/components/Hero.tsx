import ReviewBox from "./ReviewBox";

export default function Hero() {
  return (
    <div className="hero min-h-screen lg:-mt-28 flex items-center justify-center">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold">Test Your Canthal Tilt from a Photo</h1>
          <p className="py-6 text-lg mt-6">
            Upload a clear portrait and get an AI estimate of canthal tilt, eye shape, and eye color.
          </p>
          <a href="/">
            <button className="btn btn-primary btn-lg text-white mt-6">
              Start Canthal Tilt Test <span className="text-lg">→</span>
            </button>
          </a>
          <ReviewBox />
        </div>
      </div>
    </div>
  );
}
