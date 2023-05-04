const { selectAllComments, insertLocationComment } = require("../_models/comments_models.ts");

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


exports.addCommentsByLocation = (req,res,next)=>{
  console.log(req.body)
  
  const newComment  =req.body
 
  return insertLocationComment(newComment)
  .then((comment)=>{
    res.status(201).send({comment})
  })
  .catch((err)=>{
    console.log(err);
    next(err);
  });

};