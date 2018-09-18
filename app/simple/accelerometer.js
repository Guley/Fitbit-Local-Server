import * as messaging from "messaging";
import { Accelerometer } from "accelerometer";
import * as util from "../../common/utils";
/*Accelerometer Meter Data*/
let accel;

function getReading() {
  // Peek the current sensor values
   var data = {'x' : accel.x,'y':accel.y,'z':accel.z,'timestamp':util.formatDate(new Date())}
   util.sendToServer({'key':'accelerometer','data':data});
}

export function initialize() {
   accel = new Accelerometer({ frequency: 1 });
   accel.start();
  getReading();
  setInterval(getReading, 1200);
}
