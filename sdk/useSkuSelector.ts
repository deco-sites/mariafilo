/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { VariantProps } from "$store/components/product/SkuSelector.tsx";

import { signal } from "@preact/signals";

const selectedSku = signal<VariantProps | null>(null);
const setSku = (sku: VariantProps | null) => selectedSku.value = sku;

const state = {
  selectedSku,
  setSku,
};

export const useSkuSelector = () => state;
