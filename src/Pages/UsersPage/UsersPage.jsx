import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UsersPage.css";
import { changePageAC, getUsersThunk } from "../../store/reducers/usersReducer";
import UserCard from "../../Components/UserCard/UserCard";


const UsersPage = () => {
  const [portionNumber, setPortionNumber] = useState(1);
  const { users, page, totalUsersPageCount, totalUsersCount } = useSelector(
    (state) => state.usersPage
  );
  const dispatch = useDispatch();

  let leftPortionSize = (portionNumber - 1) * 10 + 1;
  let rightPortionSize = portionNumber * 10;

  
  useEffect(() => {
    dispatch(getUsersThunk(page));
  }, [page, dispatch]);

  const buttonsCount = Math.ceil(totalUsersCount / totalUsersPageCount);
  const endButton = Math.ceil(buttonsCount / 10);

  const buttons = [];
  for (let i = 1; i <= buttonsCount; i++) {
    buttons.push(i);
  }

  const changePage = (page) => {
    dispatch(changePageAC(page));
  };

  return (
    <div className="users-page">
      <div className="pagination">
        {portionNumber > 1 && (
          <button onClick={() => setPortionNumber(portionNumber - 1)}>
            prev
          </button>
        )}
        {buttons
          .filter((p) => p >= leftPortionSize && p <= rightPortionSize)
          .map((p) => (
            <button
              className={p === page ? "active-page" : ""}
              onClick={() => changePage(p)}
              key={p}
            >
              {p}
            </button>
          ))}
        {endButton > portionNumber && (
          <button
            className="btn"
            onClick={() => setPortionNumber(portionNumber + 1)}
          >
            next
          </button>
        )}
      </div>
      <div className="users">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
