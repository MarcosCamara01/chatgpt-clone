import SingleChat from '../../../components/SingleChat';
import { isMobileDevice } from '../../../libs/responsive';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../libs/auth";
import { Session } from "next-auth";
import { redirect } from 'next/navigation';

const Chat = async ({ params }) => {
  const session: Session | null = await getServerSession(authOptions);
  const isMobile = isMobileDevice();

  if (session) {
    return (
      <SingleChat
        isMobile={isMobile}
        id={params.id}
      />
    );
  } else {
    redirect("/login");
  }
};

export default Chat;