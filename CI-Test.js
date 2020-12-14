/*jshint esversion: 6 */
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3119;

const listStudent = {
  'Nguyen Thai Hoc': 6,
  'Vo Trong Phuc': 5,
  'Tan Tai Trinh': 7,
  'Hien Han': 10,
  'Nguyen Van A': 10
};

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

app.get('/numberStudent', function (req, res) {
  res.send({ numberStudent: Object.keys(listStudent).length });
});

function compare(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    } else if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}

app.get('/bestStudent', function (req, res) {
  var bestStudent = [];
  var list = [];
  for (var key of Object.keys(listStudent)) {
    list.push({
      name: key,
      point: listStudent[key]
    });
  }
  if (list.length === 0) {
    res.send({ bestStudent: bestStudent });
  }

  list.sort(compare('point'));

  var bestPoint = list[0].point;
  for (let i = 0; i < list.length; i++) {
    if (list[i].point === bestPoint) {
      bestStudent.push(list[i]);
      break;
    }
  }
  res.send({ bestStudent: bestStudent });
});


const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App is listening at http://%s:%s", host, port);
});

module.exports = server;