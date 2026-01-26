import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type MenuItem = {
  id: string;
  label: string;
  action: () => void;
};

type MenuState = {
  open: boolean;
  x: number;
  y: number;
  items: MenuItem[];
};

const ContextMenu: React.FC = () => {
  const [menu, setMenu] = useState<MenuState>({
    open: false,
    x: 0,
    y: 0,
    items: [],
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMenu((prev) => (prev.open ? { ...prev, open: false } : prev));
  }, []);

  const copyText = useCallback(async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Ignore clipboard failures silently.
    }
  }, []);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const isEditable = !!target.closest(
        "input, textarea, select, option, [contenteditable='true'], [contenteditable='']"
      );
      const allowNative = !!target.closest("[data-native-context]");
      if (isEditable || allowNative) {
        return;
      }

      const selection = window.getSelection()?.toString().trim() ?? "";
      const link = target.closest("a[href]") as HTMLAnchorElement | null;

      const items: MenuItem[] = [];
      if (link?.href) {
        items.push({
          id: "open-new-tab",
          label: "Open Link in New Tab",
          action: () => window.open(link.href, "_blank", "noopener"),
        });
        items.push({
          id: "copy-link",
          label: "Copy Link",
          action: () => void copyText(link.href),
        });
      }
      if (selection) {
        items.push({
          id: "copy-selection",
          label: "Copy Selection",
          action: () => void copyText(selection),
        });
      }
      items.push({
        id: "copy-page-url",
        label: "Copy Page URL",
        action: () => void copyText(window.location.href),
      });

      if (items.length === 0) return;
      event.preventDefault();
      setMenu({
        open: true,
        x: event.clientX,
        y: event.clientY,
        items,
      });
    };

    const handleClick = (event: MouseEvent) => {
      if (!menu.open) return;
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      closeMenu();
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const handleScroll = () => closeMenu();
    const handleResize = () => closeMenu();

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick, true);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [closeMenu, copyText, menu.open]);

  useLayoutEffect(() => {
    if (!menu.open) return;
    const node = menuRef.current;
    if (!node) return;
    const padding = 12;
    const { width, height } = node.getBoundingClientRect();
    const maxX = window.innerWidth - width - padding;
    const maxY = window.innerHeight - height - padding;
    const x = Math.min(menu.x, maxX);
    const y = Math.min(menu.y, maxY);
    node.style.left = `${Math.max(padding, x)}px`;
    node.style.top = `${Math.max(padding, y)}px`;
    gsap.fromTo(
      node,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.16, ease: "power2.out" }
    );
  }, [menu.open, menu.x, menu.y]);

  if (!menu.open) return null;

  return (
    <div ref={menuRef} className="context-menu">
      {menu.items.map((item) => (
        <button
          key={item.id}
          className="context-menu-item"
          type="button"
          onClick={() => {
            item.action();
            closeMenu();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
