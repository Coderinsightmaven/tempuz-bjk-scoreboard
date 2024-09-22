import React, { useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import UstaBJKLogo from '@/images/tournament_logo.png';

interface TennisScoreboardProps {
  width?: number;
  height?: number;
  player1: string;
  player2: string;
  score1?: number[];
  score2?: number[];
  currentGamePoints1?: number;
  currentGamePoints2?: number;
  servingPlayer?: 'player1' | 'player2';
  arrowImageUrl?: string | StaticImageData;
  barnesLogoUrl: string | StaticImageData;
  ustaLogoUrl: string | StaticImageData;
  tournamentName: string;
  year: number;
}

export default function TennisScoreboard({
  width = 896,
  height = 512,
  player1,
  player2,
  score1 = [0, 0, 0],
  score2 = [0, 0, 0],
  currentGamePoints1 = 0,
  currentGamePoints2 = 0,
  servingPlayer = 'player1',
  arrowImageUrl,
  barnesLogoUrl,
  ustaLogoUrl,
  tournamentName,
  year,
}: TennisScoreboardProps) {
  const baseWidth = 896;
  const baseHeight = 512;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scaleX = width / baseWidth;
      const scaleY = height / baseHeight;
      const scale = Math.min(scaleX, scaleY);

      containerRef.current.style.transform = `scale(${scale})`;
      containerRef.current.style.transformOrigin = 'top left';
      containerRef.current.style.width = `${baseWidth}px`;
      containerRef.current.style.height = `${baseHeight}px`;

      // Hide overflow in parent container
      if (containerRef.current.parentElement) {
        containerRef.current.parentElement.style.overflow = 'hidden';
      }
    }
  }, [width, height]);

  // Ensure that score arrays have exactly three elements
  const normalizedScore1 = [...score1, 0, 0, 0].slice(0, 3);
  const normalizedScore2 = [...score2, 0, 0, 0].slice(0, 3);

  // Styles
  const outerContainerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    overflow: 'hidden',
    backgroundColor: '#000',
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  };

  const headerStyle: React.CSSProperties = {
    flex: '0 0 62.5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a3c5a',
    width: '100%',
    padding: '12.5px',
  };

  const scoreboardStyle: React.CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    width: '100%',
  };

  const playerNameStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    fontSize: '80px',
    lineHeight: '1',
  };

  const middleContainerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    alignItems: 'stretch', // Ensure children stretch to the container's height
  };

  const logoContainerStyle: React.CSSProperties = {
    flexShrink: 0,
  };

  const scoresWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexGrow: 1,
    border: '5px solid white',
  };

  const setScoresContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    borderRight: '5px solid white',
    backgroundColor: '#1a3c5a',
  };

  const currentGamePointsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
  };

  const scoresRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
  };

  const arrowContainerStyle: React.CSSProperties = {
    width: '20px', // Fixed width for the arrow container
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const scoreNumberStyle: React.CSSProperties = {
    minWidth: '80px',
    textAlign: 'center',
    color: 'white',
    fontSize: '100px',
    lineHeight: '1',
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: '40px',
    color: 'yellow',
  };

  // Function to render the serving arrow
  const renderServingArrow = (player: 'player1' | 'player2') => {
    if (servingPlayer === player) {
      if (arrowImageUrl) {
        return (
          <Image
            src={arrowImageUrl}
            alt="Serving Arrow"
            width={50}
            height={50}
          />
        );
      } else {
        return <span style={arrowStyle}>➤</span>;
      }
    }
    // Return an empty space to reserve the width
    return <div style={{ width: '50px' }}></div>;
  };

  return (
    <div style={outerContainerStyle}>
      <div ref={containerRef} style={containerStyle}>
        <header style={headerStyle}>
          <Image src={barnesLogoUrl} alt="Barnes Logo" width={250} height={40} />
          <Image src={ustaLogoUrl} alt="USTA Logo" width={250} height={50} />
        </header>
        <main style={scoreboardStyle}>
          <div style={{ margin: 0, padding: '2px 0 0 0' }}>
            <h1 style={playerNameStyle}>{player1}</h1>
          </div>
          <div style={middleContainerStyle}>
            <div style={logoContainerStyle}>
              <Image src={UstaBJKLogo} alt="USTA BJK Logo" width={395} height={117} />
            </div>
            <div style={scoresWrapperStyle}>
              <div style={setScoresContainerStyle}>
                <div style={scoresRowStyle}>
                  {normalizedScore1.map((setScore, index) => (
                    <span key={index} style={scoreNumberStyle}>
                      {setScore}
                    </span>
                  ))}
                </div>
                <div style={scoresRowStyle}>
                  {normalizedScore2.map((setScore, index) => (
                    <span key={index} style={scoreNumberStyle}>
                      {setScore}
                    </span>
                  ))}
                </div>
              </div>
              <div style={currentGamePointsContainerStyle}>
                <div style={scoresRowStyle}>
                  <div style={arrowContainerStyle}>{renderServingArrow('player1')}</div>
                  <span style={scoreNumberStyle}>{currentGamePoints1}</span>
                </div>
                <div style={scoresRowStyle}>
                  <div style={arrowContainerStyle}>{renderServingArrow('player2')}</div>
                  <span style={scoreNumberStyle}>{currentGamePoints2}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ margin: 0, padding: '0' }}>
            <h1 style={playerNameStyle}>{player2}</h1>
          </div>
        </main>
      </div>
    </div>
  );
}
