/**
 * Copyright Digital Engagement Xperience 2015
 * @description
 */

if (!dexit) {
    dexit = {};
}
if (!dexit.msdk) {
    dexit.msdk = {};
}

/**
 * Set the player url.
 * @param host {string} host name
 * @param path {string} path which should include the /   Defaults to "";
 * @param location {string} location suffix (ie.  ?location=111)  Defaults to ""
 */
dexit.msdk.setPlayerUrl = function(host,path,location) {

    var str = "https://" + host;
    if (path) {
        str+= path
    }
    if (location) {
        str+= location
    }

    var parentElement = document.getElementById('playerFrame');
    parentElement.src = str;

}
