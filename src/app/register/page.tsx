import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../libs/auth";
import { Session } from "next-auth";
import { redirect } from 'next/navigation';
import Signup from '../../components/Signup';
import { isMobileDevice } from '../../libs/responsive';

const Register = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const isMobile = await isMobileDevice();
  if (session) {
    redirect('/');
  } else {
    return (
      <Signup isMobile={isMobile} />
    )
  }
}

export default Register;
