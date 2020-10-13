/** @format */

var mongoose = require('mongoose');

var navLinkSchema = new mongoose.Schema(
  {
    linkParent: { type: String, default: '' },
    linkChilrent: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  { timestamps: true },
);
var NavLink = mongoose.model('navlink', navLinkSchema, 'navlinks');
module.exports = NavLink;
