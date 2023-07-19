import { ChatGPT } from '../components/ChatGpt'
import { Sidebar } from '../components/Sidebar'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
     <Sidebar /> <ChatGPT />
    </main>
  )
}
