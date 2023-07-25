import React from "react";
import PostStatus from "./common/postUpdate";

export default function HomeComponent({ currentUser }) {
  return (
    <div className="home-component">
      <PostStatus currentUser={currentUser} />
    </div>
  );
}
