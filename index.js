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
        denonClient.setPower(Denon.Options.PowerOptions.Standby);
        break;
      case "VOLUME UP":
        denonClient.setVolume(Denon.Options.VolumeOptions.Up);
        break;
      case "VOLUME DOWN":
        denonClient.setVolume(Denon.Options.VolumeOptions.Down);
        break;
      case "MUTE TOGGLE":
        denonClient.once('muteChanged', function(status){
          console.log("muteChanged");
          if (status == "ON"){
            denonClient.setMute(Denon.Options.MuteOptions.Off);
          } else {
            denonClient.setMute(Denon.Options.MuteOptions.On);
          }
        });
        denonClient.getMute();
        break;
      case 'INPUT CD':
          denonClient.setInput(Denon.Options.InputOptions.CD);
          break;
      case 'INPUT TUNER':
          denonClient.setInput(Denon.Options.InputOptions.Tuner);
          break;
      case 'INPUT DVD':
          denonClient.setInput(Denon.Options.InputOptions.DVD);
          break;
      case 'INPUT BD':
          denonClient.setInput(Denon.Options.InputOptions.BD);
          break;
      case 'INPUT TV':
          denonClient.setInput(Denon.Options.InputOptions.TV);
          break;
      case 'INPUT SAT/CBL':
          denonClient.setInput(Denon.Options.InputOptions.Sattalite);
          break;
      case 'INPUT SAT/CBL':
          denonClient.setInput(Denon.Options.InputOptions.Cable);
          break;
      case 'INPUT SMPLAY':
          denonClient.setInput(Denon.Options.InputOptions.MediaPlayer);
          break;
      case 'INPUT GAME':
          denonClient.setInput(Denon.Options.InputOptions.Game);
          break;
      case 'INPUT GAME2':
          denonClient.setInput(Denon.Options.InputOptions.Game2);
          break;
      case 'INPUT DOCK':
          denonClient.setInput(Denon.Options.InputOptions.Dock);
          break;
      case 'INPUT V.AUX':
          denonClient.setInput(Denon.Options.InputOptions.VAux);
          break;
      case 'INPUT NET/USB':
          denonClient.setInput(Denon.Options.InputOptions.NetUsb);
          break;
      case 'INPUT AUX1':
          denonClient.setInput(Denon.Options.InputOptions.Aux1);
          break;
      case 'INPUT AUX2':
          denonClient.setInput(Denon.Options.InputOptions.Aux2);
          break;
      case 'INPUT MPLAY':
          denonClient.setInput(Denon.Options.InputOptions.MPlay);
          break;
      case 'INPUT MXPORT':
          denonClient.setInput(Denon.Options.InputOptions.MXPort);
          break;
      case 'INPUT NET':
          denonClient.setInput(Denon.Options.InputOptions.Net);
          break;
      case 'INPUT USB/IPOD':
          denonClient.setInput(Denon.Options.InputOptions.IPod);
          break;
      case 'INPUT USB':
          denonClient.setInput(Denon.Options.InputOptions.USB);
          break;
      case 'INPUT VDP':
          denonClient.setInput(Denon.Options.InputOptions.VDP);
          break;
    }
  });

const controller = {
  onButtonPressed: function onButtonPressed(name) {
    console.log(`[denon-avr] [Pressed] ${name}`);

    code = name;

    denonClient.connect();
  }
};

const avr = neeoapi.buildDevice('DENON AVR IP')
  .setManufacturer('DENON')
  .setType('AVRECEIVER')

  .addButtonGroup('POWER')
  .addButtonGroup('VOLUME')

  .addButton({ name: 'INPUT CD', label: 'CD' })
  .addButton({ name: 'INPUT TUNER', label: 'Tuner' })
  .addButton({ name: 'INPUT DVD', label: 'DVD' })
  .addButton({ name: 'INPUT BD', label: 'BD' })
  .addButton({ name: 'INPUT TV', label: 'TV' })
  .addButton({ name: 'INPUT SAT/CBL', label: 'Cable' })
  .addButton({ name: 'INPUT SMPLAY', label: 'MediaPlayer' })
  .addButton({ name: 'INPUT GAME', label: 'Game' })
  .addButton({ name: 'INPUT GAME2', label: 'Game2' })
  .addButton({ name: 'INPUT DOCK', label: 'Dock' })
  .addButton({ name: 'INPUT V.AUX', label: 'VAux' })
  .addButton({ name: 'INPUT NET/USB', label: 'NetUsb' })
  .addButton({ name: 'INPUT AUX1', label: 'Aux1' })
  .addButton({ name: 'INPUT AUX2', label: 'Aux2' })
  .addButton({ name: 'INPUT MPLAY', label: 'MPlay' })
  .addButton({ name: 'INPUT MXPORT', label: 'MXPort' })
  .addButton({ name: 'INPUT NET', label: 'Net' })
  .addButton({ name: 'INPUT USB/IPOD', label: 'IPod' })
  .addButton({ name: 'INPUT USB', label: 'USB' })
  .addButton({ name: 'INPUT VDP', label: 'VDP' })

  .addButtonHander(controller.onButtonPressed);


module.exports = {
  devices: [avr]
};
