import SingleChat from '../../../components/chat/SingleChat';
import { isMobileDevice } from '../../../libs/responsive';

const Chat = async ({ params }) => {
  const isMobile = await isMobileDevice();

    return (
      <SingleChat
        isMobile={isMobile}
        id={params.id}
      />
    );
};

export default Chat;