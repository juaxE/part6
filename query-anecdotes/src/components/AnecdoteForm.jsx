import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(data))
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({ type: 'SET', payload: `anecdote too short, must be at least 5 characters` })
      setTimeout(() => { dispatch({ type: 'RESET' }) }, 5000)
    }
    else {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({ type: 'SET', payload: `anecdote ${content} added` })
      setTimeout(() => { dispatch({ type: 'RESET' }) }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
