import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

const SingleItem = ({item}) => {

    const queryClient = useQueryClient()

    const {mutate: editTask} = useMutation({
        mutationFn: ({taskID, isDone}) => {
            return customFetch.patch(`/${taskID}`, {isDone})
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['task']})
            toast.success('Task edited!')
        }
    })

    const {mutate: deleteTask, isLoading} = useMutation({
        mutationFn: (taskID) => {
            return customFetch.delete(`/${taskID}`)
        }, 
        onSuccess: () => {
            toast.warning('Task Deleted')
            queryClient.invalidateQueries({queryKey:['task']})
        }
    })

    return (
        <div className='single-item'>
            <input
                type='checkbox'
                checked={item.isDone}
                onChange={() => editTask({taskID: item.id, isDone: !item.isDone})}
            />
            <p
                style={{
                    textTransform: 'capitalize',
                    textDecoration: item.isDone && 'line-through',
                }}
            >
                {item.title}
            </p>
            <button
                className='btn remove-btn'
                type='button'
                disabled={isLoading}
                onClick={() => deleteTask(item.id)}
            >
                delete
            </button>
        </div>
    );
};
export default SingleItem;
