import { Crypto } from "../models/cryptoModel";

export class CryptoController {
  getCryptoData(symbol: string): Crypto {
    // Simulated data fetching
    const price = Math.random() * 50000; // Random price
    const volume = Math.random() * 1000000; // Random volume
    return { symbol, price, volume };
  }
}
