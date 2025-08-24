import React from "react";
import { BookOpen, Star, Play, Zap, User, LogOut, X, Home } from "lucide-react";

const Sidebar = ({
  currentPage,
  setCurrentPage,
  isSidebarOpen,
  setIsSidebarOpen,
  onLogout,
}) => {
  const navigationItems = [
    {
      id: "home",
      label: "หน้าหลัก",
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "courses",
      label: "คอร์สเรียน",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "story",
      label: "Story Mode",
      icon: Play,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "boss",
      label: "Boss Fight",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "profile",
      label: "โปรไฟล์",
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleLogout = () => {
    setIsSidebarOpen(false);
    onLogout();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              📚
            </div>
            <h2 className="text-lg font-bold text-gray-800">เมนูหลัก</h2>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="ปิดเมนู"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? `${item.bgColor} ${item.color} shadow-sm scale-105`
                    : "hover:bg-gray-50 text-gray-700 hover:scale-102"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? item.color : "text-gray-500"
                  }`}
                />
                <span
                  className={`font-medium ${isActive ? "font-semibold" : ""}`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div
                    className={`ml-auto w-2 h-2 ${item.color.replace(
                      "text-",
                      "bg-"
                    )} rounded-full`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* App Info */}
        <div className="px-4 mt-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              💡 เคล็ดลับ
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              เรียนทุกวันเพื่อเพิ่ม Daily Streak และปลดล็อคคุณสมบัติใหม่ๆ
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span className="font-medium">ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
