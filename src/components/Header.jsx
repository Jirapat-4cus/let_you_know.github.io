import React, { useState } from "react";
import { Menu, Flame, Trophy, Bell, Search, ChevronDown } from "lucide-react";

const Header = ({ user, userData, setIsSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getRankInfo = (rank) => {
    switch (rank) {
      case 1:
        return {
          name: "Bronze",
          icon: "🥉",
          color: "bg-orange-100 text-orange-700",
        };
      case 2:
        return {
          name: "Silver",
          icon: "🥈",
          color: "bg-gray-100 text-gray-700",
        };
      case 3:
        return {
          name: "Gold",
          icon: "🥇",
          color: "bg-yellow-100 text-yellow-700",
        };
      default:
        return {
          name: "Unranked",
          icon: "❓",
          color: "bg-gray-100 text-gray-500",
        };
    }
  };

  const rankInfo = getRankInfo(userData?.rank);
  const displayName = userData?.displayName || user?.displayName || "ผู้ใช้";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="เปิดเมนู"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* App Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              📚
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800">
                แอปเตรียมสอบเข้ามหาลัย
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">
                เรียนรู้ไปด้วยกัน สู่ความสำเร็จ
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Search (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ค้นหาบทเรียน, ข้อสอบ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user && userData && (
            <>
              {/* Daily Streak */}
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  {userData.dailyStreak || 0}
                </span>
                <span className="text-xs text-orange-600 hidden sm:inline">
                  วัน
                </span>
              </div>

              {/* Rank Badge */}
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${rankInfo.color}`}
              >
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">{rankInfo.name}</span>
              </div>

              {/* XP Points */}
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-blue-500 font-bold text-sm">⭐</span>
                <span className="text-sm font-medium text-blue-700">
                  {userData.totalPoints || 0}
                </span>
                <span className="text-xs text-blue-600 hidden sm:inline">
                  XP
                </span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                  aria-label="การแจ้งเตือน"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {/* Notification Badge */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">
                        การแจ้งเตือน
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm text-gray-800">
                          🎉 ยินดีด้วย! คุณได้ XP จากการเรียนต่อเนื่อง
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          5 นาทีที่แล้ว
                        </p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm text-gray-800">
                          📚 มีบทเรียนใหม่ในคอร์สคณิตศาสตร์
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          1 ชั่วโมงที่แล้ว
                        </p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm text-gray-800">
                          ⚔️ บอสใหม่พร้อมให้ท้าทายแล้ว!
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          3 ชั่วโมงที่แล้ว
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        ดูทั้งหมด
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-24 truncate">
                    {displayName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{displayName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    <div className="px-4 py-2">
                      <div className="text-xs text-gray-500 mb-2">
                        สถานะการเรียน
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <div className="text-sm font-bold text-orange-600">
                            {userData.dailyStreak || 0}
                          </div>
                          <div className="text-xs text-gray-500">
                            วันติดต่อกัน
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-blue-600">
                            {userData.totalPoints || 0}
                          </div>
                          <div className="text-xs text-gray-500">XP รวม</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
