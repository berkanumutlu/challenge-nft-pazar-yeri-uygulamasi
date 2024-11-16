import { Router } from "express";
import authRoutes from "@/endpoints/auth/routes";
import nftRoutes from "@/endpoints/nft/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/nft", nftRoutes);
// ... Diğer endpointlere ait route tanımları

export default router;