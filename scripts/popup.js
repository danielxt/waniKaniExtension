
// valid queries: assignments, level_progressions, resets, reviews, review_statistics, 
// spaced_repetition_systems, study_materials, subjects, summary, user, voice_actors
async function fetchData(apiEndpointPath) {
  var apiToken = '7af47b26-693c-436b-825c-2ebc836b6c2f';
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
  // 1. grab data
  var jsonUser = await fetchData('user');
  var jsonSummary = await fetchData('summary');

  // 2. query data

  var userName = jsonUser['data']['username']
  var level = jsonUser['data']['level']

  var availableLessons = jsonSummary['data']['lessons'][0]['subject_ids'].length
  var availableReviews = jsonSummary['data']['reviews'][0]['subject_ids'].length;
  
  var nextReviewsAt = jsonSummary['data']['next_reviews_at']
  nextReviewsAt = new Date(nextReviewsAt).toLocaleString()

  // 3. send to doc

  document.getElementById("username").innerHTML = userName;
  document.getElementById("level").innerHTML = level;

  document.getElementById("availableLessons").innerHTML = availableLessons;
  document.getElementById("availableReviews").innerHTML = availableReviews;

  document.getElementById("nextReviewsAt").innerHTML = nextReviewsAt;

}

main();






