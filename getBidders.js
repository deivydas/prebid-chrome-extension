var test = document.getElementsByClassName('bs-docs-section');
var bidders = [];
for (var i = 0; i<test.length; i++) {
  if (i < 2) continue;
  var bidder = test[i].getElementsByTagName('h2')[0].innerText;
  var bidderCode = test[i].getElementsByTagName('code')[0].innerText;

  var parameters = [];
  var rows = test[i].getElementsByTagName('tr');
  for (var a = 0; a<rows.length; a++) {
    var colums = rows[a].children;
    if (colums.length <= 0) continue;
    if (colums[1].innerText === 'required') {
      parameters.push(colums[0].innerText);
    }
    if (bidderCode === 'rubicon' && colums[2].innerText === 'required') {
      bidder = 'Rubicon Project';
      parameters.push(colums[0].innerText);
    }
  }

  bidders.push({
    name: bidder,
    code: bidderCode,
    parameters: parameters,
  });
}

console.log(bidders);