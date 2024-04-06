import { Posts } from './Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false, retry: 0}}})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  )
}

export default App
