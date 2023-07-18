import { Button } from '@chakra-ui/react';
import { useTodos } from '../store';
import shallow from 'zustand/shallow';

const FetchTodos = () => {
  const {loading, error, fetchTodos} = useTodos(state => ({
    loading: state.loading,
    error: state.error,
    fetchTodos: state.fetchTodos 
  }), shallow)
  console.log('render FetchTodos');

  return (
    <Button isLoading={loading} onClick={fetchTodos}>
       {!error ? 'Get todos' : { error }}
    </Button>
  );
};

export { FetchTodos };
