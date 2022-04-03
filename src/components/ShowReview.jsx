import React, { useState } from 'react';
import { Button, Image, Header, Segment, Grid, Rating, Dimmer, Embed } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { setTitleRating, setTitleFavorite } from '../store/actions/showReviewActions';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Autoplay, Pagination, Navigation]);

function ShowReview(props) {
  const { review, darkTheme, setTitleRating, setTitleFavorite } = props;

  const [state, setState] = useState({
    sDimmerContent: '',
    vDimmerContent: '',
  });

  //Разделение на строки по 4 видео
  const rows = [...Array(Math.ceil(review.video.length / 4))];
  const itemRows = rows.map((row, idx) => review.video.slice(idx * 4, idx * 4 + 4));
  const videoRows = itemRows.map((row, idx) => (
    <Grid.Row key={idx}>
      {row.map((item, index) => (
        <Grid.Column key={index}>
          <Embed
            icon="play"
            placeholder={item.placeholder}
            url={item.video_path}
            active={false}
            onClick={() => setState({ ...state, vDimmerContent: item.video_path })}
            style={{ boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.5)' }}
          />
          <h4>Part {item.part}</h4>
        </Grid.Column>
      ))}
    </Grid.Row>
  ));

  return (
    <div key={review.id} className={'c-show-review animate__animated animate__fadeIn'}>
      <Helmet>
        <style>{`
          .ui.rating .active.icon { color: ${darkTheme ? '#bd247ae0' : 'rgba(0,0,0,0.85)'}}
          .ui.rating .icon { color: ${darkTheme ? '#fcfcfc2b' : 'rgba(0,0,0,0.15)'}}
          .ui.rating .icon.selected.active { color: ${darkTheme ? '#e61a8d' : 'rgba(0,0,0,0.87)'}}
          .ui.rating .icon.selected { color: ${darkTheme ? '#e61a8d' : 'rgba(0,0,0,0.87)'}}
        `}</style>
      </Helmet>

      <Grid columns={2} padded>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={review.cover_path} className="img-cover" />

            <Segment inverted={darkTheme} style={{ verticalAlign: 'middle' }}>
              <Rating
                maxRating={5}
                onRate={(e, { rating }) => setTitleRating(review.id, rating)}
                size="huge"
                clearable
                defaultRating={review.rating}
                floated="left"
                style={{ paddingTop: 3 }}
              />
              {review.favorites ? (
                <Button
                  color="pink"
                  content="Favorite"
                  icon="heart"
                  floated="right"
                  size="tiny"
                  onClick={() => setTitleFavorite(review.id, false)}
                />
              ) : (
                <Button
                  basic
                  color="pink"
                  content="Favorite"
                  icon="heart"
                  floated="right"
                  size="tiny"
                  onClick={() => setTitleFavorite(review.id, true)}
                />
              )}
            </Segment>
          </Grid.Column>

          <Grid.Column width={13} className="title-info">
            <Grid columns="2" stretched>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Segment inverted={darkTheme}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          <h3>{review.name}</h3>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={4}>
                          <h4>Studios</h4>
                          {review.titleInfo.studios}
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <h4>Episodes</h4>
                          {review.titleInfo.episodes}
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <h4>Release</h4>
                          {review.titleInfo.release}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={16} style={{ textAlign: 'justify' }}>
                          <h4>Description</h4>
                          {review.titleInfo.description}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Segment inverted={darkTheme}>
                    <h4>Tags</h4>
                    <Button basic color="purple" size="tiny" style={{ marginBottom: 3 }}>
                      {review.titleInfo.studios}
                    </Button>
                    {review.tags.map((item, index) => (
                      <Button
                        basic
                        color="pink"
                        size="tiny"
                        key={index}
                        style={{ marginBottom: 3 }}
                      >
                        {item}
                      </Button>
                    ))}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Segment inverted={darkTheme}>
              <h4>Frames</h4>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {review.screenshots_paths.map((item, index) => (
                  <SwiperSlide>
                    <Image
                      src={item}
                      onClick={() => setState({ ...state, sDimmerContent: item })}
                      key={index}
                      className="img-frame"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Segment raised inverted={darkTheme}>
              <h4>Watch</h4>
              <Grid columns="4" relaxed padded divided>
                {videoRows}
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Dimmer
        active={state.sDimmerContent !== ''}
        onClickOutside={() => setState({ ...state, sDimmerContent: '' })}
        page
      >
        <Image src={state.sDimmerContent} />
      </Dimmer>

      <Dimmer
        active={state.vDimmerContent !== ''}
        onClickOutside={() => setState({ ...state, vDimmerContent: '' })}
        page
      >
        <video
          autoPlay="autoplay"
          width="1280"
          height="720"
          controls="controls"
          className="dimmer-player"
        >
          <source src={state.vDimmerContent} type="video/mp4" />
        </video>
      </Dimmer>
    </div>
  );
}

const putStateToProps = (state) => {
  return {
    review: state.review,
    darkTheme: state.darkTheme,
  };
};

const putActionsToProps = (dispatch) => {
  return {
    setTitleRating: bindActionCreators(setTitleRating, dispatch),
    setTitleFavorite: bindActionCreators(setTitleFavorite, dispatch),
  };
};

export default connect(putStateToProps, putActionsToProps)(ShowReview);
