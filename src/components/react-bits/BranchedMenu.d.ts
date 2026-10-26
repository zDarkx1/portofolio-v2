import type { ComponentType, ReactNode } from "react";
export type BranchedMenuLeaf = { value: string; label: string; icon?: ReactNode };
export type BranchedMenuItem = { label: string; value?: string; children?: BranchedMenuLeaf[] };
export type BranchedMenuProps = {
  items?: BranchedMenuItem[]; defaultOpen?: number | number[]; defaultActive?: string;
  onSelect?: (value: string, item: BranchedMenuLeaf | BranchedMenuItem) => void;
  onToggle?: (index: number, open: boolean) => void; color?: string; accentColor?: string; lineColor?: string;
  width?: number; rowHeight?: number; indent?: number; trunk?: number; radius?: number; lineWidth?: number;
  fontSize?: number; drawDuration?: number; foldDuration?: number; className?: string; ariaLabel?: string;
};
declare const BranchedMenu: ComponentType<BranchedMenuProps>;
export default BranchedMenu;
