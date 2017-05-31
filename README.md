# magicblue Smart Bulb Library

Control [Magic Blue](http://www.gearbest.com/smart-light-bulb/pp_230349.html) smart bulb using Web Bluetooth.

-> [Learn more about the bulb protocol in my blog post](https://medium.com/@urish/reverse-engineering-a-bluetooth-lightbulb-56580fcb7546)

## Usage example:

    import { MagicBlueBulb } from 'magicblue';

    let bulb = new MagicBlueBulb();
    bulb.connect().then(() => {
        // Set color to Red
        bulb.setColor(255, 0, 0);
    });
