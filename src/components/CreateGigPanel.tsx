import { useState } from 'react';
import { billingOptions, companies, PaymentMethods, rates } from '../common/constants.ts';
import { createGig } from '../queries.ts';
import { generateUniqueInteger, logger } from '../common/utils.ts';
import './CreateGigPanel.css';

const ConfirmationModal = ({ showModal, onClose, handleSubmit }) => (
    showModal && (
        <div className='wk-confirmation-modal-overlay'>
            <div className='wk-confirmation-modal'>
                <p>Confirm submission?</p>
                <button className='button' onClick={handleSubmit}>Yeah!</button>
                <button className='button' onClick={onClose}>Nah</button>
            </div>
        </div>
    )
);

export function CreateGigPanel() {
    const { CHECK, PAYPAL, WIRE_TRANSFER} = PaymentMethods;
    const { HOURLY, MOST_COMMON_INTERVAL, PER_CHAR } = rates;
    const { HOUR, WORD_COUNT } = billingOptions;

    const [company, setCompany] = useState(companies.ETS.companyName);
    const [fileNames, setFileNames] = useState('');

    const [hourlyRate, setHourlyRate] = useState(HOURLY);
    const [hours, setHours] = useState(MOST_COMMON_INTERVAL);
    const [perCharRate, setPerCharRate] = useState(PER_CHAR);
    const [charCount, setCharCount] = useState(0);
    const [totalAmountCharged, setTotalAmountCharged] = useState(0);
    const [billingOption, setBillingOption] = useState(HOUR);
    const [paymentMethod, setPaymentMethod] = useState(CHECK);

    const today = (new Date()).toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [invoiceSent, setInvoiceSent] = useState(today);
    const [datePaid, setDatePaid] = useState(null);

    const formIsIncomplete = !totalAmountCharged || !fileNames;

    const getCreatedAtDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = {
            invoice_number: generateUniqueInteger(),
            created_at: getCreatedAtDate(),
            company,
            file_names: fileNames,
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
        logger('Gig created: ');
        logger(gig);
        closeModal();
    };

    const companyHandler = (e) => setCompany(e.target.value);
    const filesHandler = (e) => setFileNames(e.target.value);
    const billableHoursHandler = (e) => setHours(e.target.value);
    const hourlyRateHandler = (e) => setHourlyRate(e.target.value);
    const totalHandler = (e) => setTotalAmountCharged(parseFloat(e.target.value));
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
              <div className='column'>
                  <label className='label is-small'>Invoice Sent</label>
                  <input
                      className='input is-small'
                      type='date'
                      name='invoice-sent-date'
                      onChange={invoiceSentHandler}
                      value={invoiceSent}
                  />
              </div>
              <div className='column'>
                  <label className='label is-small'>Date Paid</label>
                  <input
                      className='input is-small'
                      type='date'
                      name='date-paid'
                      onChange={datePaidHandler}
                      value={datePaid}
                  />
              </div>
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
                    value={totalAmountCharged}
                    onChange={totalHandler}
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    return (
        <section id='create-new-gig' className='card'>
            <header id='recently-completed' className='card-header-title is-size-2'>
                Record a New One
            </header>
            <form onSubmit={openModal} className='control'>
                <div className='select is-primary'>
                    <select className='input is-small' onChange={companyHandler}>
                        <option>ETS</option>
                        <option>Chen Xi</option>
                    </select>
                </div>

                <label className='label is-small'>File names, including extensions, comma-delimited</label>
                <input className='input is-small' type='text' name='files' onChange={filesHandler} />

                <div className='wk-radio-buttons-section'>
                    <label className='label is-small'>Bill them</label>
                    <div className='control'>
                        <label className='radio'>
                            <input
                                type='radio'
                                name='billingOption'
                                value={HOUR}
                                checked={billingOption === HOUR}
                                onChange={billingOptionHandler}
                            />
                            Per Hour
                        </label>
                        <label className='radio'>
                            <input
                                type='radio'
                                name='billingOption'
                                value={WORD_COUNT}
                                checked={billingOption === WORD_COUNT}
                                onChange={billingOptionHandler}
                            />
                            Per Char
                        </label>
                    </div>
                </div>

                {billingOption === HOUR ? <HourlyBillingInputs /> : null}
                {billingOption === WORD_COUNT ? <PerWordBillingInputs/> : null}

                <label className='label is-small'>Payment method</label>
                <div className='select is-primary'>
                    <select className='input is-small' onChange={paymentMethodHandler}>
                        <option>{CHECK}</option>
                        <option>{WIRE_TRANSFER}</option>
                        <option>{PAYPAL}</option>
                    </select>
                </div>

                <DateInputs />
                <br/>

                {formIsIncomplete
                    ? <button className='button ' type='submit' disabled>Some fields are missing</button>
                    : <button className='button' type='submit'>Record invoice for ${totalAmountCharged}</button>
                }
            </form>
            <ConfirmationModal
                showModal={isModalOpen}
                onClose={closeModal}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}