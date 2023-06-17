import Image from "deco-sites/std/components/Image.tsx";

import AddToCartButton from "$store/islands/AddToCartButton.tsx";

import WishlistIcon from "$store/islands/WishlistButton.tsx";
import SkuSelector from "$store/islands/SkuSelector.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";

import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

import ThumbColors from "./ThumbColors.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

// interface SimilarProps {
//   productId: string;
// }

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 503;
const HEIGHT = 653;

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;

  // const checkLog = product.url?.includes(
  //   "/vestido-midi-cintura-elastico-preto-",
  // );

  // if (checkLog && product.isSimilarTo && product.isSimilarTo.length > 0) {
  //   console.log(JSON.stringify(product));
  // }

  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const realName = isVariantOf?.name || name;
  const [front, back] = images ?? [];

  const variantOffer = isVariantOf?.hasVariant.filter((variant) => {
    const variantOffers = variant.offers?.offers.find((v) => {
      return v.availability.includes("/InStock");
    });

    return variantOffers;
  });

  const { listPrice, price, seller, installments } = useOffer(
    variantOffer ? variantOffer[0].offers : offers,
  );

  const videoURL = isVariantOf?.additionalProperty.find((property) => {
    return (property["@type"] === "PropertyValue" &&
      property.name === "URL Video");
  });

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      Ver produto
    </a>
  );

  const similars = product.isSimilarTo && product.isSimilarTo.length > 0
    ? product.isSimilarTo
    : [];

  return (
    <div
      id={id}
      class={`card card-compact group w-full h-full text-center md:pb-7`}
      data-deco="view-product"
    >
      <div
        class={`w-full h-full lg:group-hover:shadow-[0px_0px_8px_0px_#cccccc]`}
      >
        <SendEventOnClick
          id={id}
          event={{
            name: "select_item" as const,
            params: {
              item_list_name: itemListName,
              items: [
                mapProductToAnalyticsItem({
                  product,
                  price,
                  listPrice,
                }),
              ],
            },
          }}
        />
        <figure
          class="relative "
          style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
        >
          {/* Wishlist button */}
          <div
            class={`absolute top-2 z-10 right-2`}
          >
            <WishlistIcon
              productGroupID={productGroupID}
              productID={productID}
            />
          </div>
          {/* Product Images */}
          <a
            href={url && relative(url)}
            aria-label="view product"
            class="contents"
          >
            {videoURL
              ? (
                <video
                  loop={true}
                  autoPlay={true}
                  playsInline={true}
                  muted={true}
                  poster={front.url!}
                  width={WIDTH}
                  height={HEIGHT}
                  class={`w-full h-full object-cover align-top`}
                >
                  <source type="video/mp4" src={videoURL.value}></source>
                </video>
              )
              : (
                <>
                  <Image
                    src={front.url!}
                    alt={front.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    class={`
              absolute w-full duration-500 transition-opacity opacity-100 lg:group-hover:opacity-0
            `}
                    sizes="(max-width: 640px) 50vw, 20vw"
                    preload={preload}
                    loading={preload ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <Image
                    src={back?.url ?? front.url!}
                    alt={back?.alternateName ?? front.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    class="absolute transition-opacity w-full opacity-0 lg:group-hover:opacity-100"
                    sizes="(max-width: 640px) 50vw, 20vw"
                    loading="lazy"
                    decoding="async"
                  />
                </>
              )}
          </a>
        </figure>
        {/* Prices & Name */}
        <div class="flex-auto flex flex-col px-2 py-4 gap-2 lg:gap-4 lg:flex-row lg:flex-wrap justify-between">
          <div class="flex flex-col w-full gap-0">
            <h2 class="text-base text-left lg:text-lg text-base-content">
              {realName}
            </h2>
          </div>

          <div class="flex flex-col gap-2 items-start">
            <div
              class={`flex flex-col gap-1 lg:flex-row justify-start items-baseline`}
            >
              {(listPrice! > price!) &&
                (
                  <div
                    class={`line-through text-base-300 text-xs lg:text-[0.75rem]`}
                  >
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </div>
                )}
              <div class="text-role-neutral-dark-1 text-base lg:text-base">
                {formatPrice(price, offers!.priceCurrency!)}
              </div>
            </div>
            <div>
              <div class="text-base-300 text-sm lg:text-[0.75rem]">
                {installments}
              </div>
            </div>
          </div>

          {/* SKU Selector */}
          {
            /* {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )} */
          }

          {/* SKU Selector */}
          {
            /* {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )} */
          }

          <div class={`hidden lg:group-hover:flex flex-col items-end`}>
            <div class={`mb-[2px] p-[2px] relative top-[-2px]`}>
              <ThumbColors current={product!} similars={similars} />
            </div>
            {/* SKU Selector */}
            <ul
              class={`items-center justify-start`}
            >
              <SkuSelector
                product={product}
              />
            </ul>
          </div>
        </div>
        <div class={`lg:h-12 hidden sm:block`}>
          <div
            class={`hidden group-hover:flex flex-auto items-end`}
          >
            <AddToCartButton
              sellerId={seller!}
              price={price ?? 0}
              discount={price && listPrice ? listPrice - price : 0}
              name={product.name ?? ""}
              productGroupId={product.isVariantOf?.productGroupID ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
