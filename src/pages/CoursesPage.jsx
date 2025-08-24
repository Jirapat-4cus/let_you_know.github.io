import React from "react";

const CoursesPage = ({ userData, updateUserData }) => {
  const courses = [
    { id: "math", name: "คณิตศาสตร์", icon: "📊", color: "bg-blue-500" },
    { id: "thai", name: "ภาษาไทย", icon: "📝", color: "bg-green-500" },
    { id: "science", name: "วิทยาศาสตร์", icon: "🧪", color: "bg-purple-500" },
  ];

  const handleCourseSelect = async (courseId) => {
    const currentCourses = userData?.selectedCourses || [];
    let newCourses;

    if (currentCourses.includes(courseId)) {
      newCourses = currentCourses.filter((id) => id !== courseId);
    } else if (currentCourses.length < 3) {
      newCourses = [...currentCourses, courseId];
    } else {
      return;
    }

    await updateUserData({ selectedCourses: newCourses });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          เลือกคอร์สเรียน
        </h1>
        <p className="text-gray-600">
          เลือกได้สูงสุด 3 คอร์ส | เลือกแล้ว:{" "}
          {userData?.selectedCourses?.length || 0}/3
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseSelect(course.id)}
            className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
              userData?.selectedCourses?.includes(course.id)
                ? "ring-2 ring-blue-500"
                : ""
            }`}
          >
            <div className={`${course.color} p-6 rounded-xl text-white mb-4`}>
              <div className="text-4xl mb-2">{course.icon}</div>
              <h3 className="text-xl font-bold">{course.name}</h3>
            </div>
            <div className="text-center">
              <button
                className={`px-6 py-2 rounded-lg font-medium ${
                  userData?.selectedCourses?.includes(course.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {userData?.selectedCourses?.includes(course.id)
                  ? "เลือกแล้ว"
                  : "เลือก"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
