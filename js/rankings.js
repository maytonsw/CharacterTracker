/* Written by Sean Mayton
Interacts with the WarcraftLogs API to fetch and
analyze rankings of user characters.                */

function parseData(userRankings) {
  // console.log(`Found ${userRankings.length} reports for ${tarCharacter}.`);

  let pctRank = 0;
  let pctSum = 0;

  for (let i = 0; i < userRankings.length; i += 1) {
    const userRanking = userRankings[i];
    const date = new Date((userRanking.startTime));
    pctRank = (userRanking.rank / userRanking.outOf) * 100.0;
    pctSum += pctRank;

    console.log(date);
    console.log(`Ranking: ${userRanking.rank} out of ${userRanking.outOf}. Percentile ranking: ${pctRank.toFixed()}`);
  }
  console.log(pctSum);
  const returnString = (`${jQuery('#userCharacter').val()} Is In the Top ${(pctSum / userRankings.length).toFixed()}% of Players for ${jQuery('#logMetric').val().toUpperCase()}.`);
  document.getElementById('avgRanking').innerHTML = returnString;
}

function buildRankings() {
  const tarServer = jQuery('#userServer').val();
  const tarRegion = jQuery('#userRegion').val();
  const tarCharacter = jQuery('#userCharacter').val();
  const tarMetric = jQuery('#logMetric').val();
  const logsKey = jQuery('#userKey').val();

  const apiURL = `https://warcraftlogs.com:443/v1/rankings/character/${tarCharacter}/${tarServer}/${tarRegion}?metric=${tarMetric}&api_key=${logsKey}`;
  console.log(apiURL);
  jQuery.ajax({
    url: apiURL, method: 'POST', success: parseData,
  });
}

function toggleKeyField() {
  const keyField = document.getElementById('userKey');

  if (keyField.style.display === 'none') {
    keyField.style.display = 'block';
  } else {
    keyField.style.display = 'none';
  }
}

