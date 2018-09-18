import * as messaging from "messaging";
import { me } from "companion";
import { settingsStorage } from "settings";
import { APIClientCredentials } from '../common/APIClientCredentials.js';
import * as util from "../common/utils";


console.log("Companion Running ");
// The Device application caused the Companion to start
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization','Basic '+APIClientCredentials.base64UserPassword);
myHeaders.append('encodedId',settingsStorage.getItem('encodedId'));
if (me.launchReasons.peerAppLaunched) {
  // The Device application caused the Companion to start
  console.log("Device application was launched!")
}

//console.log('encodedId---'+settingsStorage.getItem('encodedId'));
//When the watch sends a message
messaging.peerSocket.onmessage = evt => {
 // console.log('recived-- '+JSON.stringify(evt.data));
  var url = APIClientCredentials.host+'/getdata/';
  fetch(url, {
      method : "POST",
      headers : myHeaders,
      body: evt.data
    }) // Build the request
    .then(function(response){
      return response.json();
     }) //Extract JSON from the response
    .then(function(data) {             
      console.log("Got response from server:", JSON.stringify(data)); // Log ig
     
    }) // Send it to the watch as a JSON string
    .catch(function(error) {
      console.log(error);
  }); // Log any errors with Fetch
}

// Fetch Sleep Data from Fitbit Web API
function fetchProfileData(accessToken)  {
  fetch(`https://api.fitbit.com/1/user/-/profile.json`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    settingsStorage.setItem('encodedId',data.user.encodedId);
  })
  .catch(err => console.log('[FETCH]: ' + err));
}


// A user changes Settings
settingsStorage.onchange = evt => {
  if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    let data = JSON.parse(evt.newValue);
    fetchProfileData(data.access_token) ;
  }
};

// Restore previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key && key === "oauth") {
      // We already have an oauth token
      let data = JSON.parse(settingsStorage.getItem(key))
      fetchProfileData(data.access_token);
    }
  }
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  restoreSettings();
};

