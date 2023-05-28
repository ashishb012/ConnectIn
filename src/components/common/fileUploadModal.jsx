import React from "react";
import { Button, Modal, Progress } from "antd";

export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  return (
    <div>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => {
          setModalOpen(false);
          getImage({});
        }}
        footer={[
          <Button
            className=" bg-slate-500"
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Upload Profile Picture
          </Button>,
        ]}
      >
        <div className="text-center ">
          <p className="p-2 text-lg">
            {currentImage.name ? currentImage.name : ""}
          </p>
          <label
            className="w-2/3 p-1 border-2 rounded-md hover:cursor-pointer bg-neutral-50 hover:bg-neutral-200"
            htmlFor="image-upload"
          >
            Upload an Image
          </label>
          {progress === 0 ? (
            <></>
          ) : (
            <div className="p-5">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input
            hidden
            id="image-upload"
            type={"file"}
            onChange={(event) => {
              // console.log(event.target.files[0].size);
              if (event.target != undefined) {
                if (event.target.files[0].size > 2e6) {
                  alert("File size too big. Compress it & try again.");
                } else {
                  getImage(event.target.files[0]);
                }
              }
            }}
            accept=".png, .jpg, .jpeg, .svg"
          />
        </div>
      </Modal>
    </div>
  );
}
