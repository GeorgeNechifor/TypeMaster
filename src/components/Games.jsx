import { useEffect, useRef , useState , useLayoutEffect } from 'react';
import '../styles/Games.css';
import Board from './Board';
import useTime from '../hooks/useTime';
export default function Games(props){

    const [boardDis , setBoardDis] = useState('none');
    const [min , setMin] = useState(0);
    const [clockDisplay , setClockDisplay] = useState('none')
    const [gameDisplay , setGameDisplay] = useState('flex');
    const [over , setOver] = useState('none');

    useEffect(() => {
        if(min){
            setTimeout(() => {
                setClockDisplay('none');
                setBoardDis('none');
                setOver('grid');
                setTimeDisplay('none');
            } , (min * 60) * 1000)
        }
    } , [min])

    const [width , setWidth] = useState(0);
    const [time , setTime] = useState(null);

    useLayoutEffect(() => {
        setWidth(document.body.offsetWidth);
    } , [])

    function Game(props){
        
        return (
            <div className="Game" style={{display:gameDisplay}}>
                <div className="ss">
                    <div className="icon">
                        <img src="timer.png" alt="not found" />
                    </div>
                    <div className="time">{props.time}</div>
                </div>
                <div className="play" id={props.id}

                    onClick={(event) => {
                        props.set('grid');
                        setMin(Number(event.target.id));
                        setClockDisplay('flex')
                        setGameDisplay('none');
                        setTime(width / ( Number(event.target.id) * 60))
                        scrollTo(0 , document.body.offsetHeight);
                        setTimeDisplay('block');
                        setRanks('none');

                    }}

                >Type</div>
                
            </div>
        );
    }

    const [timeDisplay , setTimeDisplay] = useState("none");

    function TimerBar(){

        return (
            <div className="TimerBar"
                style={{
                    width:"99%",
                    height:"20px",
                    borderTop:"2px solid #505050a3",
                    borderBottom:"2px solid #505050a3",
                    display:timeDisplay
                }}
            >
                <div className="takeTime"
                    style={{
                        height:"100%",
                        width:`${useTime(time)}%`,
                        backgroundColor:"#FF2400",
                        transition:"100ms",
                        textAlign:"end",
                        color:"wheat",
                        fontWeight:"bold",
                        borderRadius:"3px"
                        
                    }}

                >
                    <span
                        style={{
                            position:"relative",
                            right:"3px",
                        }}
                    >
                        {useTime(time)}%
                    </span>

                </div>
            </div>
        );
    }

    const [ranks , setRanks] = useState('grid');

    function Ranks(){

        return (
            <div className='Ranks' style={{display:ranks}}>

                <div className="RanksScore">
                    <div className="first">
                        <span className='score'>0-20</span> WPM                         
                    </div>
                    <div className="second">
                        <span className='score'>20-40</span> WPM
                    </div>
                    <div className="third">
                        <span className='score'>40-99</span> WPM
                    </div>
                </div>
              
                <div className="RanksLine">

                </div>
                <div className="RanksLogo">
                    <img className='amateur' src="amateur.png" alt="" />
                    <img className='pro' src="pro.png" alt="" />
                    <img className='master' src="master.png" alt="" />
                </div>
            </div>
        );
    }

    return (
        <div className="GamesContainer">
            <Game  set={setBoardDis} time="1 minute" id="1"></Game>
            <Game set={setBoardDis} time="2 minutes" id="2"></Game>
            <Game set={setBoardDis} time="3 minutes" id="3"></Game>
            <Game set={setBoardDis} time="4 minutes" id="4"></Game>
            <Ranks></Ranks>
            <TimerBar></TimerBar>
            <Board over={over} display={boardDis} stat={min}></Board>
        </div>
    );
}
