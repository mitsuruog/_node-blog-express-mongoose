'use strict';

var Article = require('../../models/article');

exports.create = function(req, res, next) {

  var newArticle = {
    title: req.body.title,
    slug: req.body.slug,
    text: req.body.text,
  };

  Article.create(newArticle).then((article) => {
    // TODO errorで正常系のメッセージ投げるの違和感あり・・・
    res.render('post', {
      error: 'Artical was added. Publish it on Admin page.'
    });
  }, (err) => {
    return next(err);
  });

}

exports.show = function(req, res, next) {
  Article.findOne({
      slug: req.params.slug
    })
    .exec()
    .then((article) => {
      if (!article.published) return res.send(404);
      res.render('article', article);
    }, (err) => {
      return next(err);
    });
}
