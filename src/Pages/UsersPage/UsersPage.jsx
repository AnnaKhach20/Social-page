import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './UsersPage.module.css';
import { changePageAC, getUsersThunk, searchUsersThunk } from "../../store/reducers/usersReducer";
import UserCard from "../../Components/users/UserCard/UserCard";
import SearchBar from "../../Components/users/SearchBar/SearchBar";

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

  const handleSearch = (query) => {
    if (query.trim() === '') {
      dispatch(getUsersThunk(page));
    } else {
      dispatch(searchUsersThunk(query));
    }
  };

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
    <div className={styles.usersPage}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.pagination}>
        {portionNumber > 1 && (
          <button onClick={() => setPortionNumber(portionNumber - 1)}>
            prev
          </button>
        )}
        {buttons
          .filter((p) => p >= leftPortionSize && p <= rightPortionSize)
          .map((p) => (
            <button
              className={p === page ? styles.activePage : ''}
              onClick={() => changePage(p)}
              key={p}
            >
              {p}
            </button>
          ))}
        {endButton > portionNumber && (
          <button
            className={styles.btn}
            onClick={() => setPortionNumber(portionNumber + 1)}
          >
            next
          </button>
        )}
      </div>
      <div className={styles.users}>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;