/*
  Returns the Heart Rate BPM, with off-wrist detection.
  Callback raised to update your UI.
*/
import * as messaging from "messaging";
import { me } from "appbit";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";
import * as util from "../../common/utils";
let hrm, hrmCallback;
let lastReading = 0;
let heartRate;

export function initialize(callback) {
    hrmCallback = callback;
    hrm = new HeartRateSensor();
    start();
    lastReading = hrm.timestamp;
}

function getReading() {
  if (hrm.timestamp === lastReading) {
    heartRate = "--";
  } else {
    heartRate = hrm.heartRate;
  }
  lastReading = hrm.timestamp;
      var data = {'heartrate' : hrm.heartRate,'timestamp':util.formatDate(new Date())}
      util.sendToServer({'key':'heartrate','data':data}); 
   
  hrmCallback({
    bpm: heartRate,
    zone: user.heartRateZone(hrm.heartRate || 0),
    restingHeartRate: user.restingHeartRate
  });
}

function start() {
    hrm.start();
    getReading();
   setInterval(getReading, 1000);
  
}


