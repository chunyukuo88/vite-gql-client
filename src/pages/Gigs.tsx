import { CreateGigPanel } from '../components/CreateGigPanel.tsx';
import { RecentGigsPanel } from '../components/RecentGigsPanel.tsx';
import { Link } from 'react-router-dom';
import { routes } from '../common/routes.ts';
import './Gigs.css';

export default function Gigs() {
    return (
        <>
            <Link to={routes.SIGN_IN_PAGE}>Sign In</Link>
            <CreateGigPanel />
            <RecentGigsPanel />
        </>
    );
}
