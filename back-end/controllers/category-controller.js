const Category = require('../models/Category');


exports.viewCategories = (req, res) =>{
  Category.find({}, (err, category) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(category);
    }
  });
}

exports.findById = (req, res) => {
  const _id = req.params._id;

  Category.findOne({ _id }, (err, category) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(category);
    }
  });
}

exports.addCategory = (req, res) =>{
  const newCategory = new Question(req.body);

  newCategory.save((err, category)=>{
    if(err){ res.send({});
    }else {
      res.json(category);
    }
  });
}

exports.deleteCategory = (req, res) =>{

}
