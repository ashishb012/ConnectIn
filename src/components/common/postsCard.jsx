import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from "../../api/FirestoreAPI";
import LikeButton from "./likeComments";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

  return isConnected || currentUser.id === posts.userID ? (
    <div
      className="flex flex-col h-auto max-w-2xl p-2 my-3 border-2 border-gray-300 w-80 md:w-4/5 md:m-1 md:p-5 rounded-xl bg-slate-100"
      key={id}
    >
      <div className="flex w-full gap-2 p-2">
        <img
          alt="profile-image"
          className="rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
          onClick={() =>
            navigate(`/p/${posts?.userName}`, {
              state: { id: posts?.userID, email: posts.userEmail },
            })
          }
        />
        <div className="w-11/12">
          <p
            className="mx-1 text-base font-bold md:text-xl hover:cursor-pointer"
            onClick={() =>
              navigate(`/p/${posts?.userName}`, {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="hidden mx-1 font-semibold md:block">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className="mx-1 text-xs font-normal md:text-base">
            {posts.timeStamp}
          </p>
        </div>
        {currentUser.id === posts.userID ? (
          <div className="flex justify-between">
            <BsPencil
              size={20}
              className="m-2 bg-gray-100 hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="m-2 bg-gray-100 rounded-xl hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="w-full p-1 hover:cursor-pointer"
          alt="post-image"
        />
      ) : (
        <></>
      )}
      <p className="p-2" dangerouslySetInnerHTML={{ __html: posts.status }}></p>
      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />
      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="w-full p-5 hover:cursor-pointer"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
