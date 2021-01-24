import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../Style/storyList.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getStoryDetail, getTopStories } from "../actions";

function StoryDetail(props) {
  const history = useHistory();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const onBack = () => {
    props.getStoryDetail([]);
    history.push("/storyList");
  };
  const onLogOut = () => {
    props.getTopStories([]);
    props.getStoryDetail([]);
    history.push("/");
  };
  return (
    <div className="container_style">
      <div className="link_style">
        <Link className="style_link" onClick={onBack}>
          Back
        </Link>
        <Link className="style_link" onClick={onLogOut}>
          Logout
        </Link>
      </div>
      <h1 className="title_style">{props.storySelected.title}</h1>
      <div className="span_style">
        <span> Score: {props.storySelected.score} </span>
        <span>
          {" "}
          Date:{" "}
          {new Date(props.storySelected.date).toLocaleDateString(
            "de-DE",
            options
          )}{" "}
        </span>
        <span>Type:{props.storySelected.type} </span>
        <span> Author:{props.storySelected.user} </span>
      </div>
      <h3>Reactions</h3>
      <div className="reaction_style">
        {props.storyDetailVal &&
          props.storyDetailVal.map(item => {
            return (
              <div>
                ---<span className="user_name_style">{item.by}</span>-
                <span className="user_name_style">
                  {" "}
                  {new Date(item.time).toLocaleDateString("de-DE", options)}
                </span>
                <br></br>
                ---<span>{item.text}</span>
              </div>
            );
          })}
      </div>
      <span></span>
    </div>
  );
}
const actionCreators = {
  getStoryDetail: getStoryDetail,
  getTopStories: getTopStories
};
const MapStateToProps = state => {
  return {
    storyList: state.top_stories_id,
    storyDetailVal: state.storyDetail,
    storySelected: state.storySelected
  };
};
export default withRouter(
  connect(MapStateToProps, actionCreators)(StoryDetail)
);
