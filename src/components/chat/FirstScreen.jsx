import { BsSun } from 'react-icons/bs';
import { SlEnergy } from 'react-icons/sl';
import { PiWarningBold } from 'react-icons/pi';

export const FirstScreen = ({ onButtonClick }) => {
    const column = "m-auto mt-8 sm:mt-0 flex flex-col gap-3.5 basis-1/3";
    const columnH2 = "text-lg font-normal flex flex-row sm:flex-col items-center gap-3 m-auto";
    const columnUl = "flex flex-col m-auto w-full text-2xl	gap-3.5";
    const columnButton = "bg-[#3E3F4B] p-3 rounded-md w-full text-[15px] leading-5 transition duration-150 ease hover:bg-[#202123]";
    const columnLi = "bg-[#3E3F4B] p-3 rounded-md w-full text-[15px] leading-5";

    return (
        <div className='flex flex-col leading-5	w-full'>
            <div className='mx-auto	w-[90%] max-w-3xl flex flex-col text-[#ECECF1]'>
                <h1 className='mx-auto mt-[75px] sm:mt-[20vh] sm:mb-16 font-bold text-4xl'>ChatGPT</h1>
                <div className='flex text-center flex-col sm:flex-row gap-3.5 items-start'>
                    <div className={column}>
                        <h2 className={columnH2}>
                            <BsSun className='text-2xl' />
                            Examples
                        </h2>
                        <ul className={columnUl}>
                            <button
                                className={columnButton}
                                onClick={() => onButtonClick('Explain quantum computing in simple terms')}
                            >
                                &quot;Explain quantum computing in simple terms&quot;
                            </button>
                            <button
                                className={columnButton}
                                onClick={() => onButtonClick("Got any creative ideas for a 10 year old's birthday?")}
                            >
                                &quot;Got any creative ideas for a 10 year old&rsquo;s birthday?&quot;
                            </button>
                            <button
                                className={columnButton}
                                onClick={() => onButtonClick('How do I make an HTTP request in Javascript?')}
                            >
                                &quot;How do I make an HTTP request in Javascript?&quot;
                            </button>
                        </ul>
                    </div>
                    <div className={column}>
                        <h2 className={columnH2}>
                            <SlEnergy className='text-2xl' />
                            Capabilities
                        </h2>
                        <ul className={columnUl}>
                            <li className={columnLi}>Remembers what user said earlier in the conversation</li>
                            <li className={columnLi}>Allows user to provide follow-up corrections</li>
                            <li className={columnLi}>Trained to decline inappropriate requests</li>
                        </ul>
                    </div>
                    <div className={column}>
                        <h2 className={columnH2}>
                            <PiWarningBold className='text-2xl' />
                            Limitations
                        </h2>
                        <ul className={columnUl}>
                            <li className={columnLi}>May occasionally generate incorrect information</li>
                            <li className={columnLi}>May occasionally produce harmful instructions or biased content</li>
                            <li className={columnLi}>Limited knowledge of world and events after 2021</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
