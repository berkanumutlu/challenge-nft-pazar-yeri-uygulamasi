import { Router } from 'express';
import { authToken, authUser } from '@/middlewares/auth';
import * as NftController from "../controllers/NFT";

const nftRouter = Router();

nftRouter.post("/list", NftController.list);
nftRouter.post("/get", NftController.get);

nftRouter.use(authToken);
nftRouter.post("/create", authUser, NftController.create);
nftRouter.put("/update", authUser, NftController.update);
nftRouter.delete("/delete", authUser, NftController.deleteRecord);
nftRouter.patch("/restore", authUser, NftController.restore);

export default nftRouter;