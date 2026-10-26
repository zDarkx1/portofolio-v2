import type { ComponentType, MouseEventHandler, ReactNode } from "react";
export type FrameStatus = "queued" | "generating" | "refining" | "complete" | "error";
export type RefineFrameProps = {
  status?: FrameStatus; children?: ReactNode; aspectRatio?: string; width?: number; radius?: number;
  background?: string; color?: string; stageDuration?: number; sweep?: boolean; showStatus?: boolean;
  hideAfter?: number; labels?: Partial<Record<FrameStatus, string>>; retryLabel?: string;
  onRetry?: MouseEventHandler<HTMLButtonElement>; ariaLabel?: string; className?: string;
};
declare const RefineFrame: ComponentType<RefineFrameProps>;
export default RefineFrame;
