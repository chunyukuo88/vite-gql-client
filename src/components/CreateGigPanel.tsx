import { useMutation } from '@tanstack/react-query';
import {useState} from "react";


export function CreateGigPanel() {
    const [formData, setFormData] = useState({
        task_id: 104,
        created_at: 'today',
        company: 'Nick Collins Inc',
        company_id: 1,
        start_date: '',
        end_date: '2023-03-13',
        file_names: 'More_Coffee.docx',
        task_number_this_year: 3,
        invoice_sent: '2023-03-13',
        date_paid: '2023-03-25',
        payment_method: 'Wire transfer',
        hours: 2.0,
        word_count: 33333,
        hourly_rate: 233,
        per_char_rate: 13,
        total_amount_charged: 1234,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //
        console.log(formData);
    };

    return (
        <section id='create-new-gig' className='card'>
            <header id='recently-completed' className='card-header-title is-size-2'>
                Record New Gig
            </header>
            <form onSubmit={handleSubmit}>
                <label>
                    Task ID:
                    <input type="number" name="task_id" value={formData.task_id} onChange={handleChange} />
                </label>
                <br />

                <label>
                    Company:
                    <input type="text" name="company" value={formData.company} onChange={handleChange} />
                </label>
                <br />

                <button type="submit">Submit</button>
            </form>
        </section>
    );
}