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

exports.addCategory = (req, res) =>{

}

exports.deleteCategory = (req, res) =>{

}
