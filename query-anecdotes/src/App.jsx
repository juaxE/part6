import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updatedAnecdoteMutation.mutate(newAnecdote)
    dispatch({ type: 'SET', payload: `anecdote ${anecdote.content} voted` })
    setTimeout(() => { dispatch({ type: 'RESET' }) }, 5000)
  }

  const updatedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newAnecdotes = anecdotes.map((anecdote) => anecdote.id !== data.data.id ? anecdote : data.data)
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    }
  },)

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes
  },)

  console.log(JSON.stringify(data))

  if (isPending) {
    return <div>loading data...</div>
  }
  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
