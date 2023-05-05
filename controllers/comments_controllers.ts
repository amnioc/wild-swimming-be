const {
  selectAllComments,
  insertComment,
  selectCommentById,
  selectCommentsByLocation,
} = require("../_models/comments_models.ts");

exports.getAllComments = (req, res, err) => {
  return selectAllComments()
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      res.status(500).json(error);
    });
};

exports.addComments = (req, res, next) => {
  const newComment = req.body;

  return insertComment(newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentById = (req, res, next) => {
  const { _id } = req.params;
  const comment_id = _id;
  return selectCommentById(comment_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByLocation = (req, res, next) => {
  const { location_id } = req.params;
  return selectCommentsByLocation(location_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
