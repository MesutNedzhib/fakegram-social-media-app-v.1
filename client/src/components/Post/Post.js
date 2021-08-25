import React, { useState } from "react";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import { setComment, setLikeToPost } from "../../actions/userActions";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Avatar } from "@material-ui/core";
import { getPosts } from "../../actions/userActions";

function Post({ postData }) {
  const { user } = useSelector((state) => state.user);
  // console.log(postData);

  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState();
  const setCommentDataHandle = () => {
    dispatch(
      setComment({
        _postId: postData._id,
        _userId: postData._userId,
        _username: postData._username,
        _userImageUrl: user?.imageUrl,
        comment: commentValue,
        currentUserId: user?._id,
      })
    );
    setCommentValue("");
  };
  const setLikeToPostHandle = () => {
    dispatch(
      setLikeToPost({
        _postId: postData._id,
        _userId: postData._userId,
        currentUserId: user?._id,
      })
    );
  };
  return (
    <div className="post">
      <div className="post-container">
        <div className="post-header">
          <Avatar src={postData?._userImageUrl} />
          <h3>{postData._username}</h3>
        </div>
        <div className="post-body">
          <div className="post-image">
            <img src={`../uploads/${postData.imageUrl}`} alt="" />
          </div>
          <div className="post-status">
            <Badge
              badgeContent={postData.likes.length}
              color="error"
              onClick={() => setLikeToPostHandle()}
            >
              <FavoriteBorderIcon />
            </Badge>
            <Badge badgeContent={postData.comments.length} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          </div>
          <div className="post-description">
            <p>
              <h4>{postData._username}</h4> {postData.description}
            </p>
          </div>
          <div className="post-comments">
            {postData.comments.map((item, index) => (
              <div className="user-comment" key={index}>
                <Avatar src={item?._userImageUrl} />
                <p>
                  <h4>{item._username}</h4>
                  {item.comment}
                </p>
              </div>
            ))}
          </div>
          <div className="post-timestamp">
            <span>{postData.createdAt}</span>
          </div>
          <div className="post-add-comment">
            <div className="post-add-comment-write">
              <Avatar src={user?.imageUrl} />
              <input
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setCommentValue(e.target.value)}
                value={commentValue}
              />
            </div>
            <div className="post-add-comment-submit">
              <Button onClick={() => setCommentDataHandle()}>PUBLISHING</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
