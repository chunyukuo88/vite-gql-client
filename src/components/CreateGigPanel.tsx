import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {companies, PaymentMethods, rates} from '../common/constants.ts';
import { v4 as uuidv4 } from 'uuid';
import './CreateGigPanel.css';

export function CreateGigPanel() {
    const today = (new Date()).toISOString().split('T')[0];

    const [company, setCompany] = useState(companies.ETS.companyName);
    const [fileNames, setFileNames] = useState('');

    const [taskNumberThisYear, setTaskNumberThisYear] = useState(1);
    const [wordCount, setWordCount] = useState(0);
    const [invoiceSent, setInvoiceSent] = useState(today);
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethods.CHECK);
    const [hours, setHours] = useState(rates.mostCommonInterval);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [hourlyRate, setHourlyRate] = useState(rates.hourly);
    const [perCharRate, setPerCharRate] = useState(rates.perChar);
    const [datePaid, setDatePaid] = useState('');
    const [totalAmountCharged, setTotalAmountCharged] = useState(hours * hourlyRate);

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = {};
        input.taskId = uuidv4();
        const date = new Date();
        input.createdAt = date.toISOString().split('T')[0];
    };

    const companyHandler = (e) => setCompany(e.target.value);
    const filesHandler = (e) => setFileNames(e.target.value);
    const billableHoursHandler = (e) => setHours(e.target.value);
    const hourlyRateHandler = (e) => setHourlyRate(e.target.value);
    const totalHandler = (e) => setTotalAmountCharged(e.target.value);

    return (
        <section id='create-new-gig' className='card'>
            <header id='recently-completed' className='card-header-title is-size-2'>
                Record a New One
            </header>
            <form onSubmit={handleSubmit} className='control'>
                <label className='label is-small'>Company</label>
                <input className='input is-small' type='text' name='company' value={company} onChange={companyHandler} />
                <br/>

                <label className='label is-small'>Files, comma-delimited</label>
                <input className='input is-small' type='text' name='files' onChange={filesHandler} />
                <br/>

                <div className='columns'>
                    <div className='column'>
                        <label className='label is-small'>Billable hours</label>
                        <input className='input is-small' type='number' name='billable-hours' onChange={billableHoursHandler} />
                    </div>
                    <div className='column'>
                        <label className='label is-small'>Hourly Rate</label>
                        <input className='input is-small' type='number' name='hourly-rate' onChange={hourlyRateHandler} />
                    </div>
                    <div className='column'>
                        <label className='label is-small'>Total</label>
                        <input className='input is-small' type='number' name='total' onChange={totalHandler} />
                    </div>
                </div>
                <br/>
                <button type='submit'>Submit</button>
            </form>
        </section>
    );
}