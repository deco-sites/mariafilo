import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

import { useSkuSelector } from "$store/sdk/useSkuSelector.ts";
import { useUI } from "$store/sdk/useUI.ts";

import { useEffect, useState } from "preact/hooks";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const { selectedSku: selected } = useSkuSelector();
  const { displayCart } = useUI();
  const [clicked, setClicked] = useState(false);

  console.log({ selected: selected.value });

  if (
    skuId ||
    (selected.value !== null &&
      selected.value.productGroupID === productGroupId)
  ) {
    const props = useAddToCart({
      skuId: skuId || selected.value?.sku,
      sellerId,
      discount,
      price,
      productGroupId: productGroupId,
      name,
    });

    console.log("loading", props.loading);

    useEffect(() => {
      // Trigger your effect

      if (clicked && displayCart.value) {
        selected.value = null;
      }

      return () => {
        // Optional: Any cleanup code
      };
    }, [clicked, displayCart.value]);

    return (
      <Button
        data-deco="add-to-cart"
        {...props}
        class={`w-full h-12 text-sm font-normal bg-role-neutral-dark-1 hover:bg-role-neutral-dark-2 rounded-none border-none text-role-neutral-light-1`}
      >
        Adicionar à Sacola
      </Button>
    );
  }

  return (
    <div
      class={`bg-role-neutral-dark-1 text-role-neutral-light-1 w-full h-12 flex justify-center items-center text-sm`}
    >
      SELECIONE UM TAMANHO
    </div>
  );
}

export default AddToCartButton;
