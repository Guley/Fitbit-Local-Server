import * as messaging from "messaging";
import { Gyroscope } from "gyroscope";
import * as util from "../../common/utils";
/*Gyroscope Begins*/
let gyro;
function  getReading() {
 var data = {'x':gyro.x,'y':gyro.y,'z':gyro.z,'timestamp':util.formatDate(new Date())}
 util.sendToServer({'key':'gyroscope','data':data});
}
export function start(){
  gyro = new Gyroscope({ frequency: 1 });
  gyro.start();
  getReading();
  setInterval(getReading, 1700);
}
 