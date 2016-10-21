var phantom = require('phantom');


let phantomInst;

phantom.create([
  '--ignore-ssl-errors=yes',
  '--web-security=false'
])
.then(phantomInstance => {
  console.log('(worker): phantom is ready to go!');
  phantomInst = phantomInstance;
})
// .then(page => {
//   phantomPage = page;
// })
// .then(() => {
//   return phantomPage.close();
// })
// .catch(err => {
//   console.log(err);
// });

// .then(() => {
//   return phantomPage.renderBase64('PNG');
// })
// .then(img => {
//   console.log(img);
// })
// .catch(err => {
//   console.log(err);
// });

module.exports = (url, next) => {
  let phantomPage;
  phantomInst.createPage()
  .then(page => {
    phantomPage = page;
    return page.open(url)
  })
  .then(() => {
    return phantomPage.renderBase64('PNG');
  })
  // .then(img => {
  //   image = img;
  //   // return phantomPage.close();
  // })
  .then(img => {
    next(img);
    phantomPage.close();
  });
}