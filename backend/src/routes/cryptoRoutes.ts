import express from "express";
import { CryptoController } from "../controllers/cryptoController";

const router = express.Router();
const controller = new CryptoController();

router.get("/", (req, res) => {
  const symbol = req.query.symbol as string;
  const data = controller.getCryptoData(symbol || "BTC");
  res.json(data);
});

export default router;
