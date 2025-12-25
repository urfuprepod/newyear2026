
import Modal from '@/components/Modal';
import {BottomPanel, GameScreen} from '../components'



export default function Home() {

    return <div className="flex flex-col h-dvh">
        <GameScreen />
        <BottomPanel />
        <Modal />
    </div>;
}
