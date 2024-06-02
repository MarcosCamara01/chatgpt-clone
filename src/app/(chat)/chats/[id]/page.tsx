import { Schema } from "mongoose";
import SingleChat from "@/components/chat/SingleChat";
import { getOneChat } from "@/app/actions";

type Props = {
  params: {
    id: Schema.Types.ObjectId;
  };
};

const Chat = async ({ params }: Props) => {
  const { chat } = await getOneChat(params.id);
  const stringChat = JSON.stringify(chat);

  return <SingleChat stringChat={stringChat} />;
};

export default Chat;
