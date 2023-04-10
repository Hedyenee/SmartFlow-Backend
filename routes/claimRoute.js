const Claim = require("../models/claimModel");
const jwt = require("jsonwebtoken");

/*  Get Claim by ID  */
exports.getClaim = async (req, res, next) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      const error = new Error("Claim does not exist");
      return next(error);
    }
    res.json(claim);
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* *************************************** */

/*  Get All Claim  */
exports.getAllClaim = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(201).json({  data: { claims } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* *************************************** */

/*  Add Claim  */
exports.addClaim = async (req, res) => {
  const { object, content, status, author } = req.body;
  try {
    const claim = await Claim.create({ object, content, status, author });
    res.status(200).json({ results: claim.length, data: { claim } });
  } catch (err) {
    res.status(400).json({ err });
  }
};

/* *************************************** */

/*  Update Status Claim  */
exports.updateStatusClaim = async (req, res) => {
  try{
    const { status } = req.body
    const claim = await Claim.findOne({ id: req.params._id })
    if(!claim){
      return res.status(404).json({ Message: "Claim not exist !"})
    }
    await Claim.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: status }}
    )
    return res.status(200).json(claim)
  }catch(err){
    res.status(400).json(err)
  }
};

/* *************************************** */

/*  DeleteClaim  */
exports.delClaim = async (req, res) => {
  const claim = await Claim.findById(req.params.id);
  if (claim.createdBy === req.body.id) {
    try {
      await claim.delete();
      res.status(200).json("Claim has been deleted !");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};


exports.updateClaim = async (req, res) => {
  try{
    const { object , content } = req.body

    const claim = await Claim.findOne({ id: req.params._id })
    if(!claim){
      return res.status(404).json({ Message: "Claim not exist !"})
    }
    await Claim.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { object: object  , content : content}}
    )
    return res.status(200).json(claim)
  }catch(err){
    res.status(400).json(err)
  }
};

