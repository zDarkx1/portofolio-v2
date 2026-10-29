import type { SVGProps } from "react";
import { brandMarkPaths } from "@/lib/brand";

export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    {brandMarkPaths.map((path) => <path key={path} d={path} />)}
  </svg>;
}
