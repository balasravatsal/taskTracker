import { useMutation, useQueryClient } from '@tanstack/react-query';
import {useState} from 'react';
import customFetch from './utils';
import {toast} from 'react-toastify'

const Form = () => {
    const [newItemName, setNewItemName] = useState('');

    const queryClient = useQueryClient()

    const {mutate, isLoading} = useMutation({
        mutationFn: (newItemName) => customFetch.post('/', {title: newItemName}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['task']})
            toast.success('Task Added')
            setNewItemName('')
        },
        onError: (err) => {
            // console.log(err);
            toast.error(err.response.data.msg)            
        }
    })
    // console.log(createTask);
    // console.log(mutate);
    const handleSubmit = (e) => {
        e.preventDefault();
        // createTask()
        mutate(newItemName)
    };
    return (
        <form onSubmit={handleSubmit}>
            <h4>Task Tracker</h4>
            <div className='form-control'>
                <input
                    type='text '
                    className='form-input'
                    value={newItemName}
                    onChange={(event) => setNewItemName(event.target.value)}
                />
                <button type='submit' className='btn' disabled={isLoading}>
                    add task
                </button>
            </div>
        </form>
    );
};
export default Form;
