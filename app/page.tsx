// app/page.tsx

"use client";

import TennisScoreboard from '@/components/BJKScoreBoard';
import { useState } from 'react';
import BarnesLogo from '@/images/barnes_logo.png'; // Replace with your image path
import USTALogo from '@/images/usta_logo.png'; // Replace with your image path
import TournamentLogo from '@/images/tournament_logo.png'; // Replace with your image path

export default function Home() {
  const [player1, setPlayer1] = useState('E. MORGAN');
  const [player2, setPlayer2] = useState('R. BIRIA');
  const [score1, setScore1] = useState([4, 1]);
  const [score2, setScore2] = useState([6, 3]);
  const [currentGamePoints1, setCurrentGamePoints1] = useState(15);
  const [currentGamePoints2, setCurrentGamePoints2] = useState(30);

  return (
    <div>
      <TennisScoreboard
        player1={player1}
        player2={player2}
        score1={score1}
        score2={score2}
        currentGamePoints1={currentGamePoints1}
        currentGamePoints2={currentGamePoints2}
        barnesLogoUrl={BarnesLogo}
        ustaLogoUrl={USTALogo}
        tournamentLogoUrl={TournamentLogo}
      />

      {/* You can include input fields here if you want to make the scoreboard dynamic */}
    </div>
  );
}
