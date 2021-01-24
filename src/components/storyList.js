import React from "react";
import "../Style/storyList.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Date } from "prismic-reactjs";
import { getStoryDetailFun } from "../utils";
import { getStoryDetail, getSelectedStory } from "../actions";
import { useHistory } from "react-router-dom";

function StoryList(props) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const history = useHistory();
  useEffect(() => {
    if (props.storyDetailVal.length !== 0) {
      history.push("/storyDetail");
    }
  }, [props.storyDetailVal]);

  const image = value => {
    const tempArray = getStoryDetailFun(value.kids);
    props.getSelectedStory(value);
    setTimeout(function() {
      props.getStoryDetail(tempArray);
    }, 1000);
    if (props.storyDetailVal && props.storyDetailVal.length !== 0) {
      history.push("/storyDetail");
    }
  };
  const columns = [
    {
      dataField: "score",
      text: "Score",
      style: { backgroundColor: "#00afb9" }
    },
    {
      dataField: "obj",
      text: "Link",
      formatter: (value, row) => {
        return (
          <span>
            <Link onClick={() => image(value)}>{value.title}</Link>
            <br></br>
            <div className="span_style">
              <span>
                {" "}
                Date:{" "}
                {new Date(value.date).toLocaleDateString("de-DE", options)}
                {}{" "}
              </span>
              <span>Type:{value.type} </span>
              <span> Author:{value.user} </span>
              <img src="src/images/linkImg.svg" className="githubIcon" />
            </div>
          </span>
        );
      }
    }
  ];
  const storyList =
    props.storyList &&
    props.storyList.length !== 0 &&
    props.storyList.map(elem => ({
      score: elem.score,
      obj: {
        title: elem.title,
        url: elem.url,
        date: elem.time,
        type: elem.type,
        user: elem.by,
        kids: elem.kids,
        score: elem.score
      }
    }));

  return (
    <div className="table_style">
      {props.storyList && props.storyList.length !== 0 && (
        <BootstrapTable
          keyField="id"
          data={storyList && storyList.length !== 0 ? storyList : []}
          columns={columns}
          striped
          hover
        />
      )}
    </div>
  );
}
const MapStateToProps = state => {
  return {
    storyList: state.top_stories_id,
    storyDetailVal: state.storyDetail,
    storySelected: state.storySelected
  };
};
const actionCreators = {
  getStoryDetail: getStoryDetail,
  getSelectedStory: getSelectedStory
};
export default withRouter(connect(MapStateToProps, actionCreators)(StoryList));
