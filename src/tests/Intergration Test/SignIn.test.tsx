import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../../pages/Authentication/SignIn';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import instance from '../../axios/instance';

jest.mock('../../axios/instance');

const mockedInstance = instance as jest.Mocked<typeof instance>;



describe('Intergration Testing for Sign In', () => {

    test('Testing for the right error message from the server, and that it gets displayed, when user is invalid', async () => {

        const mockResponse = { status: 404, data: { data: { message: "Not Found", status: 404} } };
        mockedInstance.post.mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignIn />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/skriv din email her/i), { target: { value: 'invalid@invalid.com' } });
        fireEvent.change(screen.getByPlaceholderText(/skriv dit password her/i), { target: { value: 'invalid' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        const errorMessage = await screen.findByText(/Not Found/i);
        expect(errorMessage).toBeInTheDocument();

    });

    test('Token added on successfull login', async () => {

        const mockResponse = { status: 200, data: { data: { accessToken: 'test-token' } } };
        mockedInstance.post.mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignIn />
                </BrowserRouter>
            </Provider>
        );  

        fireEvent.change(screen.getByPlaceholderText(/skriv din email her/i), { target: { value: 'info@spacebox.dk' } });
        fireEvent.change(screen.getByPlaceholderText(/skriv dit password her/i), { target: { value: 'mormor' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            const authToken = localStorage.getItem('authToken');
            expect(authToken).toBeTruthy();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
      });
});