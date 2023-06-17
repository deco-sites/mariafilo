import { useVariantSkus } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Avatar from "$store/components/ui/Avatar.tsx";

import { useSkuSelector } from "deco-sites/fashion/sdk/useSkuSelector.ts";

export interface VariantProps {
  sku: string;
  productGroupID: string | undefined;
  skuName: string | undefined;
  availability: boolean;
}

export interface Props {
  product: Product;
}

const SkuSelector = ({ product }: Props) => {
  const variants = useVariantSkus(product);

  const { selectedSku, setSku } = useSkuSelector();

  const selector = variants.map((v) => {
    return (
      <li
        onClick={() => {
          if (v.availability) {
            if (selectedSku.value?.sku === v.sku) {
              setSku(null);
            } else {
              setSku(v);
            }
          }
        }}
        class={`flex justify-center items-center relative rounded-full w-6 h-6 text-xs ${
          selectedSku.value?.sku === v.sku ? "border" : ""
        } ${
          v.availability
            ? "cursor-pointer"
            : "text-role-neutral-light-3 after:absolute after:bg-role-neutral-light-3 after:content-[''] after:top-1/2 after:left-1/2 after:h-px after:w-6 after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-[-32deg]"
        }`}
      >
        {v.skuName}
      </li>
    );
  });

  return <ul class={`inline-flex gap-1`}>{selector}</ul>;
};

export default SkuSelector;
