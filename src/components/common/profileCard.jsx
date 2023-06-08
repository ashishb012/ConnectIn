import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../api/FirestoreAPI";
import PostsCard from "./PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "./fileUploadModal";
import { uploadImage as uploadImageAPI } from "../../api/ImageUpload";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  // const getImage = (event) => {
  //   setCurrentImage(event.target.files[0]);
  // };
  function getImage(image) {
    setCurrentImage(image);
  }
  console.log(currentProfile);
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

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
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
              className="object-cover w-48 border-2 border-black rounded-full hover:cursor-pointer"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
              title="Change profile image"
            />

            <h3 className="mt-3 text-xl font-bold">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="font-medium w-80">
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
        <p className="w-2/4 m-2">
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

      <div className="flex self-center justify-center">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id} className="flex justify-center">
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}
