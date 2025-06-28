// src/layout/header/NavItem.tsx

import React from "react";

interface NavItemProps {
  label: string;
  href: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, onClick, isActive }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200
        ${isActive ? "text-primary" : "text-textSecondary hover:text-primary"}
      `}
    >
      {label}
    </a>
  );
};

export default NavItem;
