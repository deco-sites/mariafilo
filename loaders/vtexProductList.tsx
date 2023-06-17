import type { ProductID } from "deco-sites/std/packs/vtex/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { Sort } from "deco-sites/std/packs/vtex/types.ts";
import type { FnContext } from "$live/types.ts";
import type { Manifest } from "../live.gen.ts";

export interface CollectionProps extends CommonProps {
  // TODO: pattern property isn't being handled by RJSF
  /**
   * @title Collection ID (e.g.: 139)
   * @pattern \d*
   */
  collection: string;
  /**
   * @description search sort parameter
   */
  sort?: Sort;
  /** @description total number of items to display. Required for collection */
  count: number;
}

export interface QueryProps extends CommonProps {
  /** @description query to use on search */
  query: string;
  /**
   * @description search sort parameter
   */
  sort?: Sort;
  /** @description total number of items to display. Required for query */
  count: number;
}

export interface ProductIDProps extends CommonProps {
  /**
   * @description SKU ids to retrieve
   */
  ids: ProductID[];
}

export interface CommonProps {
  /**
   * @title Hide Unavailable Items
   * @description Do not return out of stock items
   */
  hideUnavailableItems?: boolean;
}

// TODO: Change & to |. Somehow RJS bugs when using |
export type Props =
  & Partial<CollectionProps>
  & Partial<QueryProps>
  & Partial<ProductIDProps>;

// deno-lint-ignore ban-types
type Context = FnContext<{}, Manifest>;

/**
 * @title Product List with Similars
 * @description Useful for shelves and galleries.
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: Context,
): Promise<Product[] | null> => {
  const products = await ctx.invoke(
    "deco-sites/std/loaders/vtex/intelligentSearch/productList.ts",
    props,
  );

  if (!products) return null;

  const similars = await Promise.all(products.map((product: Product) => {
    return ctx.invoke(
      "deco-sites/std/loaders/vtex/legacy/relatedProductsLoader.ts",
      {
        id: product.isVariantOf?.productGroupID,
        crossSelling: "similars",
        count: 10,
      },
    );
  }));

  return products.map((product, idx) => {
    const similarFound = similars[idx];

    if (similarFound) {
      product.isSimilarTo = similarFound;
    }

    return product;
  });
};

export default loader;
