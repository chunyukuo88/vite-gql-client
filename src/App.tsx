import { RecentGigsPanel } from './components/RecentGigsPanel.tsx';
import { CreateGigPanel } from './components/CreateGigPanel.tsx';
import './App.css';

function App() {
    return (
        <main id='App'>
            <CreateGigPanel />
            <RecentGigsPanel />
        </main>
    );
}

export default App
