import type { ComponentType, HTMLAttributes, ReactNode, CSSProperties } from "react";
type Length = number | string;
export type TiltedCardProps = HTMLAttributes<HTMLElement> & {
  imageSrc?: string; altText?: string; captionText?: string; showTooltip?: boolean;
  overlayContent?: ReactNode; displayOverlayContent?: boolean; overlayDepth?: number;
  backContent?: ReactNode; flipOnClick?: boolean; flipped?: boolean; onFlip?: (flipped: boolean) => void;
  containerWidth?: Length; containerHeight?: Length; imageWidth?: Length; imageHeight?: Length;
  rotateAmplitude?: number; scaleOnHover?: number; perspective?: Length; radius?: Length;
  smoothness?: number; glare?: number; glareColor?: string; shadow?: number; parallax?: number;
  axis?: "both" | "horizontal" | "vertical"; reverse?: boolean; trackWindow?: boolean;
  floating?: boolean; gyroscope?: boolean; intro?: boolean; introDelay?: number;
};
declare const TiltedCard: ComponentType<TiltedCardProps>;
export declare const TiltedCardLayer: ComponentType<{ depth?: number; className?: string; style?: CSSProperties; children?: ReactNode }>;
export default TiltedCard;
