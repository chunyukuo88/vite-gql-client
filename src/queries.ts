import { GraphQLClient, gql } from 'graphql-request';
import { errorLogger } from './common/utils.ts';

const url = 'http://localhost:9001/graphql';
const client = new GraphQLClient(url);

export const queryKeys = {
    GET_GIGS: 'Get gigs',
    GET_COMPANIES: 'Get companies',
};

export async function getCompanies() {
    const query = gql`
        query{
            sbCompanies {
                company_id
                created_at
                official_name
                dba
                their_clients
                address
                phone
                contact_name
            }
        }
    `;
    try {
        const { companies } = await client.request(query);
        return companies;
    } catch (e) {
        errorLogger('Failed to grab companies. Error: ', e);
    }
}

export async function createGig(input) {
    const mutation = gql`
        mutation($input: CreateGigInput!) {
            gig: createGig(input: $input) {
                invoice_number
            }
        }
    `;
    const { gig } = await client.request(mutation, { input });
    return gig;
}

export async function getGigs() {
    const query = gql`
        query {
            gigs {
                invoice_number
                company {
                    company_id
                    contact_name
                    dba
                }
                date_paid
                end_date
                file_names
                total_amount_charged
                word_count
            }
        }
    `;
    try {
        const { gigs } = await client.request(query);
        return gigs;
    } catch (e) {
        errorLogger('Failed to grab gigs. Error: ', e);
    }
}