import { useId, useLayoutEffect } from "preact/hooks";

import Modal from "$store/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "$store/sdk/useUI.ts";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Bullets } from "$store/components/header/Header.tsx";

import Image from "deco-sites/std/components/Image.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

import Buttons from "$store/islands/HeaderButton.tsx";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  menu: MenuProps;
  bullets?: Bullets[];
  searchbar?: SearchbarProps;
}

function Modals({ menu, bullets, searchbar }: Props) {
  const { displayCart, displayMenu, displaySearchbar } = useUI();

  const bulletScroll = useId();

  useLayoutEffect(() => {
    console.log(bulletScroll);
    if (displayMenu.value) {
      console.log(document.getElementById(bulletScroll));
    }
  }, [displayMenu.value]);

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      <Modal
        mode="sidebar-left"
        useHeader={false}
        loading="lazy"
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <header
            class={`flex justify-between items-center py-[3px] bg-role-neutral-light-1 border-b border-role-neutral-light-3`}
          >
            <Button
              class="btn btn-ghost"
              onClick={() => {
                displayMenu.value = false;
              }}
            >
              <Icon id="XMark" width={20} height={20} strokeWidth={2} />
            </Button>
            <Button
              class="btn btn-ghost"
              onClick={() => {
                displaySearchbar.value = !displaySearchbar.peek();
              }}
            >
              <Icon
                id="MagnifyingGlass"
                width={20}
                height={20}
                strokeWidth={0.1}
              />
            </Button>
          </header>
          <div
            class={`py-6 overflow-scroll whitespace-nowrap scrollbar-none border-b border-role-neutral-light-3`}
            id={bulletScroll}
          >
            {bullets?.map((bullet, idx) => {
              return (
                <a
                  href={bullet.redirect_url}
                  class={`relative rounded-full inline-flex content-center justify-center ${
                    idx === 0 ? "ml-4" : ""
                  } mr-4 w-[116px] h-[116px]`}
                >
                  <Image src={bullet.image_url} width={116} height={116} />
                  <span
                    class={`absolute text-center top-1/2 w-fit translate-y-[-50%] text-role-neutral-light-1 font-normal`}
                  >
                    {bullet.title}
                  </span>
                </a>
              );
            })}
          </div>
          <Menu {...menu} />
        </Suspense>
      </Modal>

      <Modal
        title="Buscar"
        mode="sidebar-right"
        loading="lazy"
        open={displaySearchbar.value &&
          window?.matchMedia("(max-width: 767px)")?.matches}
        onClose={() => {
          displaySearchbar.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Searchbar {...searchbar} />
        </Suspense>
      </Modal>

      <Modal
        title="Minha sacola"
        mode="sidebar-right"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={fallback}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
