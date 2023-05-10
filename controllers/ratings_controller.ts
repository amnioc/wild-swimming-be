const Rating = require("../models/ratingModel");

exports.addRating = async (req, res, next) => {
  try {
    const rating = await Rating.create(req.body);

    res.status(201).send({
      rating,
      status: 201,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLocationRatings = async (req, res, next) => {
  const { locationId: id } = req.params;

  try {
    const ratings = await Rating.find({ locationId: id });

    if (!ratings.length) {
      throw new Error("No rating found by that ID");
    }

    res.status(200).send({
      ratings,
      status: 200,
    });
  } catch (err) {
    next({
      name: "NoEntryFound",
      status: 404,
      message: "No rating found by that ID",
    });
  }
};
