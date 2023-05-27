import { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm =() =>{
    const dispatch = useDispatch();

    const [title , setTitle] = useState("");
    const [imgLink , setImgLink] = useState("");

    const [content , setContent] = useState("");
    const [userId , setUserId] = useState("");
    const [addRequestStatus , setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers);

    
    const onTitleChanged = (e) => ( setTitle(e.target.value) );
    const onImageChanged = (e) => ( setImgLink(e.target.value) );

    const onContentChanged = (e) => ( setContent(e.target.value) );

    const onAuthorChanged = (e) => ( setUserId(e.target.value) );

    const canSave = title && userId && content && addRequestStatus === 'idle';

    const onSavePostClicked = () =>{
        if(canSave){
            try{
                setAddRequestStatus('pending')
                dispatch(addNewPost({title  , body : content , userId , imgLink })).unwrap();
                // unwrap throws an error if dispatching is not done properly(hence we can use try and catch)

                setTitle('')
                setContent('')
                setUserId('')
            }
            catch(err){
                console.log('Failed to save the post' , err)
            }
            finally{
                setAddRequestStatus('idle');
            }
        }

        
    }


    const usersOptions = users.map(user => (
        <option key = {user.id} value = {user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2> Add a New post </h2>
            <form>
                <label
                    htmlFor = "postTilte"
                >Post Title:</label>

                <input 
                    type = 'text'
                    value={title}
                    onChange = {onTitleChanged}
                    id = "postTitle"
                    name = "postTitle"
                />

                <label
                    htmlFor = "postImg"
                >Post Image Link:</label>
                <input 
                    type = 'text'
                    value = {imgLink}
                    onChange={onImageChanged}
                    id= "postImg"
                    name = "postImg"
                />

                <label
                    htmlFor = "postAuthor"
                >Author:</label>

                <select 
                    value= {userId}
                    onChange = {onAuthorChanged}
                    id = "postAuthor"
                >
                    <option value = ''></option>
                    {usersOptions}
                </select>


                <label
                    htmlFor = "postContent"
                >Content:</label>

                <textarea 
                    type = 'text'
                    value={content}
                    onChange = {onContentChanged}
                    id = "postContent"
                    name = "postContent"
                />

                <button 
                type = "button"
                onClick={onSavePostClicked}
                disabled = {!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm;