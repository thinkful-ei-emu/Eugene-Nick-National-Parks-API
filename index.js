'use strict';

const apiKey = 'BO1jzGlnrEZJpPdc0gBIFfwF6rYAtLVV5mkMFsF4'; // updated to NPS api key
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getParks(stateAbr, maxResults=10) {
  const params = {
    stateCode: stateAbr,
    limit: maxResults,
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString + '&api_key=' + apiKey;
  console.log(url);
  const options = {
    //headers: new Headers({'X-Api-Key': apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function displayResults(responseJson, maxResults) {
  console.log('responseJson: ',responseJson);
  $('#js-error-message').empty();
  $('#results-list').empty();

  for (let i = 0; i < maxResults; i++) {
    $('#results-list').append(

      
  }
  //responseJson.data. {
  //   $('#results-list').append(
  //     `
  //       <li><h3><a href="${article.url}">${article.title}</a></h3>
  //       <p>${article.source.name}</p>
  //       <p>By ${article.author}</p>
  //       <p>${article.description}</p>
  //       <img src='${article.urlToImage}'>
  //       </li>
  //     `
  //   );
  // });


  $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);