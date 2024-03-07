import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/auth";
import { Session } from "next-auth";
import axios from 'axios';
import NewKey from './NewKey';

const CheckKey = async () => {
    const session: Session = await getServerSession(authOptions);

    if (session) {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/key?userId=${session.user._id}`
        );

        const userKey = response.data;

        if (userKey) {
            return;
        } else {
            return (
                <NewKey userId={session.user._id} />
            );
        }
    }
}

export default CheckKey;
