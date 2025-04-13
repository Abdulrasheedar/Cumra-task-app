import React from "react";

// UserList component is responsible for displaying a single user
const UserList = (props) => {
  const {users} = props;

  return (
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            {/* Display user name or content */}
            <h5 className="card-title">{users}</h5>
            <div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserList;
