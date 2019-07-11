const express = require('express');
const router = express.Router();
const {
  deleteCourse,
  updateCourse,
  authUser,
  createCourse,
  getCourseid,
  getUserCourses,
} = require('../services');
const { authenticateUser } = require('./authenticateUser');
const { courseValidationChain } = require('./validationChain');
// middleware error handler
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      if (err === 'SequelizeDatabaseError') {
        res.status(err.status).json({ error: err.message });
      } else {
        next(err);
      }
    }
  };
}

// Course Routes

//GET /courses 200 - Returns a list of courses (including the user that owns each course)
router.get(
  '/courses',

  asyncHandler(async (req, res, next) => {
    const courses = await getUserCourses();
    if (courses) {
      res.status(200).json(courses);
    } else {
      res.status(404).json({
        error: '404 Not Found',
        message: 'Courses not found at selected route',
      });
    }
  })
);

//GET /courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
router.get(
  '/courses/:id',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    if (id) {
      const course = await getCourseid(id);
      res.status(200).json(course);
    } else {
      res.status(404).json({
        error: '404 Not Found',
        message: 'Course not found at selected Route',
      });
    }
  })
);

//POST /courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post(
  '/courses',
  authenticateUser,
  courseValidationChain,
  asyncHandler(async (req, res, next) => {
    const user = req.currentUser;
    const course = req.body;
    const courses = await createCourse(user, course);
    res
      .location(`/courses/:${courses.id}`)
      .status(201)
      .end();
  })
);
//PUT /courses/:id 204 - Updates a course and returns no content
router.put(
  '/courses/:id',

  authenticateUser,
  courseValidationChain,
  asyncHandler(async (req, res, next) => {
    const user = req.currentUser;
    const course = req.body;
    const id = +req.params.id;
    const verifyUser = await authUser(id);
    if (verifyUser.userId === user.id) {
      updateCourse(course);
      res.status(204).end();
    } else {
      res.status(403).json({
        errors: {
          message:
            'You can only edit courses that you own. Please choose a choose a course you own and try again.',
        },
      });
    }
  })
);
//DELETE - courses/:id 204 - deletes a course. Careful, this can not be undone. Deletes a course and returns no content
router.delete(
  '/courses/:id',

  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const user = req.currentUser;
    const id = +req.params.id;
    const verifyUser = await authUser(id);
    if (verifyUser.userId === user.id) {
      deleteCourse();
      res.status(204).end();
    } else {
      res.status(403).json({
        errors: {
          message:
            'You can only delete courses that you own. Please choose a choose a course you own and try again.',
        },
      });
    }
  })
);
module.exports = router;

/**
 * The PUT /api/courses/:id and DELETE /api/courses/:id routes return a 403 status code if the current user doesn't own the requested course
 */
