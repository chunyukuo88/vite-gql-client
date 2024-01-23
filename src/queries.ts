import { GraphQLClient, gql } from 'graphql-request';
import { errorLogger, logger } from './common/utils.ts';

const url = 'http://localhost:9001/graphql';
const client = new GraphQLClient(url);

export const queryKeys = {
    GET_GIGS: 'Get gigs',
};

export async function getGigs(){
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
        logger('Returned gigs', gigs);
        return gigs;
    } catch (e) {
        errorLogger('Failed to grab gigs. Error: ', e);
    }
}