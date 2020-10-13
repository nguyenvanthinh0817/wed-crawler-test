/** @format */
const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config.js');
const News = require('./model/news');
const NavLink = require('./model/navLink');
// console.log(config.url);
const mongoose = require('mongoose');
const { insertMany } = require('./model/news');

mongoose.connect(config.database, {
  /// kết nối database
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('conect success');

async function getNews() {
  const res = await axios.get(config.url);
  let $ = cheerio.load(res.data);

  const navLinks = []; // Mảng chứa các link thể loại bài báo
  const news = []; // Mảng chứa các bài báo

  for (
    // vòng for này để lấy link trên navLink rồi push vào mảng navLink
    let i = config.header;
    i < $($($(`.${config.classNav}`)[0]).find('li')).length - config.tail;
    i++
  ) {
    const item = $($($(`.${config.classNav}`)[0]).find('li')[i])
      .find('a')
      .attr('href');
    let newItem = item.split('/');
    const navLink = {
      linkParent: newItem[1] !== undefined ? '/' + newItem[1] : '',
      linkChilrent: newItem[2] !== undefined ? '/' + newItem[2] : '',
      url: config.url,
    };
    navLinks.push(navLink);
  }

  // console.log(navLinks);

  for (let i = 0; i < navLinks.length; i++) {
    // vòng for này lặp qua các trang thể loại từ mảng NavLink để lấy tin từ từng trang
    console.log(
      `${config.url}${navLinks[i].linkParent}${navLinks[i].linkChilrent}`,
    );
    if (
      // sẽ không truy cập vào những đường link đã config ở sub
      !config.sub.includes(navLinks[i].linkParent) &&
      !config.sub.includes(navLinks[i].linkChilrent)
    ) {
      const res = await axios
        .get(
          // vd: linkParent = the-gioi , linkChilrent = bau-cu-tong-thong, ghep lai ta duoc the-gioi/bau-cu...
          `${config.url}${navLinks[i].linkParent}${navLinks[i].linkChilrent}`,
        )
        .catch(err => {
          console.log(
            `${config.url}${navLinks[i].linkParent}${navLinks[i].linkChilrent}`,
            err,
          );
        });

      let $ = cheerio.load(res.data);
      let items = $(`.${config.itemsClass}`); // Lấy dom của class tên là giá trị của itemClass trong config

      const itemLimit = items.length > 10 ? config.limit : items.length; // Vì số lượng tin quá nhiều nên giới hạn là limit trong file config

      for (let y = 0; y < itemLimit; y++) {
        const titleConditon = $(items[y]) // Lấy tiêu đề của news để phục vụ cho kiểm tra bên dưới
          .find(`.${config.titleParent}`)
          .find(config.titleChilrent)
          .text();

        console.log(titleConditon); //nếu lấy được tiêu đề của news thì mới đi tiếp
        if (titleConditon) {
          const item = {
            //Tạo obj news
            title: $(items[y])
              .find(`.${config.titleParent}`)
              .find(config.titleChilrent)
              .text()
              .trim(),
            description:
              config.desChilrent === ''
                ? $(items[y]).find(`.${config.desParent}`).text()
                : $(items[y])
                    .find(`.${config.desParent}`)
                    .find(config.desChilrent)
                    .text()
                    .trim(),
            avartar: $(items[y])
              .find(config.avartarParent)
              .attr(config.avartarAttr),
            type: navLinks[i],
            url: config.url,
            newsDetail: [],
          };

          /////////////////////////////////////////////////////////

          console.log(item);

          const detailUrl = $(items[y]) // Lấy đường link xem chi tiết news
            .find(`.${config.titleParent}`)
            .find(config.titleChilrent)
            .attr('href')
            .trim()
            .replace(config.url, '');

          console.log(`${detailUrl}`); // log Link ra nếu chết ở link nào còn biết

          if (!config.sub.includes(detailUrl)) {
            // không truy cập các link đã khai báo ở config sub
            const ress = await axios
              .get(`${config.url}${detailUrl}`)
              .catch(e => {
                console.log(detailUrl, e);
              });
            let newsDetailDom = cheerio.load(ress.data);

            item.titleDetail = newsDetailDom(`.${config.titleDetail}`).text(); // lấy tiêu đề trong chi tiết news

            const newsDetail = newsDetailDom(
              //lấy mảng p nội dung trong chi tiết news
              newsDetailDom(`.${config.newsDetail}`)[0],
            ).find('p');

            for (let i = 0; i < newsDetail.length; i++) {
              //Thêm nội dung vừa lấy bên trên vào mảng newsDetail trong obj news
              item.newsDetail.push(newsDetailDom(newsDetail[i]).text());
            }

            news.push(item);
          }
        }
      }
    }
  }

  //  console.log(news);

  ///////// Thêm news vào database

  News.insertMany(news)
    .then(res => {
      console.log('News upload success!');
    })
    .catch(e => {
      console.log(e);
    });

  ///////// Thêm navLink vào database
  NavLink.insertMany(navLinks)
    .then(res => {
      console.log('NavLink upload success!');
    })
    .catch(e => {
      console.log(e);
    });

  return;
}

getNews();
