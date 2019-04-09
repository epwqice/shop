const express = require('express') ;
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/uiModel/v1/layout', require('./server/rest/layout'));
app.use('/pension/v1/member_center/members', require('./server/rest/members'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'client/public')));


app.get('/', function(req, res){
  // res.sendFile(path.join(__dirname, '/src/web', 'index.html'))
  res.redirect('member/list.html');
});
//
// app.get('/check_in_manager', function(req, res){
//   // res.sendFile(path.join(__dirname, '/src/web', 'index.html'));
//
// });
//
// app.get('/vip_manager', function(req, res){
//   res.sendFile(path.join(__dirname, '/src/web', 'index.html'))
// });

if (!app.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
