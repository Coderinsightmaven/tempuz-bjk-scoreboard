import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from "next/image";
import UstaBJKLogo from '@/images/tournament_logo.png';

interface TennisScoreboardProps {
  initialWidth?: number;
  initialHeight?: number;
  player1: string;
  player2: string;
  score1: number[];
  score2: number[];
  currentGamePoints1: number;
  currentGamePoints2: number;
  barnesLogoUrl: string | StaticImageData;
  ustaLogoUrl: string | StaticImageData;
  tournamentName: string;
  year: number;
}

export default function TennisScoreboard({
  initialWidth = 800,
  initialHeight = 400,
  player1,
  player2,
  score1,
  score2,
  currentGamePoints1,
  currentGamePoints2,
  barnesLogoUrl,
  ustaLogoUrl,
  tournamentName,
  year,
}: TennisScoreboardProps) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    const handleResize = () => {
      const scale = Math.min(window.innerWidth / 800, window.innerHeight / 400);
      setWidth(800 * scale);
      setHeight(400 * scale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scaleFactor = width / 800;

  const containerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "#000000",
    color: "white",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${10 * scaleFactor}px`,
    backgroundColor: "#1a3c5a",
  };

  const scoreboardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  };

  const playerRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: `${10 * scaleFactor}px`,
    borderBottom: "1px solid #333",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <Image
          src={barnesLogoUrl}
          alt="Barnes Logo"
          width={80 * scaleFactor}
          height={30 * scaleFactor}
        />
        <Image
          src={ustaLogoUrl}
          alt="USTA Logo"
          width={80 * scaleFactor}
          height={30 * scaleFactor}
        />
      </header>
      <main style={scoreboardStyle}>
        <div>
          <h1>{player1}</h1>
        </div>
        <div>
          <Image
            src={UstaBJKLogo}
            alt="USTA BJK Logo"
            width={195 * scaleFactor}
            height={30 * scaleFactor}
          />
          </div>
          <div>
            <h1>{player2}</h1>
          </div>
      </main>
    </div>
  );
}