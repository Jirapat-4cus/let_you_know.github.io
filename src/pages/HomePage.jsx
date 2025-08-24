import React from "react";
import { BookOpen, Play, Zap, Trophy } from "lucide-react";

const HomePage = ({ user, userData, updateUserData, setCurrentPage }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          สวัสดี {userData?.displayName || user?.displayName || "นักเรียน"}! 👋
        </h1>
        <p className="text-gray-600">
          พร้อมเรียนรู้และเตรียมสอบเข้ามหาวิทยาลัยแล้วหรือยัง?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-xl text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {userData?.selectedCourses?.length || 0}
          </div>
          <div className="text-sm opacity-90">คอร์สที่เลือก</div>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-xl text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">Rank {userData?.rank || 1}</div>
          <div className="text-sm opacity-90">อันดับ</div>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl text-center">
          <Play className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{userData?.dailyStreak || 0}</div>
          <div className="text-sm opacity-90">วันต่อเนื่อง</div>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl text-center">
          <Zap className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{userData?.totalPoints || 0}</div>
          <div className="text-sm opacity-90">XP รวม</div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => setCurrentPage("courses")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <BookOpen className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold">คอร์สเรียน</h3>
          <p className="text-sm opacity-90">เลือกเรียน 3 วิชา</p>
        </button>

        <button
          onClick={() => setCurrentPage("story")}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <Play className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold">Story Mode</h3>
          <p className="text-sm opacity-90">เรียนแบบผจญภัย</p>
        </button>

        <button
          onClick={() => setCurrentPage("boss")}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <Zap className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold">Boss Fight</h3>
          <p className="text-sm opacity-90">ท้าทายข้อยาก</p>
        </button>

        <button
          onClick={() => setCurrentPage("profile")}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <Trophy className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold">โปรไฟล์</h3>
          <p className="text-sm opacity-90">ดูความก้าวหน้า</p>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
