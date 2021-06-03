import * as React from 'react';
import { Button, Image, Menu, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  toggleFavoriteButton,
  changeSelectedTags,
  changeSearchField,
} from '../store/actions/sideMenuActions';
import { changeTitleReview } from '../store/actions/showTitlesActions';
import { bindActionCreators } from 'redux';

const TAGS = require('./db/animeTagsList.json');

function SideMenu(props) {
  const {
    searchInput,
    selectedTags,
    favorites,
    toggleFavoriteButton,
    changeSelectedTags,
    changeSearchField,
    changeTitleReview,
  } = props;

  return (
    <div className="SMenu">
      <Menu vertical inverted compact borderless fluid>
        <Menu.Item>
          <Image
            src="/src/public/Logo1.png"
            className="mainLogo"
            size="small"
            onClick={() => changeTitleReview(null)}
          />
          <h1>/a/viewer</h1>
        </Menu.Item>

        <Menu.Item>
          <Input
            placeholder="Search..."
            inverted
            value={searchInput}
            onChange={(e) => changeSearchField(e.target.value)}
          />
        </Menu.Item>

        {favorites == false ? (
          <Button
            basic
            color="pink"
            content="Favorites"
            icon="heart"
            size="tiny"
            value={true}
            onClick={() => toggleFavoriteButton(true)}
          />
        ) : (
          <Button
            color="pink"
            content="Favorites"
            icon="heart"
            size="tiny"
            value={false}
            onClick={() => toggleFavoriteButton(false)}
          />
        )}

        <Menu.Item>
          <h4>Tags</h4>
          {TAGS.map((item, index) =>
            selectedTags.includes(item) ? (
              <Button
                compact
                active={true}
                color="teal"
                size="small"
                key={index}
                value={item}
                style={{ margin: 3 }}
                onClick={(e) => changeSelectedTags(e.target.value)}
              >
                {item}
              </Button>
            ) : (
              <Button
                compact
                basic
                toggle
                active={true}
                color="grey"
                size="small"
                key={index}
                value={item}
                style={{ margin: 3 }}
                onClick={(e) => changeSelectedTags(e.target.value)}
              >
                {item}
              </Button>
            ),
          )}
        </Menu.Item>
      </Menu>
    </div>
  );
}

const putStateToProps = (state) => {
  return {
    searchInput: state.searchInput,
    selectedTags: state.selectedTags,
    favorites: state.favorites,
  };
};

const putActionsToProps = (dispatch) => {
  return {
    toggleFavoriteButton: bindActionCreators(toggleFavoriteButton, dispatch),
    changeSelectedTags: bindActionCreators(changeSelectedTags, dispatch),
    changeSearchField: bindActionCreators(changeSearchField, dispatch),
    changeTitleReview: bindActionCreators(changeTitleReview, dispatch),
  };
};

export default connect(putStateToProps, putActionsToProps)(SideMenu);
