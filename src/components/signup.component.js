/* eslint-disable */
import React, { useState, useEffect } from "react";
import { getUserAccount, getProfile, register } from "../redux/actions";
import { useDispatch, useSelector } from 'react-redux';


const Signup = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
    firstname: '',
    lastname: '',
  });
  const { account } = useSelector((state) => state.userAccount);
  useEffect(() => {
      dispatch(getUserAccount());
  }, [])

  useEffect(() => {
      dispatch(getProfile(account));
  }, []);

    const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
      dispatch(register(values))
  }
        return (
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="First name" 
                    name="firstname"
                    onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Last name" 
                        name = "lastname"
                        onChange={handleChange}
                    />
                </div>

                <button 
                type="submit" 
                className="btn btn-dark btn-lg btn-block"
                onSubmit={handleSubmit}
                >
                    Register
                </button>
                <p className="forgot-password text-right">
                    Already registered <a href="/users">View Users</a>
                </p>
            </form>
        );
}
export default Signup;