import { useDispatch } from "react-redux";
import { useState } from "react";
import {postDelete} from './postsSlice';

const DeletePost = ({postId}) =>{
    const dispatch = useDispatch();
    const [pid] = useState(postId);
    // const posts = useSelector(selectAllPosts);

    const handleDelete = () =>{
        dispatch(
            postDelete(pid)
        )
    }
    return(
        <button
            onClick={handleDelete}
        >
            Delete
        </button>
    )
}

export default DeletePost;