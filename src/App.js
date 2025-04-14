import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import crownAnim from './animations/floatingCrown.json';
import confettiAnim from './animations/confetti.json';
import fireAnim from './animations/fire.json';
import lightningAnim from './animations/lightning.json';
import { addDonation, fetchDonations } from './firestoreService';

function App() {
  const [donors, setDonors] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDonate = async () => {
    if (!name || !amount) return;
    await addDonation(name, parseFloat(amount));
    setShowConfetti(true);
    setShowThankYou(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowThankYou(false);
      setName('');
      setAmount('');
    }, 5000);
    const updated = await fetchDonations();
    setDonors(updated);
  };

  useEffect(() => {
    const load = async () => {
      const topDonors = await fetchDonations();
      setDonors(topDonors);
    };
    load();
  }, []);

  const handleShare = async () => {
    const url = 'https://donato-royale.web.app';
    const text = 'Join the leaderboard by donating at Donato Royale! 💸👑';
    if (navigator.share) {
      await navigator.share({ title: 'Donato Royale', text, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <Lottie animationData={confettiAnim} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Thank You Overlay */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-extrabold text-yellow-400 mb-2">🎉 Thank You! 🎉</h2>
          <p className="text-white text-lg">Your donation makes you part of the Royale!</p>
        </div>
      )}

      {/* Floating Crown Animation */}
      <div className="w-24 mx-auto -mb-10">
        <Lottie animationData={crownAnim} loop autoplay />
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-black text-center mb-12 bg-gradient-to-r from-yellow-300 via-green-400 to-teal-500 text-transparent bg-clip-text animate__animated animate__fadeInDown animate__slower tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] glow-title">
        💸 Donato Royale 💸
      </h1>

      {/* Leaderboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {donors.map((donor, i) => (
          <div
            key={i}
            className={`relative bg-white bg-opacity-5 rounded-xl p-6 text-center shadow-xl hover:scale-105 transition-all duration-300 ${
              i === 0 ? 'border-yellow-400 border-2 glow' : ''
            }`}
          >
            {i === 0 && <Lottie animationData={crownAnim} className="w-12 mx-auto mb-1" loop />}
            {i === 1 && <Lottie animationData={fireAnim} className="w-12 mx-auto mb-1" loop />}
            {i === 2 && <Lottie animationData={lightningAnim} className="w-12 mx-auto mb-1" loop />}
            <p className="text-2xl font-bold text-yellow-300">#{i + 1}</p>
            <p className="text-xl mt-2 break-words">"{donor.name}"</p>
            <p className="text-lg text-green-300 mt-1">${donor.amount.toLocaleString()}</p>
            {i === 0 && <p className="mt-2 text-yellow-400">👑 The Legend</p>}
            {i === 1 && <p className="mt-2 text-red-400">🔥 The Challenger</p>}
            {i === 2 && <p className="mt-2 text-blue-400">⚡ Third Place</p>}
          </div>
        ))}
      </div>

      {/* Donation Form */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            value={name}
            placeholder="Your Name"
            className="px-4 py-2 rounded-full text-black w-60 text-center"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={amount}
            placeholder="Amount"
            className="px-4 py-2 rounded-full text-black w-40 text-center"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          onClick={handleDonate}
          className="bg-gradient-to-r from-green-400 to-yellow-300 text-black font-bold text-xl px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 animate-pulse border-2 border-white hover:shadow-yellow-500/50"
        >
          💸 Donate Now
        </button>

        <button
          onClick={handleShare}
          className="mt-2 text-sm text-blue-300 hover:underline"
        >
          📣 Share Donato Royale
        </button>
      </div>
    </div>
  );
}

export default App;

















