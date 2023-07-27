import './firstScreen.css'
import { BsSun } from 'react-icons/bs';
import { SlEnergy } from 'react-icons/sl';
import { PiWarningBold } from 'react-icons/pi';

export const FirstScreen = ({ onButtonClick }) => {
    return (
        <div className='first-screen'>
            <div className='content'>
                <h1>ChatGPT</h1>
                <div className='columns'>
                    <div className="column">
                        <h2>
                            <BsSun />
                            Examples
                        </h2>
                        <ul>
                            <button
                                onClick={() => onButtonClick('Explain quantum computing in simple terms')}
                            >
                                &quot;Explain quantum computing in simple terms&quot;
                            </button>
                            <button 
                                onClick={() => onButtonClick("Got any creative ideas for a 10 year old's birthday?")}
                            >
                                &quot;Got any creative ideas for a 10 year old&rsquo;s birthday?&quot;
                            </button>
                            <button
                                onClick={() => onButtonClick('How do I make an HTTP request in Javascript?')}
                            >
                                &quot;How do I make an HTTP request in Javascript?&quot;
                            </button>
                        </ul>
                    </div>
                    <div className="column">
                        <h2>
                            <SlEnergy />
                            Capabilities
                        </h2>
                        <ul>
                            <li>Remembers what user said earlier in the conversation</li>
                            <li>Allows user to provide follow-up corrections</li>
                            <li>Trained to decline inappropriate requests</li>
                        </ul>
                    </div>
                    <div className="column">
                        <h2>
                            <PiWarningBold />
                            Limitations
                        </h2>
                        <ul>
                            <li>May occasionally generate incorrect information</li>
                            <li>May occasionally produce harmful instructions or biased content</li>
                            <li>Limited knowledge of world and events after 2021</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
