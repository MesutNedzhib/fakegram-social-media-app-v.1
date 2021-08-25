import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPosts } from "../../actions/userActions";
import Post from "../../components/Post/Post";
import "./HomeScreen.scss";
import { io } from "socket.io-client";

function HomeScreen() {
  const socket = useRef();
  const { loading, error, user } = useSelector((state) => state.user);
  const { postsLoading, postsError, posts } = useSelector(
    (state) => state.posts
  );
  // console.log(posts);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(socket);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }

    dispatch(getPosts());
  }, [user, history, dispatch]);

  return (
    <div className="homeScreen">
      <div className="homeScreen-container">
        <div className="posts-side">
          {posts?.map((item, index) => (
            <Post key={index} postData={item} />
          ))}
        </div>
        <div className="suggestions-side">
          <div className="sugg-user">
            <div className="sugg-user-info">
              <Avatar />
              <h4>Username</h4>
            </div>
            <div className="sugg-user-follow-btn">
              <Button>Follow</Button>
            </div>
          </div>
          <div className="sugg-user">
            <div className="sugg-user-info">
              <Avatar />
              <h4>Username</h4>
            </div>
            <div className="sugg-user-follow-btn">
              <Button>Follow</Button>
            </div>
          </div>
          <div className="sugg-user">
            <div className="sugg-user-info">
              <Avatar />
              <h4>Username</h4>
            </div>
            <div className="sugg-user-follow-btn">
              <Button>Follow</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
