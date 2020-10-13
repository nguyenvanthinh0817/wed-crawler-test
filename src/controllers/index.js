/** @format */

const { query } = require('express');
const NavLink = require('../model/navLink');
const News = require('../model/news');

module.exports.index = async function (req, res, next) {
  try {
    let q = '';
    let query = { linkParent: '/', linkChilrent: '' };
    if (req.query.q) {
      console.log('asdsdf');
      q = req.query.q;
      let newq = q.split('/');
      console.log(newq[2]);
      console.log('newq', newq);
      query.linkParent = `/${newq[1]}`;
      query.linkChilrent = newq[2] === undefined ? '' : `/${newq[2]}`;
    }

    let navLinks = await NavLink.find({});

    navLinks = navLinks.map(item => item.toObject());

    let newss = null;

    if (query.linkChilrent === '') {
      newss = await News.find({
        'type.linkParent': query.linkParent,
      }).limit(10);
    } else {
      newss = await News.find({
        'type.linkParent': query.linkParent,
        'type.linkChilrent': query.linkChilrent,
      }).limit(10);
    }

    newss = newss.map(item => item.toObject());

    console.log('q', q);

    res.render('home', { navLinks, newss, q });
  } catch (error) {
    console.log(error);
  }
};

module.exports.news = async function (req, res, next) {
  try {
    let news = await News.findOne({ _id: req.params.id });
    news = news.toObject();
    console.log(news);

    const newsTitle = news.titleDetail;
    const newsDetails = news.newsDetail;
    const avartar = news.avartar;
    const linkParent = news.type.linkParent;
    const linkChilrent = news.type.linkChilrent;
    res.render('news', {
      newsTitle,
      newsDetails,
      avartar,
      linkParent,
      linkChilrent,
    });
  } catch (error) {}
};
