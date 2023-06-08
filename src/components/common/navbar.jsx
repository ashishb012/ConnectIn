import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../assets/linkedinLogo.png";
import SearchUsers from "./searchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  // AiOutlineMessage,
  // AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { BsBriefcase } from "react-icons/bs";
import { getAllUsers } from "../../api/FirestoreAPI";
import ProfilePopup from "./profilePopup";

export default function Navbar({ currentUser }) {
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
    <div className="fixed top-0 left-0 z-10 w-full h-24 px-2 pb-2 bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between">
        {popupVisible ? (
          <div className="flex">
            <ProfilePopup />
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center ">
          <img
            className="m-2 w-28 hover:cursor-pointer"
            src={LinkedinLogo}
            alt="LinkedinLogo"
            onClick={() => goToRoute("/home")}
          />
          {/* <span className="self-center text-2xl font-semibold ">AppName</span> */}
        </div>
        {isSearch ? (
          <SearchUsers
            setIsSearch={setIsSearch}
            setSearchInput={setSearchInput}
          />
        ) : (
          <div className="flex items-center w-auto ">
            <div className="flex flex-row space-x-8 font-medium">
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
              {/* <BsBriefcase size={30} className="" />
              <AiOutlineMessage size={30} className="" />
              <AiOutlineBell size={30} className="" /> */}
            </div>
          </div>
        )}
        <div className="flex">
          <img
            className="w-16 h-auto rounded-full hover:cursor-pointer"
            src={currentUser?.imageLink}
            alt="user"
            onClick={displayPopup}
          />
        </div>
      </div>
    </div>
  );
}
