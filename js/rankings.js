/* Written by Sean Mayton
Interacts with the WarcraftLogs API to fetch and
analyze rankings of user characters */

var tarServer, tarRegion, tarCharacter, logsKey, tarMetric, pctSum, pctRank;

function parseData(userRankings) {
    console.log("Found " + userRankings.length + " reports for "+ tarCharacter + ".");
    
    for(var i = 0; i < userRankings.length; i++) {

        var userRanking = userRankings[i];
        var date = new Date((userRanking.startTime));
        pctRank = (userRanking.rank / userRanking.outOf) * 100;
        pctSum += pctRank;
        
        console.log(date);
        console.log("Ranking: " + userRanking.rank + " out of " + userRanking.outOf + ". Percentile ranking: " + pctRank.toFixed());
        
    }

    var returnString = (tarCharacter + " is in the " + (pctSum / userRankings.length).toFixed() + "th percentile of players for " + tarMetric + ".");

    document.getElementById("avgRanking").innerHTML = returnString;
    
}



function buildRankings() {
    tarServer = jQuery("#userServer").val();
    tarRegion = jQuery("#userRegion").val();
    tarCharacter = jQuery("#userCharacter").val();
    tarMetric = jQuery("#logMetric").val();
    logsKey = jQuery("#userKey").val();

    var apiURL = "https://www.warcraftlogs.com:443/v1/rankings/character/" + tarCharacter + "/" + tarServer + "/" + tarRegion + "?metric=" + tarMetric + "&api_key=" + logsKey;
    pctSum = 0;
    pctRank = 0;

    jQuery.ajax({
        url: apiURL, type: "GET", success: parseData
    }); 
}