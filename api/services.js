// DB Models
const { Course, User } = require('./models');

// business logic

// get all courses by user
const getUserCourses = () =>
  Course.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    ],
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });

// get course by id
const getCourseid = id =>
  Course.findAll({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    ],
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });

// create course
const createCourse = (user, course) =>
  Course.create({
    userId: user.id,
    title: course.title,
    description: course.description,
    estimatedTime: course.estimatedTime,
    materialsNeeded: course.materialsNeeded,
  });
// find user

const authUser = id => Course.findOne({ where: { id } });

// update courses
const updateCourse = async course => {
  const courses = await Course.findByPk(id);
  courses.update({
    title: course.title,
    description: course.description,
    estimatedTime: course.estimatedTime,
    materialsNeeded: course.materialsNeeded,
  });
};

// delete course
const deleteCourse = async () => {
  const course = await Course.findByPk(id);
  course.destroy();
};

module.exports = {
  deleteCourse,
  updateCourse,
  authUser,
  createCourse,
  getCourseid,
  getUserCourses,
};
