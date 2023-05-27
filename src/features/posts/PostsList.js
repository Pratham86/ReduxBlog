import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";
import {selectAllPosts , getPostsError , getPostsStatus , fetchPosts} from "./postsSlice";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () =>{
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if(postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    }, [postsStatus , dispatch])

    let content;
    if(postsStatus === 'loading'){
        content  = <p>"Loading..."</p>
    }
    else if(postsStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a, b) => {
            if (a.date > b.date) return 1
            if (a.date < b.date) return -1
            return 0
        })

        content = orderedPosts.map(post => <PostsExcerpt key = {post.id} post = {post} />)
    }
    else if(postsStatus === 'failed'){
        content = <p>{error}</p>
    }

    return(
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList;