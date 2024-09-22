import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import UstaBJKLogo from "@/images/tournament_logo.png";

interface TennisScoreboardProps {
  width?: number;
  height?: number;
  player1: string;
  player2: string;
  score1?: number[];
  score2?: number[];
  currentGamePoints1?: number;
  currentGamePoints2?: number;
  barnesLogoUrl: string | StaticImageData;
  ustaLogoUrl: string | StaticImageData;
  tournamentName: string;
  year: number;
}

export default function TennisScoreboard({
  width = 892,
  height = 512,
  player1,
  player2,
  score1 = [0, 0, 0],
  score2 = [0, 0, 0],
  currentGamePoints1 = 0,
  currentGamePoints2 = 0,
  barnesLogoUrl,
  ustaLogoUrl,
  tournamentName,
  year,
}: TennisScoreboardProps) {
  const baseWidth = 892;
  const baseHeight = 512;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scaleX = width / baseWidth;
      const scaleY = height / baseHeight;
      const scale = Math.min(scaleX, scaleY);

      containerRef.current.style.transform = `scale(${scale})`;
      containerRef.current.style.transformOrigin = "top left";
      containerRef.current.style.width = `${baseWidth}px`;
      containerRef.current.style.height = `${baseHeight}px`;

      // Hide overflow in parent container
      if (containerRef.current.parentElement) {
        containerRef.current.parentElement.style.overflow = "hidden";
      }
    }
  }, [width, height]);

  // Ensure that score arrays have exactly three elements
  const normalizedScore1 = [...score1, 0, 0, 0].slice(0, 3);
  const normalizedScore2 = [...score2, 0, 0, 0].slice(0, 3);

  const outerContainerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    overflow: "hidden",
    backgroundColor: "#000",
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#000000",
    color: "white",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  };

  const headerStyle: React.CSSProperties = {
    flex: "0 0 62.5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a3c5a",
    width: "100%",
    padding: `12.5px`,
  };

  const scoreboardStyle: React.CSSProperties = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 0, // Reset margin
    padding: 0, // Reset padding
    width: "100%",
  };

  const middleContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: `0px 0`,
    width: "100%",
    paddingRight: `20px`,
  };

  const scoreTextStyle: React.CSSProperties = {
    color: "yellow",
    fontSize: `50px`,
    marginLeft: `300px`,
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.5,
    width: "100%",
    padding: `0 50px`,
  };

  const scoreRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: `0px`,
    justifyContent: "space-between",
    width: "100%",
  };

  const setScoresStyle: React.CSSProperties = {
    display: "flex",
  };

  const setScoreStyle: React.CSSProperties = {
    marginRight: `10px`,
    minWidth: `50px`,
    textAlign: "center",
  };

  const playerNameStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    fontSize: `80px`,
  };

  return (
    <div style={outerContainerStyle}>
      <div ref={containerRef} style={containerStyle}>
        <header style={headerStyle}>
          <Image
            src={barnesLogoUrl}
            alt="Barnes Logo"
            width={250}
            height={50}
          />
          <Image src={ustaLogoUrl} alt="USTA Logo" width={250} height={50} />
        </header>
        <main style={scoreboardStyle}>
          <div style={{ margin: 0, padding: "2px 0 0 0" }}>
            <h1 style={playerNameStyle}>{player1}</h1>
          </div>
          <div style={middleContainerStyle}>
            <Image
              src={UstaBJKLogo}
              alt="USTA BJK Logo"
              width={1000}
              height={195}
            />
            <div style={scoreTextStyle}>
              {/* Player 1 Scores */}
              <div style={scoreRowStyle}>
                <div style={setScoresStyle}>
                  {normalizedScore1.map((setScore, index) => (
                    <span key={index} style={setScoreStyle}>
                      {setScore}
                    </span>
                  ))}
                </div>
                <span>{currentGamePoints1}</span>
              </div>
              {/* Player 2 Scores */}
              <div style={scoreRowStyle}>
                <div style={setScoresStyle}>
                  {normalizedScore2.map((setScore, index) => (
                    <span key={index} style={setScoreStyle}>
                      {setScore}
                    </span>
                  ))}
                </div>
                <span>{currentGamePoints2}</span>
              </div>
            </div>
          </div>
          <div>
            <h1 style={playerNameStyle}>{player2}</h1>
          </div>
        </main>
      </div>
    </div>
  );
}
