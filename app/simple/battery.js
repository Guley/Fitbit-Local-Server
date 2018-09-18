import { charger, battery } from "power";
import document from "document";

export function initialize(){
    updateBattery();
}
//let batteryIndicatorCharge = document.getElementById('battery_charge');
let batteryIndicatorEmpty = document.getElementById('img_s_empty');
let batteryIndicatorFull = document.getElementById('img_s_full');
let batteryField = document.getElementById('batteryField');
batteryField.text = Math.floor(battery.chargeLevel);
function updateBattery() {
    let batteryPercentage = Math.floor(battery.chargeLevel);
   // if(charger.connected) {
   //      batteryIndicatorCharge.style.visibility = 'visible';
   //      batteryIndicatorFull.style.visibility = 'hidden';
   //      batteryIndicatorFull.style.visibility = 'hidden';
   //  }else 
      
      if (batteryPercentage > 30) {
      //batteryIndicatorCharge.style.visibility = 'hidden';
        batteryIndicatorEmpty.style.visibility = 'hidden';
        batteryIndicatorFull.style.visibility = 'visible';
    } else if(batteryPercentage < 30) {
        //batteryIndicatorCharge.style.visibility = 'hidden';
        batteryIndicatorEmpty.style.visibility = 'visible';
        batteryIndicatorFull.style.visibility = 'hidden';
    }
     batteryField.text = batteryPercentage+'%';
}
battery.onchange = () => updateBattery();