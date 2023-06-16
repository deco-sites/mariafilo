import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
}

function AddToCartButton(
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

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

export default AddToCartButton;
