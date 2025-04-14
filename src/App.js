import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import crownAnim from "./animations/crown.json";
import fireAnim from "./animations/fire.json";
import lightningAnim from "./animations/lightning.json";
import confettiAnim from "./animations/confetti.json";
import floatingCrown from "./animations/floatingCrown.json";
import { listenToDonations, saveDonation } from "./firestoreService";

function App() {
  const [donors, setDonors] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToDonations(setDonors);
    return () => unsubscribe();
  }, []);

  const handleDonate = async () => {
    if (!name || !amount) return;

    await saveDonation(name, parseFloat(amount));
    setShowConfetti(true);
    setShowThanks(true);
    setName("");
    setAmount("");

    setTimeout(() => {
      setShowConfetti(false);
      setShowThanks(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6 relative overflow-hidden">
      {/* 🎉 Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <Lottie animationData={confettiAnim} className="w-full h-full object-cover" />
        </div>
      )}

      {/* 🎊 Thank You Message */}
      {showThanks && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70 text-center">
          <h2 className="text-5xl font-extrabold text-yellow-300 mb-4 animate__animated animate__fadeInDown">
            🎉 Thank You! 🎉
          </h2>
          <p className="text-xl animate__animated animate__fadeInUp">Your donation makes you part of the Royale!</p>
        </div>
      )}

      {/* 👑 Title with Floating Crown */}
      <div className="relative flex justify-center items-center mb-6">
        <Lottie animationData={floatingCrown} className="absolute w-20 -top-10 z-10" loop />
        <h1 className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-green-300 to-green-600 text-transparent bg-clip-text animate__animated animate__fadeInDown animate__slower tracking-wider glow-title">
          🍀 Donato Royale 🍀
        </h1>
      </div>

      {/* 🏆 Leaderboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {donors.map((donor, i) => (
          <div
            key={i}
            className="bg-white bg-opacity-5 rounded-xl p-6 text-center shadow-lg border border-white/10 backdrop-blur hover:scale-105 transition-transform duration-300"
          >
            {i === 0 && <Lottie animationData={crownAnim} className="w-16 mx-auto mb-2" loop />}
            {i === 1 && <Lottie animationData={fireAnim} className="w-16 mx-auto mb-2" loop />}
            {i === 2 && <Lottie animationData={lightningAnim} className="w-16 mx-auto mb-2" loop />}
            <p className="text-2xl font-bold text-yellow-300">#{i + 1}</p>
            <p className="text-xl mt-2">{donor.name}</p>
            <p className="text-lg text-green-300 mt-1">${donor.amount.toLocaleString()}</p>
            {i === 0 && <p className="mt-2 text-yellow-400">👑 The Legend</p>}
            {i === 1 && <p className="mt-2 text-red-400">🔥 The Challenger</p>}
            {i === 2 && <p className="mt-2 text-blue-400">⚡ Third Place</p>}
          </div>
        ))}
      </div>

      {/* 💸 Donation Form */}
      <div className="text-center mt-16">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="px-6 py-3 rounded-full mr-2 text-black text-lg outline-none"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="px-6 py-3 rounded-full ml-2 text-black text-lg outline-none"
          type="number"
        />
        <div className="mt-6">
          <button
            onClick={handleDonate}
            className="bg-gradient-to-r from-green-400 to-yellow-300 text-black font-bold text-xl px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse border-2 border-white hover:shadow-yellow-500/50"
          >
            💸 Donate Now
          </button>
        </div>
      </div>

      {/* 🔗 Share Button */}
      <div className="text-center mt-12">
        <button
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: "Donato Royale 👑",
                  text: "Join the Donato Royale and make your mark!",
                  url: "https://donato-royale.web.app",
                })
              : navigator.clipboard.writeText("https://donato-royale.web.app")
          }
          className="mt-4 text-sm text-white underline hover:text-green-300 transition-colors duration-200"
        >
          🔗 Share Donato Royale
        </button>
      </div>
    </div>
  );
}

export default App;


















