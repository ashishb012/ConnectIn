import React, { useEffect, useState } from "react";
import { getAllUsers, addConnection } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/connectedUsers";

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
      <div class="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 shadow-lg">
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
