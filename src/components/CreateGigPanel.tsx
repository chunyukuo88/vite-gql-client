import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { billingOptions, companies, PaymentMethods, rates } from '../common/constants.ts';
import { createGig, getCompanies, queryKeys } from '../queries.ts';
import { generateUniqueInteger, logger } from '../common/utils.ts';
import { updateCompanies } from '../globalState';
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

const HourlyBillingInputs = (props) => (
    <div className='columns'>
        <div className='column'>
            <label className='label is-small'>Billable hours</label>
            <input
                className='input is-small'
                type='number'
                name='billable-hours'
                onChange={props.billableHoursHandler}
                value={props.hours}
            />
        </div>
        <div className='column'>
            <label className='label is-small'>Hourly Rate</label>
            <input
                className='input is-small'
                type='number'
                name='hourly-rate'
                onChange={props.hourlyRateHandler}
                value={props.hourlyRate}
            />
        </div>
        <div className='column'>
            <label className='label is-small'>Total</label>
            <input
                className='input is-small'
                type='number'
                name='total'
                value={props.totalAmountCharged}
                onChange={props.totalHandler}
            />
        </div>
    </div>
);

const PerWordBillingInputs = (props) => (
    <div className='columns'>
        <div className='column'>
            <label className='label is-small'>Total chars</label>
            <input
                className='input is-small'
                type='number'
                name='total-chars'
                value={props.charCount}
                onChange={props.totalCharsHandler}
            />
        </div>
        <div className='column'>
            <label className='label is-small'>Rate Per Char</label>
            <input
                className='input is-small'
                type='number'
                name='per-char-rate'
                value={props.perCharRate}
                onChange={props.perCharRateHandler}
            />
        </div>
        <div className='column'>
            <label className='label is-small'>Total</label>
            <input
                className='input is-small'
                type='number'
                name='total'
                onChange={props.totalHandler}
                value={props.totalAmountCharged}
            />
        </div>
    </div>
);

export function CreateGigPanel() {
    const queryResult = useQuery({
       queryKey: [queryKeys.GET_COMPANIES],
       queryFn: getCompanies,
    });
    const dispatch = useDispatch();
    if (queryResult.isLoading) {
        console.info('loading');
    }
    if (queryResult.isError) {
        console.info('oops');
        console.dir(queryResult);
    }
    if (queryResult.isSuccess) {
        dispatch(updateCompanies(queryResult.data));
    }

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

    const getCreatedAtDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const getCompanyId = () => {
        const match = queryResult.data.find(comp => comp.official_name === company);
        return match.company_id;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = {
            invoice_number: generateUniqueInteger(),
            created_at: getCreatedAtDate(),
            company,
            company_id: getCompanyId(),
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const companiesInputClassName = (queryResult.isLoading) ? 'input is-small is-loading' : 'input is-small';

    const CompanyOptions = () => {
        if (queryResult.isLoading) {
            return <option>Loading...</option>;
        }
        if (queryResult.isError) {
            return <option>Companies unavailable.</option>;
        }
        return queryResult.data.map((company, key) => (
            <option key={key}>{company.official_name}</option>
        ));
    };

    const formIsIncomplete = !totalAmountCharged || !fileNames;

    const SubmissionButton = () => formIsIncomplete
      ? <button className='button ' type='submit' disabled>Some fields are missing</button>
      : <button className='button' type='submit'>Record invoice for ${totalAmountCharged}</button>;

    return (
        <section id='create-new-gig' className='card'>
            <header id='recently-completed' className='card-header-title is-size-2'>
                Record a New One
            </header>
            <form onSubmit={openModal} className='control'>
                <div className='select is-primary'>
                    <select className={companiesInputClassName} onChange={companyHandler}>
                        <CompanyOptions />
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

                {billingOption === HOUR
                    ? <HourlyBillingInputs
                        hours={hours}
                        hourlyRate={hourlyRate}
                        hourlyRateHandler={hourlyRateHandler}
                        billableHoursHandler={billableHoursHandler}
                        totalAmountCharged={totalAmountCharged}
                        totalHandler={totalHandler}
                    />
                    : <PerWordBillingInputs
                        charCount={charCount}
                        totalCharsHandler={totalCharsHandler}
                        perCharRate={perCharRate}
                        perCharRateHandler={perCharRateHandler}
                        totalHandler={totalHandler}
                        totalAmountCharged={totalAmountCharged}
                    />
                }

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

                <SubmissionButton />
            </form>
            <ConfirmationModal
                showModal={isModalOpen}
                onClose={closeModal}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}