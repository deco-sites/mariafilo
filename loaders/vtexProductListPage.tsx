import type { SelectedFacet } from "deco-sites/std/packs/vtex/types.ts";

import type {
  Product,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import type { Sort } from "deco-sites/std/packs/vtex/types.ts";

import type { FnContext } from "$live/types.ts";
import type { Manifest } from "../live.gen.ts";

// deno-lint-ignore ban-types
type Context = FnContext<{}, Manifest>;

/** this type is more friendly user to fuzzy type that is 0, 1 or auto. */
export type LabelledFuzzy = "automatic" | "disabled" | "enabled";

export interface Props {
  /**
   * @description overides the query term
   */
  query?: string;
  /**
   * @title Items per page
   * @description number of products per page to display
   */
  count: number;

  /**
   * @title Sorting
   */
  sort?: Sort;

  /**
   * @title Fuzzy
   */
  fuzzy?: LabelledFuzzy;

  /**
   * @title Selected Facets
   * @description Override selected facets from url
   */
  selectedFacets?: SelectedFacet[];

  /**
   * @title Hide Unavailable Items
   * @description Do not return out of stock items
   */
  hideUnavailableItems?: boolean;

  /**
   * @title Starting page query parameter offset.
   * @description Set the starting page offset. Default to 1.
   */
  pageOffset?: number;
}

/**
 * @title Product List Page with Similars
 * @description Returns data ready for search pages like category,brand pages
 */
const loader = async (
  props: Props,
  req: Request,
  ctx: Context,
): Promise<ProductListingPage | null> => {
  const products = await ctx.invoke(
    "deco-sites/std/loaders/vtex/intelligentSearch/productListingPage.ts",
    props,
  );

  if (!products) return null;

  const similars = await Promise.all(
    products.products.map((product: Product) => {
      return ctx.invoke(
        "deco-sites/std/loaders/vtex/legacy/relatedProductsLoader.ts",
        {
          id: product.isVariantOf?.productGroupID,
          crossSelling: "similars",
          count: 10,
        },
      );
    }),
  );

  const newProducts = {
    ...products,
    products: products.products.map((product: Product, idx) => {
      const similarFound = similars[idx];

      if (similarFound) {
        product.isSimilarTo = similarFound;
      }

      return product;
    }),
  };

  return newProducts;
};

export default loader;
