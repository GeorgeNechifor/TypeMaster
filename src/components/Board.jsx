
import { useState , useEffect ,useRef } from "react";
import { List } from "../data/Words";
import '../styles/Board.css'


export default function Board(props){

    function randomWord(){
        return List.commonWords[Math.floor(Math.random() * List.commonWords.length)]
    }

    const [random , setRandom] = useState(randomWord());
    const [text , setText] = useState("");
    const [words , setWords] = useState(0);
    const [wrong , setWrong] = useState(0);
    const [accuracy , setAccuracy] = useState(undefined);
    const ref = useRef();

    function correctWord(){
        let correct = "";
        for(let i = 0; i < random.length;++i){
            if(random[i] === text[i])
                correct += random[i];
            else 
                return correct;
        }
        return correct;   
    }
    function errorAnime(){
        ref.current.className = 'error';
    }

    function cancelError(){
        ref.current.className = "userWord";
        setText(correctWord());
    }

    useEffect(() => {
        if(random.length === text.length && random != text){
            errorAnime();
            setWrong(prev => prev + 1);
            setTimeout(() => {
                cancelError();
            } , 500)
        }
        else if(random === text){
            setText("");
            setRandom(randomWord());
            setWords(prev => prev + 1);
        }
    } , [text])

    useEffect(() => {
        if(words && wrong){
            setAccuracy(Math.floor((words / (words + wrong)) * 100))
        }
        else if(!wrong && words)
            setAccuracy(100);
        else if(!words)
            setAccuracy(0);
    } , [words , wrong])

    const ranks = ["amateur.png", "pro.png" , "master.png"];

    let wpm = Math.ceil(words / props.stat);

    function setRank(){
        if(wpm <= 20)
            return ranks[0];
        else if(wpm > 20 && wpm < 40)
            return ranks[1];
        else if(wpm >= 40)
            return ranks[2];
    }

    function GameOver(){
        return (
            <div className="GameOver" style={{display:props.over}}>
                <div className="main">
                    <div className="tit">Looks like you are a:</div>
                    <div className="rank">
                        <img className="RankImage" src={setRank()} alt="not found" />
                    </div>
                </div>
                <div className="data">
                    <div className="Wpm">WPM: <span className="swpn">{wpm}</span></div>
                    <div className="accuracy">Accuracy: <span className="percent">{accuracy}%</span></div>
                </div>
                <div className="restart"
                    onClick={() => {
                        window.location.reload();
                    }}
                >Back</div>
            </div>
        );
    }

    return (
        <div className="Chellenge"   >
           <div className="in" style={{display:props.display}} >
            <div className="Board" >
                    {random}
                </div>
                <input ref={ref} className="userWord" value={text} type="text" onChange={(event) => {
                    let text = event.target.value;
                    try{
                        setText(text[0].toLowerCase() + text.substring(1 , text.length));
                    }
                    catch(error){
                        setText('');
                    }
                    
                }} />
           </div>

            <GameOver></GameOver>
        </div>
    );
}
