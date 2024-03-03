import ChatGPT from '../components/ChatGpt'
import { isMobileDevice } from '../libs/responsive';

export default function Home() {
  const isMobile = isMobileDevice();
  
  return (
    <ChatGPT isMobile={isMobile} />
  )
}
