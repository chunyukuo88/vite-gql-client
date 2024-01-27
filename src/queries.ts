import { GraphQLClient, gql } from 'graphql-request';
import { errorLogger, logger } from './common/utils.ts';

const url = 'http://localhost:9001/graphql';
const client = new GraphQLClient(url);

export const queryKeys = {
    GET_GIGS: 'Get gigs',
};

export async function createGig(input) {
    const mutation = gql`
        mutation($input: CreateGigInput!) {
            gig: createGig(input: $input) {
                task_id
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
                company {
                    company_id
                    contact_name
                    dba
                }
                date_paid
                end_date
                file_names
                task_id
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