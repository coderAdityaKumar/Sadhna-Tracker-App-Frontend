import { useState, useEffect } from "react";
import { FaOm } from "react-icons/fa";

const EkadashiLiveButton = () => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 800); // Faster blink for more urgency
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href="/ekadashi-live"
        className={`
          relative flex items-center justify-center 
          w-16 h-16 rounded-full shadow-xl
          transform transition-all duration-500
          hover:scale-110 hover:shadow-2xl
          ${isBlinking ? "animate-pulse" : ""}
        `}
        style={{
          background:
            "radial-gradient(circle at center, #7e22ce 0%, #581c87 100%)",
          boxShadow: "0 0 20px rgba(124, 58, 237, 0.7)",
        }}
      >
        {/* Golden lotus ring */}
        <div className="absolute inset-0 rounded-full border-4 border-amber-400 opacity-70"></div>

        {/* Animated aura */}
        <div
          className={`
          absolute inset-0 rounded-full 
          border-2 border-purple-300
          ${isBlinking ? "animate-ping opacity-0" : "opacity-30"}
          transition-opacity duration-1000
        `}
        ></div>

        {/* ekadashi written inside*/}
        <div className="relative">
          <span className="font-bold text-white font-Quintessential text-sm">Ekadshi</span>
        </div>

        {/* LIVE badge */}
        <div className="absolute -top-1 -right-1 flex items-center justify-center">
          <span className="relative flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-br from-red-600 to-red-700 text-[10px] font-bold text-white">
              LIVE
            </span>
          </span>
        </div>

        {/* Subtle floating dots */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`w-1 h-1 rounded-full bg-amber-300 ${
                isBlinking ? "opacity-70" : "opacity-30"
              }`}
              style={{ animation: `float 3s infinite ${dot * 0.3}s` }}
            ></span>
          ))}
        </div>
      </a>

      {/* Floating tooltip on hover */}
      <div className="absolute left-20 bottom-4 bg-white text-purple-900 text-sm font-medium px-3 py-1 rounded-md shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Join Ekadashi Chanting Live!
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default EkadashiLiveButton;
