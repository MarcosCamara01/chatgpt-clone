import { Schema } from 'mongoose';
import SingleChat from '../../../components/chat/SingleChat';
import { isMobileDevice } from '../../../libs/responsive';
import { getOneChat } from '@/app/actions';

type Props = {
  params: {
    id: Schema.Types.ObjectId;
  };
};

const Chat = async ({ params }: Props) => {
  const isMobile = await isMobileDevice();
  const { chat } = await getOneChat(params.id)
  const stringChat = JSON.stringify(chat);

  return (
    <SingleChat
      isMobile={isMobile}
      stringChat={stringChat}
    />
  );
};

export default Chat;