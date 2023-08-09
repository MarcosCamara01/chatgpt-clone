import React from 'react';
import { BiSolidSend } from 'react-icons/bi';
import '../styles/css/principalInput.css';

export const PrincipalImput = ({ handleFormSubmit, textareaRef, input, handleInputChange }) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <div className='form-firstbx'>
                <div className='form-secondbx'>
                    <textarea
                        ref={textareaRef}
                        placeholder='Send a message'
                        name='message'
                        id='message'
                        value={input}
                        onChange={handleInputChange}
                    ></textarea>
                    <button
                        style={{
                            backgroundColor: input ? 'rgb(25, 195, 125)' : '',
                            opacity: input ? 1 : 0.4,
                            color: input ? '#fff' : '',
                        }}
                    >
                        <BiSolidSend />
                    </button>
                </div>
            </div>
        </form>
    )
}
