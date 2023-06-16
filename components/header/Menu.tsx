import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title">{item.label}</div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class="underline text-sm" href={item.href}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="px-4 pt-4 pb-[env(safe-area-inset-bottom)] flex-grow flex flex-col divide-y divide-base-200 overflow-auto h-[calc(100%-313px)]">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex justify-between p-6 bg-role-neutral-light-1 shadow-[0px_0px_8px_-3px_#CCCCCC]">
        <li>
          <a
            class="flex flex-col items-center px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" width={20} height={20} strokeWidth={2} />
            <span class="text-sm">Conta</span>
          </a>
        </li>
        <li>
          <a
            class="flex flex-col items-center px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Heart" width={20} height={20} strokeWidth={2} />
            <span class="text-sm">Wishlist</span>
          </a>
        </li>
        <li>
          <a
            class="flex flex-col items-center px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" width={20} height={20} strokeWidth={2} />
            <span class="text-sm">Lojas</span>
          </a>
        </li>
      </ul>
    </>
  );
}

export default Menu;
