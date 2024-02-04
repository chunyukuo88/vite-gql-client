import { CreateGigPanel } from '../components/CreateGigPanel.tsx';
import { RecentGigsPanel } from '../components/RecentGigsPanel.tsx';
import './Gigs.css';

export default function Gigs() {
    return (
        <main id='App'>
            <CreateGigPanel />
            <RecentGigsPanel />
        </main>
    );
}
