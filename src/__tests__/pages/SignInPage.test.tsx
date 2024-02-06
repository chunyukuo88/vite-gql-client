import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SignInPage from '../../../src/pages/SignInPage.tsx';

test('Page can render', () => {
   render(<SignInPage />);

   const hello = screen.getByText('hello');

   expect(hello).toBeVisible();
});

describe.skip('GIVEN: ', () => {
    describe('WHEN: ', () => {
        test('THEN: ', () => {

        });
    });
});