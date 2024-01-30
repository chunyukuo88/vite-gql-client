import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { billingOptions, companies, PaymentMethods, rates } from '../common/constants.ts';
import { v4 as uuidv4 } from 'uuid';
import './CreateGigPanel.css';
import {createGig} from "../queries.ts";

export function CreateGigPanel() {
    const { CHECK, PAYPAL, WIRE_TRANSFER} = PaymentMethods;
    const { HOURLY, MOST_COMMON_INTERVAL, PER_CHAR } = rates;
    const { HOUR, WORD_COUNT } = billingOptions;

// TODO: Pull company data from database instead of the constants.ts file, then add a loading spinner using Bulma styling next to the companies input.
    const [company, setCompany] = useState(companies.ETS.companyName);
    const [fileNames, setFileNames] = useState('');

// TODO: Calculate this from S3.
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [hourlyRate, setHourlyRate] = useState(HOURLY);
    const [hours, setHours] = useState(MOST_COMMON_INTERVAL);
    const [perCharRate, setPerCharRate] = useState(PER_CHAR);
    const [charCount, setCharCount] = useState(0);
    const [totalAmountCharged, setTotalAmountCharged] = useState(hours * hourlyRate);
    const [billingOption, setBillingOption] = useState(HOUR);
    const [paymentMethod, setPaymentMethod] = useState(CHECK);
    const today = (new Date()).toISOString().split('T')[0];

// TODO: These need to be converted to strings, from the Date type that gets set in each of these 4 setters.
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [invoiceSent, setInvoiceSent] = useState(today);
    const [datePaid, setDatePaid] = useState('');

// TODO: Create validation utility function.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date();
        const created_at = date.toISOString().split('T')[0];
        const input = {
            task_id: uuidv4(),
            created_at,
            company,
            // company_id: 1,
            file_names: fileNames,
            task_number_this_year: invoiceNumber,
            payment_method: paymentMethod,
            hours,
            word_count: charCount,
            hourly_rate: hourlyRate,
            per_char_rate: perCharRate,
            total_amount_charged: totalAmountCharged,
            end_date: endDate,
            start_date: startDate,
            invoice_sent: invoiceSent,
            date_paid: datePaid,
        };
        const gig = await createGig(input);
        console.log('Gig created: ', gig);
    };

    const companyHandler = (e) => setCompany(e.target.value);
    const filesHandler = (e) => setFileNames(e.target.value);
    const billableHoursHandler = (e) => setHours(e.target.value);
    const hourlyRateHandler = (e) => setHourlyRate(e.target.value);
    const totalHandler = (e) => setTotalAmountCharged(e.target.value);
    const totalCharsHandler = (e) => setCharCount(e.target.value);
    const perCharRateHandler = (e) => setPerCharRate(e.target.value);
    const paymentMethodHandler = (e) => setPaymentMethod(e.target.value);
    const billingOptionHandler = (e) => setBillingOption(e.target.value);
    const startDateHandler = (e) => setStartDate(e.target.value);
    const endDateHandler = (e) => setEndDate(e.target.value);
    const invoiceSentHandler = (e) => setInvoiceSent(e.target.value);
    const datePaidHandler = (e) => setDatePaid(e.target.value);

    const DateInputs = () => (
      <div className='rows'>
          <div className='columns'>
              <div className='column'>
                  <label className='label is-small'>Start Date</label>
                  <input
                      className='input is-small'
                      type='date'
                      name='start-date'
                      onChange={startDateHandler}
                      value={startDate}
                  />
              </div>
              <div className='column'>
                  <label className='label is-small'>End Date</label>
                  <input
                      className='input is-small'
                      type='date'
                      name='end-date'
                      onChange={endDateHandler}
                      value={endDate}
                  />
              </div>
          </div>
          <div className='columns'>

          </div>
      </div>
    );

    const HourlyBillingInputs = () => (
        <div className='columns'>
            <div className='column'>
                <label className='label is-small'>Billable hours</label>
                <input
                    className='input is-small'
                    type='number'
                    name='billable-hours'
                    onChange={billableHoursHandler}
                    value={hours}
                />
            </div>
            <div className='column'>
                <label className='label is-small'>Hourly Rate</label>
                <input
                    className='input is-small'
                    type='number'
                    name='hourly-rate'
                    onChange={hourlyRateHandler}
                    value={hourlyRate}
                />
            </div>
            <div className='column'>
                <label className='label is-small'>Total</label>
                <input
                    className='input is-small'
                    type='number'
                    name='total'
                    onChange={totalHandler}
                    value={totalAmountCharged}
                />
            </div>
        </div>
    );

    const PerWordBillingInputs = () => (
        <div className='columns'>
            <div className='column'>
                <label className='label is-small'>Total chars</label>
                <input
                    className='input is-small'
                    type='number'
                    name='total-chars'
                    value={charCount}
                    onChange={totalCharsHandler}
                />
            </div>
            <div className='column'>
                <label className='label is-small'>Rate Per Char</label>
                <input
                    className='input is-small'
                    type='number'
                    name='per-char-rate'
                    value={perCharRate}
                    onChange={perCharRateHandler}
                />
            </div>
            <div className='column'>
                <label className='label is-small'>Total</label>
                <input
                    className='input is-small'
                    type='number'
                    name='total'
                    onChange={totalHandler}
                    value={totalAmountCharged}
                />
            </div>
        </div>
    );

    return (
        <section id='create-new-gig' className='card'>
            <header id='recently-completed' className='card-header-title is-size-2'>
                Record a New One
            </header>
            <form onSubmit={handleSubmit} className='control'>
                <div className='select is-primary'>
                    <select className='input is-small' onChange={companyHandler}>
                        <option>ETS</option>
                        <option>Chen Xi</option>
                    </select>
                </div>
                <br/>

                <label className='label is-small'>Files, comma-delimited</label>
                <input className='input is-small' type='text' name='files' onChange={filesHandler} />
                <br/>

                <label className='label is-small'>Bill by</label>
                <div className='control'>
                    <label className='radio'>
                        <input 
                            type='radio' 
                            name='billingOption'
                            value={HOUR}
                            checked={billingOption === HOUR}
                            onChange={billingOptionHandler}
                        />
                        Hour
                    </label>
                    <label className='radio'>
                        <input
                            type='radio'
                            name='billingOption'
                            value={WORD_COUNT}
                            checked={billingOption === WORD_COUNT}
                            onChange={billingOptionHandler}
                        />
                        Word Count
                    </label>
                </div>
                <br/>

                {billingOption === HOUR ? <HourlyBillingInputs /> : null}
                {billingOption === WORD_COUNT ? <PerWordBillingInputs/> : null}
                <br/>

                <label className='label is-small'>Payment method</label>
                <div className='select is-primary'>
                    <select className='input is-small' onChange={paymentMethodHandler}>
                        <option>{CHECK}</option>
                        <option>{WIRE_TRANSFER}</option>
                        <option>{PAYPAL}</option>
                    </select>
                </div>
                <br/>

                <DateInputs />
                <br/>

                <button type='submit'>Submit</button>
            </form>
        </section>
    );
}