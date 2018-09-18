import * as messaging from "messaging";
import { Barometer } from "barometer";
import * as util from "../../common/utils";

/*Start Barometer Data*/
let bar;

function getReading(){
    var altitudeLabel = altitudeFromPressure(bar.pressure / 100) + " ft";
    var pressureLabel = Math.round(bar.pressure / 100) + " hPa";
  var data = {'altitude' : altitudeLabel,'pressure':pressureLabel,'timestamp':util.formatDate(new Date())}
  util.sendToServer({'key':'barometer','data':data});
}

// Converts pressure in millibars to altitude in feet
// https://en.wikipedia.org/wiki/Pressure_altitude
function altitudeFromPressure(pressure) {
  return (1 - (pressure/1013.25)**0.190284)*145366.45;
}
export function start(){
  bar = new Barometer();
  bar.start();
  getReading();
  setInterval(getReading, 1500);
}