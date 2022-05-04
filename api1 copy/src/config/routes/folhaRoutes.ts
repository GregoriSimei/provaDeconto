import { FolhaController } from "../../controller/FolhaController";
import { Router } from "express";

const router = Router();
const folhaController = new FolhaController();

router.post("/cadastrar", folhaController.cadastrar);
router.get("/listar", folhaController.listar);
router.get("/consultar/:cpf/:mes/:ano", folhaController.filtrar);

export const FolhaRouter = router;