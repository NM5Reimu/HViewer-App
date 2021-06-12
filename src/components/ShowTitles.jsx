import * as React from 'react';
import { Image, Rating, Segment, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeTitleReview } from '../store/actions/showTitlesActions';
import { toggleTheme } from '../store/actions/themeActions';

function ShowTitles(props) {
  const { titles, darkTheme, changeTitleReview, toggleTheme } = props;

  const titlesList = titles.map((item, index) => (
    <div key={index} className="titlePreviewCover">
      <Image src={item.cover_path} onClick={() => changeTitleReview(item)} id={item.id}/>
      <div className="nameAndRating">
        <h4>{item.name}</h4>
        <div>
          <Rating maxRating={5} size="tiny" clearable disabled defaultRating={item.rating}/>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="SContent">
      <Segment inverted={darkTheme} className="header-segment">
        <Button basic size='mini'
          inverted={darkTheme}
          onClick={() => toggleTheme(!darkTheme)}
          content={darkTheme ? 'Light' : 'Dark'}
        />
      </Segment>

      <div className="titleView">{titlesList}</div>
    </div>
  );
}

const putStateToProps = (state) => {
  return {
    titles: state.titles,
    darkTheme: state.darkTheme
  };
};

const putActionsToProps = (dispatch) => {
  return {
    changeTitleReview: bindActionCreators(changeTitleReview, dispatch),
    toggleTheme: bindActionCreators(toggleTheme, dispatch),
  };
};

export default connect(putStateToProps, putActionsToProps)(ShowTitles);
