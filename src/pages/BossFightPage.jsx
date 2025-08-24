import React from "react";
import { Zap, Lock, Trophy } from "lucide-react";

const BossFightPage = ({ userData }) => {
  const bosses = [
    {
      id: "math",
      name: "บอสคณิตศาสตร์",
      icon: "👹",
      color: "from-red-500 to-red-700",
      unlocked: true,
    },
    {
      id: "thai",
      name: "บอสภาษาไทย",
      icon: "🐉",
      color: "from-green-500 to-green-700",
      unlocked: false,
    },
    {
      id: "science",
      name: "บอสวิทยาศาสตร์",
      icon: "🤖",
      color: "from-purple-500 to-purple-700",
      unlocked: false,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Boss Fight Arena
        </h1>
        <p className="text-gray-600">ท้าทายบอสใหญ่และพิสูจน์ความแข็งแกร่ง!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bosses.map((boss) => (
          <div
            key={boss.id}
            className={`rounded-xl shadow-lg overflow-hidden ${
              boss.unlocked
                ? "hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                : "opacity-60"
            }`}
          >
            <div className={`bg-gradient-to-br ${boss.color} p-6 text-white`}>
              <div className="text-5xl mb-4">{boss.icon}</div>
              <h3 className="text-xl font-bold">{boss.name}</h3>
            </div>

            <div className="p-6 bg-white">
              <button
                disabled={!boss.unlocked}
                className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  boss.unlocked
                    ? `bg-gradient-to-r ${boss.color} text-white hover:shadow-lg`
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {boss.unlocked ? (
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    ⚔️ ท้าทาย
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    🔒 ล็อค
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BossFightPage;
