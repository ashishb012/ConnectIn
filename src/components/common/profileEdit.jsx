import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "/src/api/FirestoreAPI";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };

  return (
    <div>
      <div className="flex justify-start w-auto h-auto p-5 m-5 mt-28 bg-slate-100">
        <div className="grid w-full gap-4">
          <label className="px-1 mx-1 font-medium">Name</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="Name"
            name="name"
            value={editInputs.name}
          />
          <label className="px-1 mx-1 font-medium">Headline</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="Headline"
            value={editInputs.headline}
            name="headline"
          />
          <label className="px-1 mx-1 font-medium">Country</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="Country"
            name="country"
            value={editInputs.country}
          />
          <label className="px-1 mx-1 font-medium">City</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="City"
            name="city"
            value={editInputs.city}
          />
          <label className="px-1 mx-1 font-medium">Company</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="Company"
            value={editInputs.company}
            name="company"
          />
          <label className="px-1 mx-1 font-medium">Industry </label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="Industry"
            name="industry"
            value={editInputs.industry}
          />
          <label className="px-1 mx-1 font-medium">College</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="College"
            name="college"
            value={editInputs.college}
          />
          <label className="px-1 mx-1 font-medium">Website</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="Website"
            name="website"
            value={editInputs.website}
          />
          <label className="px-1 mx-1 font-medium">About</label>
          <textarea
            placeholder="About Me"
            className="px-2 py-2 mx-1 rounded-lg"
            onChange={getInput}
            rows={5}
            name="aboutMe"
            value={editInputs.aboutMe}
          />
          <label className="px-1 mx-1 font-medium">Skills</label>
          <input
            onChange={getInput}
            className="px-2 py-1 mx-1 rounded-lg"
            placeholder="Skill"
            name="skills"
            value={editInputs.skills}
          />
        </div>
        <div className="flex justify-end pl-5">
          <AiOutlineClose
            className="cursor-pointer"
            onClick={onEdit}
            size={25}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="px-5 py-2 mb-10 font-semibold bg-blue-500 rounded-full hover:bg-blue-600 w-fit"
          onClick={updateProfileData}
        >
          Save
        </button>
      </div>
    </div>
  );
}
