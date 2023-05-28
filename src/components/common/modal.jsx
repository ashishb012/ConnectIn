import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            className="bg-slate-500"
          >
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <div>
          <ReactQuill
            theme="snow"
            value={status}
            placeholder="Share Something Useful.."
            onChange={setStatus}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div>
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage?.length > 0 || currentPost?.postImage?.length > 0 ? (
            <img src={postImage || currentPost?.postImage} alt="postImage" />
          ) : (
            <></>
          )}
        </div>
        <label htmlFor="pic-upload">
          <AiOutlinePicture size={35} />
        </label>
        <input
          id="pic-upload"
          type={"file"}
          accept=".png, .jpg, .jpeg, .svg"
          hidden
          onChange={(event) => {
            if (event.target != undefined) {
              if (event.target.files[0].size > 2e6) {
                alert("File size too big. Compress it & try again.");
              } else {
                uploadPostImage(
                  event.target.files[0],
                  setPostImage,
                  setProgress
                );
              }
            }
          }}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
