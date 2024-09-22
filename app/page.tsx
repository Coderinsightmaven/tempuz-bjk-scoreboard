// app/page.tsx

"use client";

import TennisScoreboard from '@/components/BJKScoreBoard';
import barnesLogoUrl from '@/images/barnes_logo.png'; // Replace with your image path
import ustaLogoUrl from '@/images/usta_logo.png'; // Replace with your image path

export default function Home() {
  
  return (
    <div>
    <TennisScoreboard
      width={896}
      height={512}
      player1="E. MORGAN"
      player2="R. BIRIA"
      score1={[0, 0, 0]}
      score2={[0, 0, 0]}
      currentGamePoints1={0}
      currentGamePoints2={0}
      barnesLogoUrl={barnesLogoUrl}
      ustaLogoUrl={ustaLogoUrl}
    />

      {/* You can include input fields here if you want to make the scoreboard dynamic */}
    </div>
  );
}
