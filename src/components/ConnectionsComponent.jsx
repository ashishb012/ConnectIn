import React, { useEffect, useState } from "react";
import { getAllUsers, addConnection } from "/src/api/FirestoreAPI";
import ConnectedUsers from "/src/components/common/ConnectedUsers";

export default function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return users.length > 1 ? (
    <div className="bg-neutral-100">
      <div className="container px-4 py-6 mx-auto mt-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {users.map((user) => {
            return user.id === currentUser.id ? (
              <></>
            ) : (
              <ConnectedUsers
                currentUser={currentUser}
                user={user}
                getCurrentUser={getCurrentUser}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="connections-main">No Connections to Add!</div>
  );
}
