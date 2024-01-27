import { useQuery } from '@tanstack/react-query';
import { getGigs, queryKeys } from './queries.ts';
import { useState } from 'react';
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
    const GigsDisplay = ({ displayedGigs }) => (
        <section id='gigs-container'>
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
        </section>
    );

    if (queryResult.isSuccess) {
        const gigs = queryResult.data;
        const sortByDateAscending = (a, b) => b.end_date.localeCompare(a.end_date);
        const sortedGigs = gigs.sort(sortByDateAscending);
        const displayedGigs = sortedGigs.slice(displayIndex, displayIndex + 4);
        return (
            <main id='App'>
                <div className='card'>
                    <header className='card-header'>
                        <div id='recently-completed' className='card-header-title is-size-2'>
                            Recently Completed
                        </div>
                    </header>
                        <div className='is-size-4'></div>
                    <div id='buttons-and-gigs-container'>
                        <ScrollButtons />
                        <GigsDisplay displayedGigs={displayedGigs} />
                    </div>
                </div>
            </main>
        );
    }
}

export default App
