import { Router } from 'express';
import { FolhaRouter } from './routes/folhaRoutes';

const router = Router();
router.use('/folha', FolhaRouter);

export default router;