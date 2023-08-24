
import '../styles/Keyboard.css';
import { useRef , useState , useEffect } from 'react';
export default function Keyboard(props){

   
    return (
        
        <div className="Main">
            <h1 className='title'>Typing Speed Test</h1>
            <p className='description'>
                Unleash your typing prowess and challenge your words-per-minute record with TypeMaster, the ultimate typing speed test app.
            </p>
            <h2 className='timer'>
               Timed Chellenges
            </h2>
            <p className='timerDesc'>
            Challenge yourself against the clock with timed typing sessions. Test your ability to perform under pressure and see how your typing speed and accuracy hold up.
            </p>
        </div>

    );
}