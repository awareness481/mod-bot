import { uniq } from "lodash";
import { useCallback, useMemo, useState } from "react";

export const resolutions = {
  okay: "okay",
  track: "track",
  nudge: "informalWarning",
  warning: "formalWarning",
  timeout: "timeout",
  restrict: "restrict",
  kick: "kick",
  ban: "ban",
} as const;
export type Resolution = typeof resolutions[keyof typeof resolutions];

export const useVotes = () => {
  const [votes, setVotes] = useState({} as Record<Resolution, string[]>);
  const recordVote = useCallback(
    (oldVotes: typeof votes, newVote: Resolution, userId: string) => {
      const newVotes = {
        ...oldVotes,
        [newVote]: uniq((oldVotes[newVote] || []).concat(userId)),
      };
      setVotes(newVotes);

      return Object.entries(newVotes).reduce(
        (accum, [resolution, voters]) => {
          if (voters.length > accum.voteCount) {
            // Boooo this cast because .entries() doesn't save key types
            accum.leader = resolution as Resolution;
            accum.voteCount = voters.length;
            // TODO: account for ties. actually nah just require odd number of votes
          }
          return accum;
        },
        { leader: undefined, voteCount: 0 } as {
          leader?: Resolution;
          voteCount: number;
        },
      );
    },
    [],
  );

  return useMemo(
    () => ({
      recordVote,
      votes,
    }),
    [votes, recordVote],
  );
};
