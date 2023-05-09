const {
  selectAllComments,
  insertComment,
  selectCommentById,
  selectCommentsByLocation,
  removeCommentById,
  changeCommentVotes,
  checkCommentExists,
} = require("../_models/comments_models");

exports.getAllComments = (req, res, err) => {
  return selectAllComments()
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      res.status(500).json(err);
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

exports.deleteCommentById = (req, res, next) => {
  const { _id } = req.params;
  const comment_id = _id;
  return removeCommentById(comment_id)
    .then((comment) => {
      res.status(204).send({ msg: "Comment Deleted" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateCommentVotes = (req, res, next) => {
  const { _id } = req.params;
  const comment_id = _id;
  const { incVotes } = req.body;

  const commentPromises = [
    changeCommentVotes(incVotes, comment_id),
    checkCommentExists(comment_id),
  ];

  Promise.all(commentPromises)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
