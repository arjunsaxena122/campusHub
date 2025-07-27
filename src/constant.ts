export const UserRolesEnum = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

export const AvailableUserRolesEnum = Object.values(UserRolesEnum);

export const StudentGenderEnum = {
  MALE: "male",
  FEMALE: "female",
};

export const AvailableStudentGenderEnum = Object.values(StudentGenderEnum);

export const StudentStatusEnum = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PASS: "pass",
  FAIL: "fail",
};

export const AvailableStudentStatusEnum = Object.values(StudentStatusEnum);

export const CourseStatusEnum = {
  LIVE: "live",
  COMPLETED: "completed",
  COMING_SOON: "coming soon",
};

export const AvailableCourseStatusEnum = Object.values(CourseStatusEnum)


export const MaterialStatusEnum = {
  AVAILABLE : "avaiable",
  NOT_AVAILABLE : "not_available"
};

export const AvailableMaterialStatusEnum = Object.values(CourseStatusEnum)