'use strict';

const neeoapi = require('neeo-sdk');

const Denon = require('denon-client');

const packageFile = require(process.cwd() + '/package.json');
const sdkOptions = packageFile.neeoSdkOptions || {};

if (sdkOptions.denonIp == undefined) {
  console.log('[DENON AVR IP] No IP address defined. package.json -> sdkOptions -> denonIp');
}

const DENON_IP = sdkOptions.denonIp;
var code;

const denonClient = new Denon.DenonClient(DENON_IP)
  .on("connect", function(){
  
    switch (code){
      case "POWER ON":
        denonClient.setPower(Denon.Options.PowerOptions.On);
        break;
      case "POWER OFF":
        denonClient.setPower(Denon.Options.PowerOptions.Off);
        break;
      case "VOLUME UP":
        denonClient.setVolume(Denon.Options.VolumeOptions.Up);
        break;
      case "VOLUME DOWN":
        denonClient.setVolume(Denon.Options.VolumeOptions.Down);
        break;
      case "INPUT BD":
        denonClient.setVolume(Denon.Options.InputOptions.BD);
        break;
      case "INPUT DVD":
        denonClient.setVolume(Denon.Options.InputOptions.DVD);
        break;

      denonClient.setInput(job);
    }
  });

const controller = {
  onButtonPressed: function onButtonPressed(name) {
    console.log(`[CONTROLLER] ${name} button pressed`);

    code = name;

    denonClient.connect();
  }
};

const avr = neeoapi.buildDevice('DENON AVR IP')
  .setManufacturer('DENON')
  .setType('AVRECEIVER')

  .addButtonGroup('POWER')
  .addButtonGroup('VOLUME')

  .addButton({ name: 'INPUT BD', label: 'Blu-ray' })
  .addButton({ name: 'INPUT DVD', label: 'DVD' })

  .addButtonHander(controller.onButtonPressed);


module.exports = {
  devices: [avr]
};
