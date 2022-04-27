import fetch from 'isomorphic-fetch';
import { Coins, LCDClient } from '@terra-money/terra.js';
const gasPrices =  await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices');
const gasPricesJson = await gasPrices.json();

// LCD stands for "Light Client Daemon". I don't really know much about it, but
// this is how you talk to Terra from JS.
const client = new LCDClient({
  URL: "https://bombay-lcd.terra.dev/", // Use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra.
  chainID: "bombay-12", // Use "columbus-5" for production or "localterra".
  gasPrices: { uluna: gasPricesJson['uluna'] }, // Always pay fees in Luna. You can change this to pay fees in other currencies like UST, if you prefer.
  gasAdjustment: "1.5", // Increase gas price slightly so transactions go through smoothly.
  gas: 10000000,
});


import { MnemonicKey } from '@terra-money/terra.js';

const wallets = {
  wallet1: client.wallet(new MnemonicKey({
    mnemonic: "marriage mixture claw champion degree attack fragile stem wolf wise group favorite group drum expand urban clip innocent doctor sting fall liquid shy quit",
  })),
  wallet2: client.wallet(new MnemonicKey({
    mnemonic: "warm lucky circle bicycle quote lemon omit one robot include fruit fix coach parrot identify glance foil random fox tornado diagram twist flat picnic",
  })),
};

export { client, wallets };
