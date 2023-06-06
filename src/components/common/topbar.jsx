import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../assets/linkedinLogo.png";
import SearchUsers from "./searchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { getAllUsers } from "../../api/FirestoreAPI";
import ProfilePopup from "./profilePopup";
// import "./topbar.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-10 w-full m-2 bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between p-4">
        {popupVisible ? (
          <div className="flex">
            <ProfilePopup />
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center ">
          <img className="mr-3 w-28" src={LinkedinLogo} alt="LinkedinLogo" />
          {/* <span className="self-center text-2xl font-semibold ">AppName</span> */}
        </div>
        {isSearch ? (
          <SearchUsers
            setIsSearch={setIsSearch}
            setSearchInput={setSearchInput}
          />
        ) : (
          <div className="flex items-center justify-between w-auto ">
            <div className="flex flex-row mt-4 space-x-8 font-medium">
              <AiOutlineSearch
                size={30}
                className="hover:cursor-pointer"
                onClick={() => setIsSearch(true)}
              />
              <AiOutlineHome
                size={30}
                className="hover:cursor-pointer"
                onClick={() => goToRoute("/home")}
              />
              <AiOutlineUserSwitch
                size={30}
                className="hover:cursor-pointer"
                onClick={() => goToRoute("/connections")}
              />
              <BsBriefcase size={30} className="" />
              <AiOutlineMessage size={30} className="" />
              <AiOutlineBell size={30} className="" />
            </div>
          </div>
        )}
        <div className="flex">
          <img
            className="w-10 h-10 rounded-full focus:border-2 focus:border-gray-800"
            src={currentUser?.imageLink}
            alt="user"
            onClick={displayPopup}
          />
        </div>
      </div>

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="w-2/5 h-auto m-auto bg-white border-2 border-gray-400 rounded-md">
          {filteredUsers.length === 0 ? (
            <div className="m-2">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                className="flex items-center gap-3 p-2 m-2 hover:cursor-pointer hover:bg-slate-100"
                onClick={() => openUser(user)}
              >
                <img
                  src={user.imageLink}
                  className="object-cover w-10 h-10 rounded-full"
                />
                <p className="font-medium">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
