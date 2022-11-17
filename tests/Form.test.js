import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Forms from '../src/components/Forms';
import selectEvent from 'react-select-event';

test('Field validation error', async () => {
    const { getByTestId, getByText } = render(<Forms />);

    await act(async () => {
        fireEvent.change(screen.getByLabelText(/Start Destination/i), {
            target: { value: '' },
        })
        fireEvent.change(screen.getByLabelText(/End Destination/i), {
            target: { value: '' },
        })
        fireEvent.change(screen.getByLabelText(/Intermediate City/i), {
            target: { value: '' },
        })

        fireEvent.change(screen.getByLabelText(/Passengers/i), {
            target: { value: '' },
        })
    });

    await act(async () => {
        fireEvent.submit(getByText('Submit'))
    });

    expect(getByTestId('startCityError')).toBeInTheDocument();
    expect(getByTestId('endCityError')).toBeInTheDocument();
    expect(getByTestId('intermediateCity')).toBeInTheDocument();
    expect(getByTestId('passengers')).toBeInTheDocument();
});