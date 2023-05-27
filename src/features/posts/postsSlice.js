import { createSlice , nanoid , createAsyncThunk} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios"

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts : [],
    status : 'idle' , // 'idle'| 'loading' | 'succeeded' | 'failed'
    error : null
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL,initialPost)
    return response.data
})
const postsSlice = createSlice({
    name : 'posts',
    initialState,
    reducers:{
        postAdded : {
            reducer (state ,action){
                console.log(state)
                state.posts.push(action.payload);
            },
            prepare (title,content ,imgLink, userId){
                return{
                    payload : {
                        id : nanoid(),
                        title : title,
                        imgLink : imgLink,
                        content : content,
                        date : new Date().toISOString(),
                        userId : userId,
                        reactions : {
                            thumbsUp : 0,
                            wow : 0,
                            heart : 0,
                            rocket : 0,
                            coffee : 0,
                        }
                    }
                }
            }
        },
        postDelete (state,action) {
            return state.posts.filter(post => (post.id) !== (action.payload))
            // state = newState;
        },

        reactionAdded(state,action) {
            const {postId , reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);

            if(existingPost){
                existingPost.reactions[reaction]++;

                // not same as existingPost.reactions.reaction++
            }
        }


    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending , (state , action) =>{
                state.status = 'loadiing'
            })

            .addCase(fetchPosts.fulfilled , (state , action) => {
                state.status = 'succeeded'

                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date() , {minutes : min++}).toISOString();

                    post.reactions = {
                        thumbsUp : 0,
                            wow : 0,
                            heart : 0,
                            rocket : 0,
                            coffee : 0
                    }

                    return post;
                });

                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected , (state) => {
                state.status = 'failed'
                state.error = 'Failed'
            })

            .addCase(addNewPost.fulfilled , (state,action) =>{
                action.payload.userId = Number(action.payload.userId)
                
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp : 0,
                    hooray : 0,
                    heart : 0,
                    rocket : 0,
                    eyes : 0 
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
        
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state , postId) => {
    return (state.posts.posts.find(post => post.id === postId))
}

export const {postAdded , postDelete , reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;