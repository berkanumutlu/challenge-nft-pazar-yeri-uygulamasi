import { mediaFileTypes } from "@/endpoints/nft/enums/mediaFile";

export const mediaFileTypeValues = Object.values(mediaFileTypes);
export type MediaFileType = typeof mediaFileTypeValues[number];