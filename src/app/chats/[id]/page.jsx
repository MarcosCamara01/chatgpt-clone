import SingleChat from '../../../components/SingleChat';
import { isMobileDevice } from '../../../libs/responsive';

const Chat = ({ params }) => {
    const isMobile = isMobileDevice();

    return (
        <SingleChat
            isMobile={isMobile}
            id={params.id}
        />
    );
};

export default Chat;