import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App.tsx';

describe('GIVEN: ', ()=>{
    describe('WHEN: ', ()=>{
        test('THEN: ', ()=>{
            render(<App />);

            const app = document.getElementById('App');

            expect(app).toBeInTheDocument();
        });
    });
});
