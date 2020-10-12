/** @format */
const axios = require('axios');
const cheerio = require('cheerio');
var config = require('./config.js');

// console.log(config.url);

async function getNews() {
  const res = await axios.get(config.url);
  let $ = cheerio.load(res.data);

  const navLinks = [];
  const news = [];

  //   for (
  //     let i = 3;
  //     i < $($($(`.${config.classNav}`)[0]).find('li')).length;
  //     i++
  //   ) {
  //     const x = $($($(`.${config.classNav}`)[0]).find('li')[i])
  //       .find('a')
  //       .attr('href');

  //     let y = x.split('/');
  //     console.log(y[2]);
  //   }

  for (
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
    };
    navLinks.push(navLink);
  }
  console.log(navLinks);

  // for (let i = 50; i < navLinks.length; i++) {
  //   console.log(navLinks[i]);
  // }

  for (let i = 0; i < navLinks.length; i++) {
    console.log(
      `${config.url}${navLinks[i].linkParent}${navLinks[i].linkChilrent}`,
    );
    if (
      !config.sub.includes(navLinks[i].linkParent) &&
      !config.sub.includes(navLinks[i].linkChilrent)
    ) {
      const res = await axios
        .get(
          `${config.url}${navLinks[i].linkParent}${navLinks[i].linkChilrent}`,
        )
        .catch(err => {
          console.log(
            `${config.url}${navLinks[i].linkParent}${navLinks[i].linkChilrent}`,
          );
        });

      let $ = cheerio.load(res.data);
      let items = $(`.${config.itemsClass}`);

      const itemLimit = items.length > 10 ? config.limit : items.length;
      console.log(itemLimit);

      for (let y = 0; y < itemLimit; y++) {
        const titleConditon = $(items[y])
          .find(`.${config.titleParent}`)
          .find(config.titleChilrent)
          .text();

        console.log(titleConditon);
        if (titleConditon) {
          const item = {
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
          const detailUrl = $(items[y])
            .find(`.${config.titleParent}`)
            .find(config.titleChilrent)
            .attr('href')
            // .trim()
            .replace(config.url, '');
          console.log(`${detailUrl}`);
          if (!config.sub.includes(detailUrl)) {
            const ress = await axios.get(`${config.url}${detailUrl}`);
            let newsDetailDom = cheerio.load(ress.data);

            item.titleDetail = newsDetailDom(`.${config.titleDetail}`).text();

            const newsDetail = newsDetailDom(
              newsDetailDom(`.${config.newsDetail}`)[0],
            ).find('p');
            console.log(newsDetail.length);
            for (let i = 0; i < newsDetail.length; i++) {
              item.newsDetail.push(newsDetailDom(newsDetail[i]).text());
            }

            news.push(item);
          }
        }
      }
    }
  }

  console.log(news);
}

getNews();
