import Image from "deco-sites/std/components/Image.tsx";
import classnames from "classnames";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item, isSticky }: { item: INavItem; isSticky: boolean }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-7">
        <span class="relative lg:group-hover:after:border-b lg:group-hover:after:content-[''] lg:group-hover:after:absolute lg:group-hover:after:left-0 lg:group-hover:after:bottom-0 lg:group-hover:after:w-full lg:group-hover:after:bg-role-neutral-dark-1 lg:group-hover:after:h-[1px] lg:group-hover:after:translate-y-4">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={classnames(
              `fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen top-0 left-0`,
              isSticky ? "mt-[76px]" : "mt-[110px]",
            )}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
