const { selectAllComments } = require("../_models/comments_models.ts");

exports.getAllComments = (req, res, next) => {
  return selectAllComments()
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      console.log("!!there's an error");
      next(err);
    });
};
