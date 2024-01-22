import { useEffect, useState } from 'react';
import { getGigs } from './queries.ts';
import './App.css';

function App() {
    const [gigs, setGigs] = useState();

    useEffect(() => {
        getGigs().then(fetchedGigs => {
            const sortByCompletionDate = (a, b) => b.end_date.localeCompare(a.end_date);
            const sorted = fetchedGigs.sort(sortByCompletionDate);
            setGigs(sorted);
        });
    }, []);

    const dollarStyle = {
        color: 'green',
        fontWeight: 'bold',
    };

    const RecentGigs = () => (
        <section id='gigs-container'>
            {gigs && gigs.map((gig) => {
                return (
                    <div className='gig-card card' key={gig.task_id}>
                        <div className='card-header'>Gig completed {gig.end_date.split(' ')[0]}</div>
                        <h3>
                            {gig.date_paid
                                ? <span className='payment-complete'>Paid on {gig.date_paid.split('T')[0]}</span>
                                : <span style={{ color: 'salmon'}}>Payment pending.</span>
                            }
                        </h3>
                        <div>
                            <span className='card-field'>Earnings: </span>
                            <span style={dollarStyle} >${gig.total_amount_charged}</span>
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
                )
            })}
        </section>
    );

    return (
        <main id='App'>
            <div className='is-size-2'>Gigs</div>
            <div className='is-size-4'>Recently completed gigs</div>
            <RecentGigs />
        </main>
    )
}

export default App
