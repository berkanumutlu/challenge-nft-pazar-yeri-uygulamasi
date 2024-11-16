import { Router } from "express";
import authRoutes from "@/endpoints/auth/routes";

const router = Router();

router.use("/auth", authRoutes);
// ... Diğer endpointlere ait route tanımları

export default router;