import { useQuery } from '@tanstack/react-query';
import { getGigs } from './queries.ts';
import './App.css';
import {logger} from "./common/utils.ts";

function App() {
    const queryResult = useQuery({
        queryKey: ['Gigs'],
        queryFn: getGigs,
    });


    const dollarStyle = {
        color: 'green',
        fontWeight: 'bold',
    };

    const ServerDownForMaintenance = () => (
        <section id='gigs-container' style={{ placeItems: 'center', padding: '20%' }}>
            The server is undergoing scheduled maintenance. Please try again tomorrow.
        </section>
    );

    if (queryResult.isLoading) {
        return (
          <div>Loading...</div>
        );
    }

    if (queryResult.isError) {
        return <ServerDownForMaintenance />;
    }

    if (queryResult.isSuccess) {
        return (
            <main id='App'>
                <>
                    <div className='is-size-2'>Gigs</div>
                    <div className='is-size-4'>Recently completed gigs</div>
                    <section id='gigs-container'>
                        {queryResult.data.map((gig) => {
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
                </>
            </main>
        )
    }
}

export default App
