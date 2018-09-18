import * as messaging from "messaging";

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// You need the YYYY-MM-DD format to use fitbit webAPI
export function formatDate(date) {
  return date.getFullYear()+"-"+zeroPad(date.getMonth()+1)+"-"+zeroPad(date.getDate());
}
export function sendToServer(data){
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          //Send object as JSON string to companion
          messaging.peerSocket.send(JSON.stringify(data));
     }
  
}