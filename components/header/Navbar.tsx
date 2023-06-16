import { useEffect, useState } from "preact/hooks";

import classnames from "classnames";

import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  const [boolIsSticky, setBoolIsSticky] = useState(false);

  // Sticky Menu Area
  useEffect(() => {
    // deno-lint-ignore no-window-prefix
    window.addEventListener("scroll", isSticky);
    return () => {
      // deno-lint-ignore no-window-prefix
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 1 ? setBoolIsSticky(true) : setBoolIsSticky(false);
  };

  return (
    <>
      {/* Mobile Version */}
      <div
        class={classnames(
          `lg:hidden flex flex-row justify-between items-center w-full px-2 h-[44px] sticky`,
          boolIsSticky
            ? "top-0 bg-role-neutral-light-1 border-b border-role-neutral-light-3"
            : "top-[34px]",
        )}
      >
        <Buttons variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center left-1/2 top-[calc(50%-2px)] translate-x-[-50%] translate-y-[-50%] absolute"
          aria-label="Store logo"
        >
          <Icon
            id="Logo"
            width={175}
            height={28}
          />
        </a>

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div
        class={classnames(
          `hidden lg:flex flex-row justify-between items-center w-full px-2 h-[76px] sticky hover:bg-role-neutral-light-1 hover:border-b hover:border-role-neutral-light-3 transition-all`,
          boolIsSticky
            ? "top-0 bg-role-neutral-light-1 border-b border-role-neutral-light-3"
            : "top-[34px]",
        )}
      >
        <div class="flex-none w-44">
          <a href="/" aria-label="Store logo" class="block px-4 py-3 w-[160px]">
            <Icon id="Logo" width={175} height={28} />
          </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem isSticky={boolIsSticky} item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <Buttons variant="search" />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              size={20}
              strokeWidth={2}
              fill="none"
            />
          </a>
          <Buttons variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
