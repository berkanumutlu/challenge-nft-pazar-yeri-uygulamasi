import { User } from "@/endpoints/auth/models/User";
import { NFT } from "@/endpoints/nft/models/NFT";

// User & NFT ilişkileri
NFT.belongsTo(User, { foreignKey: 'createdBy' });
User.hasMany(NFT, { foreignKey: 'createdBy' });