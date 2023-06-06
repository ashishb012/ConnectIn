import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
} from "../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../helpers/useMoment";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

export default function LikeComments({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleLike = () => {
    likePost(userId, postId, liked);
  };
  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
  };
  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);
  return (
    <div className="flex flex-col justify-center gap-4 p-2">
      <div className="my-2">
        <hr className="border-t border-gray-900" />
      </div>
      <div className="grid grid-flow-col hover:cursor-pointer">
        <div className="flex justify-start" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="#1e40af" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}

          <div className={liked ? "text-blue-800" : "text-black"}>
            {likesCount > 1 ? (
              <p>{likesCount} Likes</p>
            ) : (
              <p>{likesCount} Like</p>
            )}
          </div>
        </div>
        <div
          className="flex justify-start hover:cursor-pointer"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          {
            <AiOutlineComment
              size={30}
              color={showCommentBox ? "#0a66c2" : "#212121"}
            />
          }

          <p className={showCommentBox ? "text-blue-800" : "text-black"}>
            Comments
          </p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="h-10 p-3 font-normal bg-white border border-gray-800 rounded-full focus:outline focus:outline-gray-700"
            name="comment"
            value={comment}
          />
          <button
            className="self-center p-2 my-3 border-2 rounded-lg w-fit bg-slate-50 hover:cursor-pointer hover:border-gray-900"
            onClick={addComment}
          >
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="relative flex flex-col justify-center m-3 bg-white rounded">
                  <p className="mx-2 font-semibold" key={comment.name}>
                    {comment.name}
                  </p>
                  <p className="mx-2 font-normal" key={comment.comment}>
                    {comment.comment}
                  </p>
                  <p className="mx-2 font-normal" key={comment.timeStamp}>
                    {comment.timeStamp}
                  </p>
                  {/* 
                  <p>•</p>
                   */}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
