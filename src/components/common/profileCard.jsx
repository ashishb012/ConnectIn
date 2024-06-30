import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "/src/api/FirestoreAPI";
import { postStatus, updatePost } from "/src/api/FirestoreAPI";
import { uploadPostImage } from "/src/api/ImageUpload";
import PostsCard from "/src/components/common/postsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "/src/components/common/fileUploadModal";
import ModalComponent from "/src/components/common/modal";
import { uploadImage as uploadImageAPI } from "/src/api/ImageUpload";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [filemodalOpen, setFileModalOpen] = useState(false);
  const [status, setStatus] = useState("");
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

  // const getImage = (event) => {
  //   setCurrentImage(event.target.files[0]);
  // };
  function getImage(image) {
    setCurrentImage(image);
  }
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  console.log("u", currentUser, "p", currentProfile);
  console.log("p", currentProfile);

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={filemodalOpen}
        setModalOpen={setFileModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="w-auto h-auto p-5 m-8 mt-32 rounded-lg bg-slate-100">
        {currentUser.id === location?.state?.id ? (
          <div className="flex justify-end">
            <HiOutlinePencil
              size={25}
              className="cursor-pointer hover:bg-slate-300 hover:rounded-full"
              onClick={onEdit}
              title="Edit Profile"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-between">
          <div className="p-3">
            <img
              className="object-cover border-2 border-black rounded-full w-28 h-28 md:w-48 md:h-48 hover:cursor-pointer"
              onClick={() => {
                {
                  setFileModalOpen(true);
                }
              }}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
              title="Change profile image"
            />
            <h3 className="mt-3 text-lg font-bold md:text-xl">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="text-base font-medium md:text-lg md:w-80">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {/* {console.log( currentUser.city, currentUser.country, currentProfile?.city, currentProfile?.country )} */}
            {(currentUser.city || currentUser.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              <p className="">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <> </>
            )}
            {currentUser.website || currentProfile?.website ? (
              <a
                className="text-blue-600"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="m-2 font-medium ">
          <p>
            {Object.values(currentProfile).length === 0
              ? currentUser.college
              : currentProfile?.college}
          </p>
          <p>
            {Object.values(currentProfile).length === 0
              ? currentUser.company
              : currentProfile?.company}
          </p>
        </div>
        <p className="m-2 md:w-2/4">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className="m-2 font-medium">
            <span className="font-normal">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col self-center justify-center center">
        {allStatuses?.map((posts) => {
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
    </>
  );
}
