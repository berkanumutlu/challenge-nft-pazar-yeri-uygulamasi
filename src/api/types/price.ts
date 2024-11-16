import { priceCurrencies } from "@/endpoints/nft/enums/priceCurrencies";

export const priceCurrencyTypeValues = Object.values(priceCurrencies);
export type PriceCurrencyType = typeof priceCurrencyTypeValues[number];