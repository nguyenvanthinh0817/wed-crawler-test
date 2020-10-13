/** @format */

var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    avartar: { type: String, default: '' },
    type: { type: Object, default: {} },
    url: { type: String, default: '' },
    titleDetail: { type: String, default: '' },
    newsDetail: [String],
  },
  { timestamps: true },
);
var News = mongoose.model('news', newsSchema, 'newss');
module.exports = News;
