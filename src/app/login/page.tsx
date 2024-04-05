import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../libs/auth";
import { Session } from "next-auth";
import { redirect } from 'next/navigation';
import Signin from '../../components/auth/Signin';
import { isMobileDevice } from '../../libs/responsive';

const Login = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const isMobile = await isMobileDevice();

  if (session) {
    redirect('/');
  } else {
    return (
      <Signin isMobile={isMobile} />
    )
  }
}

export default Login;
