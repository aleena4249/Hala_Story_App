import "./App.css";
import { userLogin, getTopStories } from "./actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getTopStoriesId } from "./utils";
import { useHistory } from "react-router-dom";

function Login(props) {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(false);
  const handleEmailChange = e => {
    const { value } = e.target;
    setUserEmail(value);
  };
  const handlePasswordChange = e => {
    const { value } = e.target;
    setUserPassword(value);
  };
  useEffect(() => {
    if (props.storyList.length !== 0) {
      history.push("/storyList");
    }
  }, [props.storyList]);

  const handleSubmit = () => {
    if (userEmail && userPassword) {
      if (userEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        setError(false);
        props.userLogin(userEmail, userPassword);
        getTopStoriesId(props).then(function(result) {
          setTimeout(function() {
            props.getTopStories(result);
          }, 1000);
          if (props.storyList && props.storyList.length !== 0) {
            history.push("/storyList");
          }
        });
      } else {
        setError(true);
      }
    } else setError(true);
  };

  return (
    <div className="loginPage">
      <div className="container">
        <div className="row">
          <label className="col-lg-12 heading_style">Let's get started</label>
        </div>
        <input
          type="text"
          className="form-control"
          name="userEmail"
          //value={""}
          placeholder={"Email address"}
          onChange={handleEmailChange}
        />
        {!userEmail && error && (
          <div className="help-block">Email is required</div>
        )}
        {userEmail && error && (
          <div className="help-block">valid email is required </div>
        )}
        <input
          type="password"
          className="form-control"
          name="password"
          //value={""}
          placeholder={"Password"}
          onChange={handlePasswordChange}
        />
        {!userPassword && error && (
          <div className="help-block">Password is required</div>
        )}
        <button className="button_style" onClick={handleSubmit}>
          LOGIN
        </button>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}

const MapStateToProps = state => {
  return {
    user_email: state.user_email,
    user_password: state.user_password,
    storyList: state.top_stories_id
  };
};

const actionCreators = {
  userLogin: userLogin,
  getTopStories: getTopStories
};

export default withRouter(connect(MapStateToProps, actionCreators)(Login));
