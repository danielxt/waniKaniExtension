// so all links wiork
document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const apiButton = document.getElementById("apiButton")
    if (apiButton) {
        document.getElementById('apiButton').addEventListener('click', main);
    }
    
});

function main() {
    
    const apiInput = document.getElementById("apiInput").value;
    const response = checkValidApiKey(apiInput, 'user')
    if (!response) { // handle failiure
        console.log("fail")
        return false
    }
    else {
        chrome.storage.sync.set({'apiKey': apiInput});
        chrome.storage.sync.set({'loggedIn' : true});
        
        loadUserPage();

        // chrome.storage.sync.get(["apiKey"]).then((data) => {
        //     alert(data.apiKey);
        // });
    }
}


async function checkValidApiKey(apiToken, apiEndpointPath) {
    // var apiToken = '7af47b26-693c-436b-825c-2ebc836b6c2f';
    var requestHeaders =
      new Headers({
      Authorization: 'Bearer ' + apiToken,
    }); 
    var apiEndpoint =
      new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
  
        method: 'GET',
        headers: requestHeaders
    });

    // run through to check if valid
    fetch(apiEndpoint).then(function(response) {
        if(response.status == 401) {
            return false;
        }
    })

    const response = await(fetch(apiEndpoint))


    return response.json();
  }
  





// valid queries: assignments, level_progressions, resets, reviews, review_statistics, 
// spaced_repetition_systems, study_materials, subjects, summary, user, voice_actors
async function fetchData(apiEndpointPath) {
    // var apiToken = '7af47b26-693c-436b-825c-2ebc836b6c2f';
    var apiToken = '';
    chrome.storage.sync.get(["apiKey"]).then((data) => {
        apiToken = data.apiKey;
    });
    apiToken = '7af47b26-693c-436b-825c-2ebc836b6c2f';
    console.log(apiToken);
    var requestHeaders =
        new Headers({
            Authorization: 'Bearer ' + apiToken,
            }); 
        var apiEndpoint = new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
            method: 'GET',
            headers: requestHeaders
        });
        const response = await(fetch(apiEndpoint))
        return response.json();
  }
  

  
  
  async function loadUserPage() {
    // 1. grab data
    var jsonUser = await fetchData('user');
    var jsonSummary = await fetchData('summary');
  
    // 2. query data
  
    var userName = jsonUser['data']['username']
    var level = jsonUser['data']['level']
  
    var availableLessons = jsonSummary['data']['lessons'][0]['subject_ids'].length
    var availableReviews = jsonSummary['data']['reviews'][0]['subject_ids'].length;
  
    
    var nextReviewsTime = new Date(jsonSummary['data']['next_reviews_at'])
    nextReviewStr = nextReviewsTime.toLocaleString()
  
    // var currentTime = new Date()
  
    // 3. send to doc
  
    document.getElementById("username").innerHTML = userName;
    document.getElementById("level").innerHTML = level;
  
    document.getElementById("availableLessons").innerHTML = availableLessons;
    document.getElementById("availableReviews").innerHTML = availableReviews;
  
    document.getElementById("nextReviewsAt").innerHTML = nextReviewStr;
    let profilePic = document.getElementById("profilePic")
    profilePic.src = chrome.runtime.getURL("/images/waniProfilePic.jpg")
  
    // 4. handle events
    
    if (availableReviews == 0) {
      document.getElementById("nextReviews").style.display ="block";
      console.log("passs")
    }
    else {
      document.getElementById("nextReviews").style.display ="none";
    }
  }
  

  
  
  
  
  
  
  
