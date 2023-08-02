"use client"

import React from 'react';
import { LuSave } from 'react-icons/lu';

export const SaveButton = () => {
    return (
        <button className='save-btn'>
            <LuSave />
            Save
        </button>
    )
}