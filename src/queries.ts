import { GraphQLClient, gql } from 'graphql-request';

const url = 'http://localhost:9001/graphql';
const client = new GraphQLClient(url);

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
    const { gigs } = await client.request(query);
    console.log(gigs);
    return gigs;
}