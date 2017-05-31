export const BULB_CONTROL_SERVICE = 0xffe5;
export const BULB_CONTROL_CHARACTERISTIC = 0xffe9;

export class MagicBlueBulb {
    private characteristic: BluetoothRemoteGATTCharacteristic;

    constructor() {
    }

    async connect() {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: [BULB_CONTROL_SERVICE] }]
        });
        const gatt = await device.gatt.connect();
        const service = await gatt.getPrimaryService(BULB_CONTROL_SERVICE);
        this.characteristic = await service.getCharacteristic(BULB_CONTROL_CHARACTERISTIC);
    }

    disconnect() {
        this.characteristic.service.device.gatt.disconnect();
        this.characteristic = null;
    }

    setColor(red: number, green: number, blue: number) {
        return this.characteristic.writeValue(
            new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]));
    }

    setWarmWhite(brightness: number) {
        return this.characteristic.writeValue(
            new Uint8Array([0x56, 0, 0, 0, brightness, 0x0f, 0xaa]));
    }

    presetMode(preset: number, speed: number) {
        return this.characteristic.writeValue(
            new Uint8Array([0xbb, preset, speed, 0x44]));
    }

    powerOn() {
        return this.characteristic.writeValue(
            new Uint8Array([0xcc, 0x23, 0x33]));
    }

    powerOff() {
        return this.characteristic.writeValue(
            new Uint8Array([0xcc, 0x24, 0x33]));
    }
}
