import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionsButtons";
import {selectPostById} from "./postsSlice";
import { useParams , Link} from "react-router-dom";

const SinglePostPage = () =>{
    const {postId} = useParams()
    
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    
    console.log(post)

    if(!post){
        return(
            <section>
                <h2>Page not found...</h2>
            </section>
        )
    }

    return(
        <article >
            <h3>{post.title}</h3>
            <img
                src = {post.imgLink}   
            />

            <p>{post.body}</p>

            <p>
                {/* <Link to = {`post/edit/${post.id}`}>Edit Post</Link> */}
                <PostAuthor userId = {post.userId} />
                <TimeAgo timestamp = {post.date}/>
            </p>
            <ReactionButtons post = {post}/>
            {/* <DeletePost postId = {post.id} /> */}
            
        </article>
    )
}

export default SinglePostPage;