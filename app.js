var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//setup app to use ejs templating
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//enable serving of static (css) files
app.use('/static', express.static(path.join(__dirname, 'resources')));

//register the bodyParser middleware for processing the form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//main route
app.get('', function(req, res) {
  res.render('index.html');
})

//RSS feed generation route
app.post('/generateRSS', function(req, res) {
  //set header to view XML content
  res.setHeader('content-type', 'text/xml');

  //set objects into RSS template
  res.render('generatedRSS.ejs', {
    title : req.body.rss.rsstitle,
    link : req.body.rss.link,
    description : req.body.rss.description,
    itemTitle : req.body.rss.storytitle,
    itemLink : req.body.rss.storylink,
    itemDescription : req.body.rss.storydescription
  });
})

app.listen(8000, function () {
  console.log('app.js started on port 8000');
})
