import React, { useEffect, useState } from "react";
import ConnectInLogo from "../../assets/ConnectInLogo.png";
import ConnectInIcon from "../../assets/ConnectIn.ico";
import SearchUsers from "./searchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
    navigate(`/p/${user.name}`, {
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
    <div>
      {popupVisible ? (
        <div>
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <div className="fixed top-0 left-0 z-10 w-full h-24 px-2 pb-2 bg-white border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center ">
            {isSearch ? (
              <img
                className="ml-2 w-9 hover:cursor-pointer md:w-10"
                src={ConnectInIcon}
                alt="ConnectInLogo"
                title="ConnectIn"
                onClick={() => goToRoute("/home")}
              />
            ) : (
              <img
                className="w-32 ml-2 hover:cursor-pointer md:w-52"
                src={ConnectInLogo}
                alt="ConnectInLogo"
                title="ConnectIn"
                onClick={() => goToRoute("/home")}
              />
            )}
            {/* <span className="self-center text-2xl font-semibold ">AppName</span> */}
          </div>
          {isSearch ? (
            <SearchUsers
              setIsSearch={setIsSearch}
              setSearchInput={setSearchInput}
            />
          ) : (
            <div className="flex items-center w-auto ">
              <div className="flex flex-row space-x-4 font-medium md:space-x-10">
                <AiOutlineSearch
                  title="search"
                  size={30}
                  className="hover:cursor-pointer"
                  onClick={() => setIsSearch(true)}
                />
                <AiOutlineHome
                  title="home"
                  size={30}
                  className="hover:cursor-pointer"
                  onClick={() => goToRoute("/home")}
                />
                <AiOutlineUserSwitch
                  title="Connection"
                  size={30}
                  className="hover:cursor-pointer"
                  onClick={() => goToRoute("/connections")}
                />
              </div>
            </div>
          )}
          <div title="user-profile" className="flex">
            <img
              className="border-2 border-black rounded-full h-14 w-14 focus:border-2 focus:border-gray-800"
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
    </div>
  );
}
