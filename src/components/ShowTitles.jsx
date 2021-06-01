import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Header, Icon, Rating } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { changeTitleReview } from '../store/actions/showTitlesActions';
import { connect } from 'react-redux';
import { getSearchedTitles } from '../store/actions/appActions.js';

function ShowTitles(props) {
  const { titles, changeTitleReview } = props;

  const titlesList = titles.map((item, index) => (
    <div key={index} className="titlePreviewCover">
      <Image src={item.cover_path} onClick={() => changeTitleReview(item)} id={item.id} />
      <div className="nameAndRating">
        <h4>{item.name}</h4>
        <div>
          <Rating maxRating={5} size="tiny" clearable disabled defaultRating={item.rating} />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="SContent">
      {/* <Header as="h2" dividing className="headerWrapper">
        <div>
          <Icon name="user secret" />
          <Header.Content>
            Sono Chi no Sadame!
            <Header.Subheader>正 正 正 正 正 正 正</Header.Subheader>
          </Header.Content>
        </div>
        <div className="slider">
          <div>Size</div>
          <input type="range" min="1" max="6" />
        </div>
      </Header> */}

      <div className="titleView">{titlesList}</div>
    </div>
  );
}

const putStateToProps = (state) => {
  return {
    titles: state.titles,
  };
};

const putActionsToProps = (dispatch) => {
  return {
    changeTitleReview: bindActionCreators(changeTitleReview, dispatch),
    getSearchedTitles: bindActionCreators(getSearchedTitles, dispatch),
  };
};

export default connect(putStateToProps, putActionsToProps)(ShowTitles);
