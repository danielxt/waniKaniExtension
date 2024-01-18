async function fetchData() {
    var apiToken = '7af47b26-693c-436b-825c-2ebc836b6c2f';
  var apiEndpointPath = 'user';
  var requestHeaders =
    new Headers({
      Authorization: 'Bearer ' + apiToken,
    });
  var apiEndpoint =
    new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
      method: 'GET',
      headers: requestHeaders
  });
  const response = await(fetch(apiEndpoint))
  return response.json();
  
}

async function main() {
  let json = await fetchData();
  document.getElementById("username").innerHTML = json['data']['username'];
  document.getElementById("level").innerHTML = json['data']['level'];
}

main();






