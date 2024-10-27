import {v4 as uuid} from 'uuid'

import * as CommunicationActions from './actions'
import { getMessages } from './selectors'

export const addMessage = (title, isError=false, linger=false) => (dispatch, getState) => {
    const message = {
        title,
        isError,
        id: uuid()
    }
    const messages = getMessages(getState())

    const isDuplicate = messages.find(m => m.id === message.id || m.title === message.title && m.isError && message.isError)

    if (!isDuplicate) {
        const newMessages = [...messages, message]
        dispatch(CommunicationActions.setMessages(newMessages))
        setTimeout(() => {
            dispatch(CommunicationActions.deleteMessage(message.id))
        }, linger ? 10*1000 : 6*1000)
    }
}