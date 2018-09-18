<?php

        $data = json_decode(file_get_contents('php://input'), true);
        $encoded_id = $_SERVER['HTTP_ENCODEDID'];
        if(!empty($data)){
        switch ($data['key']) {
            case 'heartrate':
                $heartData = $data['data'];
                $save=[
                        'key'=>'heartrate',
                        'value'=> serialize($heartData),
                        'device_id'=> $encoded_id,
                       ];    
                break;
            case 'accelerometer':
                $accelerometerData = $data['data'];
                $save=[
                        'key'=>'accelerometer',
                        'value'=> serialize($accelerometerData),
                        'device_id'=> $encoded_id,
                       ];    
                break;
            case 'barometer':
               $barometerData = $data['data'];
               $save=[
                        'key'=>'barometer',
                        'value'=> serialize($barometerData),
                        'device_id'=> $encoded_id,
                       ];
                break;
              case 'gyroscope':
               $gyroscopeData = $data['data'];
               $save=[
                        'key'=>'gyroscope',
                        'value'=> serialize($gyroscopeData),
                        'device_id'=> $encoded_id,
                       ];    
                break;  
                case 'activity':
                 $activityData = $data['data'];
                 $save=[
                          'key'=>'activity',
                          'value'=> serialize($activityData),
                          'device_id'=> $encoded_id
                         ];    
                break; 
                default:
                $save=[];
                break;
        }
    }

 echo json_encode(array('response'=>'ok'));
 exit;
