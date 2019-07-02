const express = require('express');
const router = express.Router();
const { Course } = require('../models');
const { User } = require('../models');
const { authenticateUser } = require('./authenticateUser');
const { check, validationResult } = require('express-validator');

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
// validate course information
const courseValidationChain = [
  check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a Course Title'),
  check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a Course Description'),
];

// Course Routes

//GET /courses 200 - Returns a list of courses (including the user that owns each course)
router.get(
  '/courses',
  asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
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
      const course = await Course.findAll({
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
    const errors = validationResult(req);
    const user = req.currentUser;
    const course = req.body;

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      res.status(400).json({ errors: errorMessages });
    } else {
      const courses = await Course.create({
        userId: user.id,
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded,
      });
      res
        .location(`/courses/:${courses.id}`)
        .status(201)
        .end();
    }
  })
);
//PUT /courses/:id 204 - Updates a course and returns no content
router.put(
  '/courses/:id',
  authenticateUser,
  courseValidationChain,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = req.currentUser;
    const course = req.body;
    const id = +req.params.id;
    const verifyUser = await Course.findOne({ where: { id } });
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      res.status(400).json({ errors: errorMessages });
    } else if (verifyUser.userId === user.id) {
      const courses = await Course.findByPk(id);
      courses.update({
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded,
      });
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
    const verifyUser = await Course.findOne({ where: { id } });
    if (verifyUser.userId === user.id) {
      const course = await Course.findByPk(id);

      course.destroy();
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
