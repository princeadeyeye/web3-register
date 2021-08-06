/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { getUserAccount, getAllProfile } from "../redux/actions";
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.userAccount);
    const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
      dispatch(getUserAccount());

  }, []);


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevUsers = usePrevious(users);
  useEffect(() => {
    //eslint-disable-next-line
      if(prevUsers !== users) {
        dispatch(getAllProfile(account));
      }
      //eslint-disable-next-line
  }, [users])
  
  return (
    <table className="table">
        
            <thead>
        <tr>
        <th scope="col">S/N</th>
          <th scope="col">ID</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
        </tr>
      </thead>
      {users && users.length > 0 ? users.map((user, i) => (
            <>
      <tbody>
        <tr>
          <th scope="row">{i+1}</th>
          <td>{user.userId}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
        </tr>
      </tbody>
            </>
      )): <p>No users available</p>}
    </table>
  );
};
export default Users;