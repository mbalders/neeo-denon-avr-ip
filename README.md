# NEEO Driver for DENON AVRs over IP

Very minimal at this point, only added what was necessary for my setup.

## Use
* This driver is setup to be used with SDK v0.50.0
* Set your player's IP in the `package.json` file
`"neeoSdkOptions": {
  "denonIp": "192.168.1.10"
}`

## Command codes
* Basically a NEEO wrapper based on an existing node library [original](https://github.com/lmoe/node-denon-client)

## TODO:
* Add more codes