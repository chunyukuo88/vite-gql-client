import { useQuery } from '@tanstack/react-query';
import { getGigs, queryKeys } from './queries.ts';
import { useState } from 'react';
import { getDisplayedGigs } from './utils.ts';
import './App.css';

function App() {
    const [displayIndex, setDisplayIndex] = useState(0);

    const queryResult = useQuery({
        queryKey: [queryKeys.GET_GIGS],
        queryFn: getGigs,
    });

    if (queryResult.isLoading) {
        return (
            <section id='gigs-container' style={{ placeItems: 'center', padding: '20%' }}>
                L O A D I N G . . .
            </section>
        );
    }

    if (queryResult.isError) {
        return (
            <section id='gigs-container' style={{ placeItems: 'center', padding: '20%' }}>
                The server is undergoing scheduled maintenance. Please try again tomorrow.
            </section>
        );
    }

    const previousButtonHandler = () => {
        if (displayIndex > 0) {
            setDisplayIndex(displayIndex - 1);
        }
    };

    const nextButtonHandler = () => {
        if (displayIndex + 3 <= queryResult.data.length) {
            setDisplayIndex(displayIndex + 1);
        }
    };

    const ScrollButtons = () => (
        <div id='scroll-buttons-container'>
            <button onClick={previousButtonHandler} className={displayIndex === 0 && 'disabled'}/>
            <button onClick={nextButtonHandler} />
        </div>
    );

    const isMostRecentGig = (displayedGigs, gig) => (displayIndex === 0 && gig === displayedGigs[0]);

    const RecentGigsPanel = ({ displayedGigs }) => (
        <div id='recent-gigs-panel'>
            {displayedGigs.map((gig) => (
                <div className='wk-gig-card card' key={gig.task_id}>
                    {isMostRecentGig(displayedGigs, gig) && <div id='latest-gig'>Latest</div>}
                    <div className='card-header'>Gig completed {gig.end_date.split(' ')[0]}</div>
                    <h3>
                        {gig.date_paid
                            ? <span className='wk-payment-complete'>Paid on {gig.date_paid.split('T')[0]}</span>
                            : <span className='wk-payment-pending'>Payment pending.</span>
                        }
                    </h3>
                    <div>
                        <span className='card-field'>Earnings: </span>
                        <span>${gig.total_amount_charged}</span>
                    </div>
                    <div>
                        <span className='card-field'>Documents: </span>
                        {gig.file_names}
                    </div>
                    <div>
                        <span className='card-field'>Company: </span>
                        {gig.company.dba}
                    </div>
                    <div>
                        <span className='card-field'>Contact: </span>
                        {gig.company.contact_name}
                    </div>
                </div>
            ))}
        </div>
    );

    if (queryResult.isSuccess) {
        const displayedGigs = getDisplayedGigs(queryResult, displayIndex);
        return (
            <main id='App'>
                <section id='create-new-gig' className='card'>
                    <header id='recently-completed' className='card-header-title is-size-2'>
                        Record New Gig
                    </header>
                </section>
                <section id='view-recent-gigs' className='card'>
                    <header id='recently-completed' className='card-header-title is-size-2'>
                        Recently Completed
                    </header>
                    <div id='buttons-and-gigs-container'>
                        <ScrollButtons />
                        <RecentGigsPanel displayedGigs={displayedGigs} />
                    </div>
                </section>
            </main>
        );
    }
}

export default App
