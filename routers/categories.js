const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();
  if (!category) return res.status(404).send("the category cant be created");

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const categorybyid = await Category.findById(req.params.id);
  if (!categorybyid) {
    res.status(500).json({ message: "the category with this ID is not found" });
  }
  res.status(200).send(categorybyid);
});

router.put("/:id", async (req, res) => {
  const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  },{new:true});
  if (!updateCategory) res.status(404).send("the category cant be created");

  res.send(updateCategory);
});
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (category) {
      return res
        .status(200)
        .json({ success: true, message: "the category has deleted" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: " category is not found" });
    }
  } catch (err) {
    return res.status(400).json({ success: false, erroe: err });
  }
});
module.exports = router;
