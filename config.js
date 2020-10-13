/** @format */
module.exports.database = 'mongodb://localhost:27017/web-crawler';

module.exports.limit = 10;

// module.exports.url = 'https://dantri.com.vn';

// module.exports.sub = [
//   // mấy đường link bên dưới đều không truy cập được hoặc truy cập không có tin tức nào
//   '/fica.vn',
//   '/www.dtinews.vn',
//   'https://video.vnexpress.net',
//   '/goc-nhin',
//   'https://video.vnexpress.net/tin-tuc/phap-luat/nhung-ten-toi-pham-den-dui-4175404.html',
//   '/video-page.htm',
//   '/tam-long-nhan-ai.htm',
// ];

// ///////// nav
// module.exports.header = 1; // Không muốn cho link đầu tiên vào data
// module.exports.tail = 0; // k uốn cho n link cuối vào data

// module.exports.classNav = 'site-menu'; // class bao các thẻ li của nav
// module.exports.typeHTML = 'a'; // thẻ bên trong thẻ li
// module.exports.attrNav = 'href'; // thuộc tính muốn lấy

// //////////////////// items

// module.exports.itemsClass = 'news-item'; // class thẻ chứa toàn bộ thông tin bên ngoài của news
// /////// title

// module.exports.titleParent = 'news-item__title'; // class chứa html tiêu đề của news

// module.exports.titleChilrent = 'a'; // html chứa nội dung title

// /////// avartar

// module.exports.avartarParent = 'img'; // html chứa ảnh đại diện cho news
// module.exports.avartarAttr = 'src'; // thuộc tính chứa link ảnh đại diện của news

// ///////// description
// module.exports.desParent = 'news-item__sapo'; // class chứa nội dung của mô tả
// module.exports.desChilrent = ''; // html chứa nội dung của mô tả nếu có, nếu không có ta để trống

// // /////////////// news Detail

// module.exports.titleDetail = 'dt-news__title'; // class chứa tiêu đề trong chi tiết news

// module.exports.newsDetail = 'dt-news__content'; // class chứa các thẻ p chứa nội dung chi tiết news

//////////////////////////////////////////////////////////////////////////////////////////////

module.exports.url = 'https://vnexpress.net';
module.exports.success = '200';

module.exports.sub = [
  '/fica.vn',
  '/www.dtinews.vn',
  'https://video.vnexpress.net',
  '/goc-nhin',
  'https://video.vnexpress.net/tin-tuc/phap-luat/nhung-ten-toi-pham-den-dui-4175404.html',
  'https://video.vnexpress.net/tin-tuc/nhip-song/hoa-si-ve-duong-bich-hoa-dai-nhat-thu-do-4174668.html',
];

module.exports.header = 0;
module.exports.tail = 0;

module.exports.classNav = 'main-nav';
module.exports.typeHTML = 'a';
module.exports.attrNav = 'href';

//////////////////// items

module.exports.itemsClass = 'item-news';
/////// title

module.exports.titleParent = 'title-news'; // class

module.exports.titleChilrent = 'a'; // html

/////// avartar

module.exports.avartarParent = 'img'; // html
module.exports.avartarAttr = 'src'; // html

///////// description
module.exports.desParent = 'description'; // class
module.exports.desChilrent = 'a'; // html

/////////////// news Detail

module.exports.titleDetail = 'title-detail'; // class

module.exports.newsDetail = 'fck_detail'; // class
