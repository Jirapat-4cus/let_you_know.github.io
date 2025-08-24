import React from "react";
import { Trophy, Flame, Star, User, Settings } from "lucide-react";

const ProfilePage = ({ user, userData, updateUserData }) => {
  const getRankInfo = (rank) => {
    switch (rank) {
      case 1:
        return { name: "Bronze", icon: "🥉", color: "text-orange-600" };
      case 2:
        return { name: "Silver", icon: "🥈", color: "text-gray-600" };
      case 3:
        return { name: "Gold", icon: "🥇", color: "text-yellow-600" };
      default:
        return { name: "Unranked", icon: "❓", color: "text-gray-400" };
    }
  };

  const rankInfo = getRankInfo(userData?.rank);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl">
            <User className="w-8 h-8" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {userData?.displayName || user?.displayName || "ผู้ใช้"}
            </h1>
            <p className="opacity-90 mb-3">{user?.email}</p>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <span className="text-xl">{rankInfo.icon}</span>
                <span className="font-medium">{rankInfo.name}</span>
              </div>

              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4" />
                <span className="font-medium">
                  {userData?.dailyStreak || 0} วัน
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span className="font-medium">
                  {userData?.totalPoints || 0} XP
                </span>
              </div>
            </div>
          </div>

          <button className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-yellow-500 mb-1">
            Rank {userData?.rank || 1}
          </div>
          <div className="text-gray-600">{rankInfo.name}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Flame className="w-12 h-12 text-orange-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-orange-500 mb-1">
            {userData?.dailyStreak || 0}
          </div>
          <div className="text-gray-600">วันติดต่อกัน</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Star className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-blue-500 mb-1">
            {userData?.totalPoints || 0}
          </div>
          <div className="text-gray-600">คะแนนรวม</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
