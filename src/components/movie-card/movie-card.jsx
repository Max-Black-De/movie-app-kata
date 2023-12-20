import React from 'react';
import { Button, Flex, Typography, Rate } from 'antd';
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';
import { PropTypes } from 'prop-types';

import './movie-card.css';

function MovieCard(props) {
  const {
    movieId,
    title,
    date,
    overview,
    poster,
    rating,
    myRating,
    genreIdsArr,
    genresDataAr,
    onRatedMovie
  } = props;

  const worldRating = () => {
    const stringRating = rating.toString()
    if (stringRating.length > 3) {
      return stringRating.slice(0, -2)
    }
    return stringRating
  }

  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500/${poster}`
    : 'https://clipground.com/images/food-availability-clipart-17.png'

  const releaseDate = date
    ? format(new Date(date), 'MMMM d, yyy')
    : <p>Release date is not available;</p>

  const newOverview = overview || <p>Overview is not available</p>;

  const ratingColor = () => {
    let color = ''
    if (Math.trunc(rating) >= 0 && Math.trunc(rating) < 3) {
      color = '#E90000'
    }
    if (Math.trunc(rating) >= 3 && Math.trunc(rating) < 5) {
      color = '#E97E00'
    }
    if (Math.trunc(rating) >= 5 && Math.trunc(rating) < 7) {
      color = '#E9D100'
    }
    if (Math.trunc(rating) >= 7) {
      color = '#66E900'
    }
    return color
  };
  const ratingStyle = {
    width: 30,
    height: 30,
    flexShrink: 0,
    border: `solid 2px`,
    borderColor: `${ratingColor()}`,
    borderRadius: '50px',
    strokeWidth: 2,
    stroke: `${ratingColor()}`,
  };
  const sortGenres = () => genresDataAr.reduce((acc, el) => {
    genreIdsArr.forEach(elem => {
      if (el.id === elem) {
        acc.push(el.name)
      }
    })
    return acc
  }, []);
  const genresItem = () => {
    if (genreIdsArr.length !== 0) {
      const sortedGenres = sortGenres(genresDataAr, genreIdsArr).map(genre =>
        <Button className='genresItem' key={uuidv4()} size='small' >
          {genre}
        </Button>
      )
      return sortedGenres
    }
    return <p> There are no any genres </p>

  };

  return (
    <li className='movieCardItem'>
      <div className='card-body'>
        <Flex className='card-flex-main'>
          <Flex >
            <img
              className='movie-poster'
              alt='movie poster'
              src={posterUrl}
            />
          </Flex>
          <Flex
            className='main-info-block'
            vertical
          >
            <Flex
              vertical
              align='start'
              gap={7}
              style={{
                paddingBottom: 7
              }}
            >
              <Flex className='title-rating-block'>
                <Typography.Title className='movieCardTitle'
                  level={5}
                >
                  {title}
                </Typography.Title>
                <Typography.Text className='worldRating'
                  style={ratingStyle}>
                  {worldRating()}
                </Typography.Text>
              </Flex>

              <Typography.Text className='date-release'>
                {releaseDate}
              </Typography.Text>

              <Flex className='movie-genres'
                gap={8}
                wrap='wrap'
              >
                {genresItem()}
              </Flex>
            </Flex>
            <Typography.Paragraph
              className='overview-paragraph'
              align='start'
            >
              {newOverview}
            </Typography.Paragraph>
            <Rate className='user-rating-block'
              // value={myRating}
              onChange={(value) => onRatedMovie(movieId, value)}
              allowHalf
              defaultValue={myRating}
              count={10}
            />
          </Flex>
        </Flex>
      </div>
    </li>
  )
}

MovieCard.propTypes = {
  genresDataAr: PropTypes.arrayOf.isRequired,
  onRatedMovie: PropTypes.func.isRequired,
  genreIdsArr: PropTypes.arrayOf.isRequired,
  overview: PropTypes.string.isRequired,
  myRating: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default MovieCard;
