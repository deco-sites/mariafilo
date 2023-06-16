import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType, SectionProps } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

// import {  } from "$fresh/runtime.ts";

import Alert from "./Alert.tsx";
import Navbar from "$store/islands/Navbar.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Bullets {
  /** @title Title */
  title?: string;
  /** @title Image */
  image_url: Image;
  /** @title URL */
  redirect_url: string;
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;

  /**
   * @title Mobile Menu Bullets
   */
  bullets?: Bullets[];
}

export const loader = (props: Props, req: Request) => {
  console.log({ req });

  return { ...props, request: req };
};

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  bullets,
  request,
}: SectionProps<typeof loader>) {
  const searchbar = { ..._searchbar, products, suggestions };

  console.log(request);

  return (
    <>
      <header class="z-50 relative">
        <div class="bg-transparent hover:bg-role-neutral-light-1 hover:border-b-role-neutral-light-3 w-full z-50">
          <Alert alerts={alerts} />
          <Navbar items={navItems} searchbar={searchbar} />
        </div>

        <Modals
          menu={{ items: navItems }}
          bullets={bullets}
          searchbar={searchbar}
        />
      </header>
      <div class={`lg:h-0 h-[44px]`}></div>
    </>
  );
}

export default Header;
