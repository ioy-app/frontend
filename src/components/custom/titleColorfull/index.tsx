import { useMemo } from "react";

/**
 * TitleColorfull
 * @description Gradient text title that alternates colors per character
 *
 * @param text - The text string to render with alternating colors
 * @returns A series of span elements with alternating primary and second text colors
 *
 * @example
 * <TitleColorfull text="hello world" />
 */
const TitleColorfull: React.FC<{
  text: string;
}> = ({ text }) => {
  const characters = useMemo(() => Array.from(text), [ text ]);

  return characters?.map?.((
		char: string,
		i: number
	) => (
    <span className={i % 2 != 0 ? "text-primary" : "text-second"}>
      {char}
    </span>
  ));
}

export default TitleColorfull;