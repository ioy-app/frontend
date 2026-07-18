import { VotingOne, VotingThird, VotingTwo } from "@/icons";
import { useEffect, useState } from "react";
import Tag from "../tag";
import { BiTrophy } from "react-icons/bi";

/**
 * Vote
 * @description Voting score component for game jam nominations with 3 tier selection
 *
 * @param nomination - Name of the nomination category
 * @param jam_id - ID of the jam
 * @param game_id - ID of the game being voted on
 * @param onChange - Callback triggered with the selected score value
 * @param disabled - Prevents changing the vote selection
 * @param score - Pre-selected vote score (1-3)
 * @returns A card with a nomination tag and three clickable vote tier icons
 *
 * @example
 * <Vote nomination="Best Art" jam_id={1} game_id={2} onChange={(score) => submitVote(score)} />
 */
const Vote: React.FC<{
  nomination: string;
  jam_id: number;
  game_id: number;
  onChange?: (score: number) => void;
  disabled?: boolean;
  score?: number;
}> = ({
  nomination,
  jam_id,
  game_id,
  onChange,
  disabled,
  score
}) => {
  const [ select, setSelect ] = useState<number>(score);

  useEffect(() => {
    if (select == score)
      return;

    onChange && onChange(select);
  }, [ select ]);

  return (
    <div className="flex flex-col items-center gap-4 border border-br rounded-xl p-4 w-full">
      <Tag
        title={nomination}
        nolink
        icon={<BiTrophy />}
      />
      <div className="flex gap-4" key={select}>
        <div
          className={`transition-opacity w-12 ${select != 1 && "opacity-25" || ""} ${!disabled && "hover:opacity-100 cursor-pointer" || ""}`}
          onClick={() => !disabled && setSelect(1)}
        >
          <img
            src={VotingOne}
            className="w-full h-full"
          />
        </div>
        <div
          className={`transition-opacity w-12 ${select != 2 && "opacity-25" || ""} ${!disabled && "hover:opacity-100 cursor-pointer" || ""}`}
          onClick={() => !disabled && setSelect(2)}
        >
          <img
            src={VotingTwo}
            className="w-full h-full"
          />
        </div>
        <div
          className={`transition-opacity w-12 ${select != 3 && "opacity-25" || ""} ${!disabled && "hover:opacity-100 cursor-pointer" || ""}`}
          onClick={() => !disabled && setSelect(3)}
        >
          <img
            src={VotingThird}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Vote;