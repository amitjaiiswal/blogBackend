const Joi = require("joi");
const { errorHandler } = require("../../utils/responseHandler");

const Validators = {
  createComment: Joi.object({
    comments: Joi.string().required(),
    userId: Joi.number().required(),
    blogId: Joi.number().required(),
  }),

   createBlogPostForCommentValidator: Joi.object({
    blogId: Joi.string().required()
  })
};

function Validator(func) {
  return async function Validator(req, res, next) {
    try {
      const validated = await Validators[func].validateAsync(req.body, {
        abortEarly: false,
      });
      req.body = validated;
      next();
    } catch (err) {
      let _er = {};
      if (err.isJoi) {
        err.details.forEach((d) => {
          let _key = d.context.key;
          _er[_key] = d.message;
        });
      }
      await next(
        errorHandler({
          res,
          statusCode: 400,
          message: _er,
        })
      );
    }
  };
}

module.exports = Validator;
