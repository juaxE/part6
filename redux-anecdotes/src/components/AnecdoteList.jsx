import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes
        .filter(anecdote => anecdote.content.includes(state.filter)))
        .sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You liked the anecdote: ${content}`))
        setTimeout(() => dispatch(clearNotification()), 5000)
    }

    return (
        <div>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList