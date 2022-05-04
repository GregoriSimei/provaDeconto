import { FolhaController } from "../../controller/FolhaController";
import { Router } from "express";

const router = Router();
const folhaController = new FolhaController();

router.post("/cadastrar", folhaController.cadastrar);
router.get("/calcular", folhaController.calcular);

export const FolhaRouter = router;