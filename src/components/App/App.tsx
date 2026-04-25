import { useState } from "react";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import NotificationMsg from "../Notification/Notification";
import css from "./App.module.css";
import type { Votes, VoteType } from "../../types/votes";

const NEW_VOTES: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const [votes, setVotes] = useState<Votes>(NEW_VOTES);

  const handleVote = (type: VoteType) => {
    setVotes((props) => ({
      ...props,
      [type]: props[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes(NEW_VOTES);
  };

  const totalVotes = votes.good + votes.bad + votes.neutral;
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <NotificationMsg />
      )}
    </div>
  );
}
