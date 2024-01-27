import './App.css';
import { RecentGigsPanel } from './components/RecentGigsPanel.tsx';
import { CreateGigPanel } from './components/CreateGigPanel.tsx';

function App() {

    return (
        <main id='App'>
            <CreateGigPanel />
            <RecentGigsPanel />
        </main>
    );
}

export default App
