

interface IPropsPlayer {
    playerNr: number;
    totalScore: number;
    currentScore: number;
}

const Player = (props: IPropsPlayer) => {

    const { playerNr, totalScore, currentScore } = props;

    return <div className={`player player${playerNr}`}>
        <h1>Player {playerNr}</h1>
        <h2 className="total-score">{totalScore}</h2>
        <div className="current-score">
            <p>CURRENT</p>
            <h3>{currentScore}</h3>
        </div>
    </div>
}

export default Player;