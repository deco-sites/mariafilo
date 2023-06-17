import type { Product } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  current: Product;
  similars: Product[];
}

interface ProductIDProps {
  productGroupID?: string;
}

const ThumbColors = ({ current, similars }: Props) => {
  const thumb = current?.image?.find((img) => {
    return img.alternateName === "thumb";
  });

  const filteredSimilars = similars.reduce(
    (acumulador: (Product & ProductIDProps)[], similar: Product) => {
      const check = acumulador.find((acc) => {
        return (acc.productGroupID ===
          similar.isVariantOf?.productGroupID);
      });

      const similarInStock = similar.isVariantOf?.hasVariant.find((varOf) => {
        const checkAvailability = varOf.offers?.offers.find((offer) => {
          return (offer.availability.includes("/InStock"));
        });
        return checkAvailability !== undefined;
      });

      if (!check && similarInStock) {
        return [
          ...acumulador,
          {
            ...similarInStock,
            productGroupID: similar.isVariantOf?.productGroupID,
          },
        ];
      }

      return [
        ...acumulador,
      ];
    },
    [],
  );

  console.log({ filteredSimilars });

  return (
    <div class={`inline-flex gap-2`}>
      {thumb && thumb.url && (
        <div class={`thumb active`}>
          <div>
            <Image
              src={thumb.url}
              width={34}
              height={34}
            />
          </div>
        </div>
      )}
      {filteredSimilars.map((similar) => {
        const similarThumb = similar?.image?.find((img) => {
          return img.alternateName === "thumb" ||
            img.alternateName?.includes("_10-");
        });

        if (!similarThumb) return null;

        return (
          <a class={`thumb`} href={similar.url}>
            <div>
              <Image
                src={similarThumb.url!}
                width={34}
                height={34}
              />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ThumbColors;
