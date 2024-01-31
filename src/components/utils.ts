// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { UseQueryResult } from '@tanstack/react-query/src/types.ts';

export function getDisplayedGigs(queryResult: UseQueryResult, displayIndex: number) {
    const gigs = queryResult.data;
    const sortByDateAscending = (a, b) => b.end_date.localeCompare(a.end_date);
    const sortedGigs = gigs.sort(sortByDateAscending);
    return sortedGigs.slice(displayIndex, displayIndex + 4);
}
