import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'
import blogSlice from './slices/blogSlice';
import messagesSlice from './slices/messageSlice'
const store = configureStore({
    reducer : {
        user : userSlice,
        blog : blogSlice,
        message : messagesSlice
    }
})

export default store