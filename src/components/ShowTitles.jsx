import * as React from 'react';
import { Image, Rating, Segment, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { changeTitleReview } from '../store/actions/showTitlesActions';
import { toggleTheme } from '../store/actions/themeActions';

function ShowTitles(props) {
  const { titles, darkTheme, changeTitleReview, toggleTheme } = props;

  const titlesList = titles.map((item, index) => (
    <div key={index} className="t-preview">
      <Image src={item.cover_path} onClick={() => changeTitleReview(item)} id={item.id}/>
      <div className="t-info">
        <h4>{item.name}</h4>
        <div>
          <Rating maxRating={5} size="tiny" clearable disabled defaultRating={item.rating}/>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="c-show-titles">
      <Helmet>
        <style>{`
          .t-preview { background: ${darkTheme ? '#1b1c1d' : '#ffffff' }}
          .t-info h4 { color: ${darkTheme ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,.87)' }}
          .ui.rating .active.icon { color: ${darkTheme ? '#bd247ae0' : 'rgba(0,0,0,0.85)' }}
          .ui.rating .icon { color: ${darkTheme ? '#fcfcfc2b' : 'rgba(0,0,0,0.15)' }}
          .ui.rating .icon.selected.active { color: ${darkTheme ? '#e61a8d' : 'rgba(0,0,0,0.87)' }}
          .ui.rating .icon.selected { color: ${darkTheme ? '#e61a8d' : 'rgba(0,0,0,0.87)' }}
        `}</style>
      </Helmet>

      <Segment inverted={darkTheme} className="header-segment">
        <Button basic size='mini'
          inverted={darkTheme}
          onClick={() => toggleTheme(!darkTheme)}
          content={darkTheme ? 'Light' : 'Dark'}
        />
      </Segment>

      <div className="t-view">{titlesList}</div>
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
