import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost } from "/src/api/FirestoreAPI";
import { getCurrentTimeStamp } from "/src/helpers/useMoment";
import ModalComponent from "/src/components/common/modal";
import { uploadPostImage } from "/src/api/ImageUpload";
import { getUniqueID } from "/src/helpers/getUniqueId";
import PostsCard from "/src/components/common/postsCard";

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
    postStatus(object);
    setModalOpen(false);
    setIsEdit(false);
    setStatus("");
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
      <div className="flex flex-col items-center h-auto max-w-xl p-2 mt-32 border border-gray-500 rounded-xl bg-slate-100 w-72 md:w-4/5">
        <img
          src={currentUser?.imageLink}
          alt="imageLink"
          className="object-cover w-16 h-16 m-2 border-2 border-black rounded-full md:w-28 md:h-28"
        />
        <p className="text-base font-bold md:text-xl">{currentUser?.name}</p>
        <p className="w-full font-semibold text-center md:w-3/4">
          {currentUser?.headline}
        </p>
      </div>
      <div className="flex items-center justify-center h-auto max-w-xl p-2 mt-8 border border-gray-500 mb-7 w-72 md:w-4/5 rounded-xl bg-slate-100">
        <img
          className="object-cover w-10 h-10 m-2 border-2 rounded-full md:w-16 md:h-16"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="w-full p-2 font-normal text-left border border-gray-400 rounded-full cursor-pointer md:w-4/5 bg-slate-50 hover:bg-slate-200"
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
              <PostsCard
                posts={posts}
                id={posts.id}
                getEditData={getEditData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
