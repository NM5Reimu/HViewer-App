import React, { Component } from 'react';
import SideMenu from './SideMenu.jsx';
import ShowTitles from './ShowTitles.jsx';
import ShowReview from './ShowReview.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSearchedTitles } from '../store/actions/appActions.js';
import 'semantic-ui-css/semantic.min.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSearchedTitles();
    console.log('componentDidMount()');
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchInput !== this.props.searchInput
      || prevProps.selectedTags.length !== this.props.selectedTags.length
      || prevProps.favorites !== this.props.favorites
      || prevProps.review !== ''
    ) {
      this.props.getSearchedTitles();
      console.log('componentDidUpdate()');
    }
  }

  render() {
    return (
      <div>
        <SideMenu />
        {this.props.review ? <ShowReview /> : <ShowTitles />}
      </div>
    );
  }
}

const putStateToProps = (state) => {
  console.log(state);
  return {
    review: state.review,
    searchInput: state.searchInput,
    selectedTags: state.selectedTags,
    favorites: state.favorites,
  };
};

const putActionsToProps = (dispatch) => {
  return {
    getSearchedTitles: bindActionCreators(getSearchedTitles, dispatch),
  };
};

export default connect(putStateToProps, putActionsToProps)(MainPage);
