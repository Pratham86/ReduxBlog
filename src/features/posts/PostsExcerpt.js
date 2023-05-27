import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionsButtons";
// import DeletePost from "./DeletePost"
import { Link } from "react-router-dom";

const PostsExcerpt = ({post}) =>{
    return (
        <article >
            <h3>{post.title}</h3>
            <img
                src = {post.imgLink}   
            />

            <p className="excerpt">{post.body.substring(0 , 75)}</p>

            <p>
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId = {post.userId} />
                <TimeAgo timestamp = {post.date}/>
            </p>
            <ReactionButtons post = {post}/>
            {/* <DeletePost postId = {post.id} /> */}
            
        </article>
    )
}

export default PostsExcerpt;