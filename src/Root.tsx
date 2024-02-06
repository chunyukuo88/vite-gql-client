import { store } from './globalState/store.ts';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Root({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {children}
            </Provider>
        </QueryClientProvider>
    );
}
