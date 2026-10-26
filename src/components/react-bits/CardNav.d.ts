import type { ComponentType, CSSProperties, ElementType, ReactNode, MouseEvent } from "react";
export type CardNavLink = { label: string; href?: string; ariaLabel?: string; icon?: ReactNode };
export type CardNavItem = { label: string; description?: string; bgColor?: string; textColor?: string; links: CardNavLink[] };
export type CardNavProps = {
  logo?: ReactNode; logoAlt?: string; logoHref?: string; items?: CardNavItem[];
  cta?: { label: string; href?: string; onClick?: (event: MouseEvent) => void };
  theme?: "dark" | "light"; surface?: "glass" | "solid"; openOn?: "click" | "hover";
  cardEffect?: "rise" | "unfold" | "fade"; stagger?: number; bounce?: number; speed?: number;
  cardHeight?: number; maxWidth?: number; accentColor?: string; menuLabel?: boolean;
  intro?: boolean; defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void;
  linkComponent?: ElementType; onLinkClick?: (link: CardNavLink, item: CardNavItem, event: MouseEvent) => void;
  ariaLabel?: string; className?: string; style?: CSSProperties; actions?: ReactNode; menuText?: string; closeText?: string;
};
declare const CardNav: ComponentType<CardNavProps>;
export default CardNav;
