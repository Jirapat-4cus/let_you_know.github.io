import React from "react";
import { Lock, Star } from "lucide-react";

const StoryModePage = ({ userData }) => {
  const lessons = [
    {
      id: 1,
      title: "บทที่ 1",
      description: "พื้นฐานการเรียน",
      unlocked: true,
      completed: false,
    },
    {
      id: 2,
      title: "บทที่ 2",
      description: "ขั้นกลาง",
      unlocked: false,
      completed: false,
    },
    {
      id: 3,
      title: "บทที่ 3",
      description: "ขั้นสูง",
      unlocked: false,
      completed: false,
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Story Mode</h1>
        <p className="text-gray-600">เรียนรู้ไปทีละขั้นตอน</p>
      </div>

      <div className="space-y-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-white rounded-xl shadow-lg p-6 ${
              lesson.unlocked
                ? "hover:shadow-xl transition-shadow cursor-pointer"
                : "opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    lesson.completed
                      ? "bg-green-500 text-white"
                      : lesson.unlocked
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {lesson.completed ? (
                    <Star className="w-6 h-6" />
                  ) : lesson.unlocked ? (
                    lesson.id
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{lesson.title}</h3>
                  <p className="text-gray-600">{lesson.description}</p>
                </div>
              </div>
              <button
                disabled={!lesson.unlocked}
                className={`px-6 py-2 rounded-lg font-medium ${
                  lesson.unlocked
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {lesson.completed
                  ? "เสร็จสิ้น"
                  : lesson.unlocked
                  ? "เริ่มเรียน"
                  : "ล็อค"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryModePage;
