import type { DetailedHTMLProps, HTMLAttributes } from "react";

// React renders native MathML, but its JSX types do not yet include these tags.
type MathMLProps = DetailedHTMLProps<HTMLAttributes<MathMLElement> & {
  display?: "block" | "inline";
  mathvariant?: "normal";
}, MathMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      math: MathMLProps;
      mi: MathMLProps;
      mn: MathMLProps;
      mo: MathMLProps;
      mrow: MathMLProps;
      msub: MathMLProps;
      munder: MathMLProps;
      munderover: MathMLProps;
    }
  }
}
