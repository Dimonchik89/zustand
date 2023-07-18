import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer' //для имутабельного кода

export const useTodos = create(devtools(persist((set, get) => ({
    todos: [
        { id: 1, title: "Learn js", completed: true },
        { id: 2, title: "Learn React", completed: false },
    ],
    loading: false,
    error: null,
    // addTodo: (title) => set(state => {
    //     const newTodo = {id: new Date(), title, completed: false}

    //     return {todos: [...state.todos, newTodo]}
    // })
    addTodo: (title) => {
        const newTodo = {id: new Date(), title, completed: false}
        set({todos: [...get().todos, newTodo]})
    },
    toggleTodo: (id) => set({
        todos: get().todos.map(item => item.id === id ? {...item, completed: !item.completed} : item)
    }),
    fetchTodos: async () => {
        set({loading: true})
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
            if(!res.ok) throw new Error("Failed to fetch. try again")
            set({ todos: await res.json(), error: null })
        } catch(error) {
            set({error: error.message})
        } finally {
            set({loading: false})
        }
    }
}))))

export const useFilter = create(set => ({
    filter: "all",
    setFilter: (value) => set({filter: value})
}))