import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
    }
})


export const { setMessage } = notificationSlice.actions

export const setNotification = (message, timer) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(setMessage(initialState))
        }, timer * 1000)
    }
}

export default notificationSlice.reducer