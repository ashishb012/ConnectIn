import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost } from "../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../helpers/useMoment";
import ModalComponent from "./modal";
import { uploadPostImage } from "../../api/ImageUpload";
import { getUniqueID } from "../../helpers/getUniqueId";
import PostsCard from "./PostsCard";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-2/4 h-auto p-2 mt-32 border border-gray-500 rounded-xl bg-slate-100">
        <img
          src={currentUser?.imageLink}
          alt="imageLink"
          className="object-cover h-auto m-2 border-2 border-black rounded-full w-28"
        />
        <p className="text-xl font-bold">{currentUser?.name}</p>
        <p className="w-3/4 font-semibold text-center">
          {currentUser?.headline}
        </p>
      </div>
      <div className="flex items-center justify-center w-2/4 h-auto p-2 mt-8 border border-gray-500 rounded-xl bg-slate-100">
        <img
          className="object-cover w-16 h-auto m-2 border-2 rounded-full"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="w-4/5 p-3 font-normal text-left border border-gray-400 rounded-full cursor-pointer bg-slate-50 hover:bg-slate-200"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      </div>

      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div>
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id} className="flex justify-center">
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
