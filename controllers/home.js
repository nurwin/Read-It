/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.getEula = function(req, res) {
  res.render('eula', {
    title: 'Eula'
  });
};
