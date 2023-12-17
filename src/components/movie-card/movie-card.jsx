import React from 'react';
import { Button, Card, Flex, Typography, Rate } from 'antd';
import { format } from 'date-fns'

import './movie-card.css';

const cardStyle = {
  // width: 451,
  // height: 279,
};
const imgStyle = {
  display: 'block',
  width: 183,
  height: 281
};
const pStyle = {
  margin: 0, 
  flexGrow: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#000',
  // @font-size-sm: 12,
  fontFamily: 'Inter',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '22px', /* 183.333% */
};
const stylesTitleRatingBlock = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

function MovieCard(props) {
  const { movieId, title, date, overview, poster, rating, myRating, genreIdsArr, genresDataAr, onRatedMovie } = props;
  const worldRating = () => {
    const stringRating = rating.toString()
    if(stringRating.length > 3) {
      return stringRating.slice(0, -2)
    }
    return stringRating
  }
  
  const url = poster
    ? `https://image.tmdb.org/t/p/w500/${poster}`
    : 'https://clipground.com/images/food-availability-clipart-17.png'
  
  const newDate = date
    ? format(new Date(date), 'MMMM d, yyy')
    : 'Release date is not available';

  const newOverview = overview || 'Overview is not available';
  const ratingColor = (rating) => {
    let color = '';
    if (Math.round(rating) >= 0 && Math.round(rating) < 3) {
      color = '#E90000'
    }
    if (Math.round(rating) >= 3 && Math.round(rating) < 5) {
      color = '#E97E00'
    }
    if (Math.round(rating) >= 5 && Math.round(rating) < 7) {
      color = '#E9D100'
    }
    if (Math.round(rating) >= 7) {
      color = '#66E900'
    }
    return color
  };
  const ratingStyle = {
    width: 30,
    height: 30,
    flexShrink: 0,
    border: `solid 2px`,
    borderColor: `${ratingColor(rating)}`,
    borderRadius: '50px',
    strokeWidth: 2,
    stroke: `${ratingColor(rating)}`,
  };
  const sortGenres = (genresDataAr, genreIdsArr) => {
    return genresDataAr.reduce((acc, el) => {
      genreIdsArr.forEach(elem => { 
        if(el.id === elem ){
          acc.push(el.name)
        }
      })
      return acc
    }, []);
  };
  const genresItem = () => {
    // console.log(genresDataAr)
    return sortGenres(genresDataAr, genreIdsArr).map(id => 
      <Button key={id} size='small' >
        {id}
      </Button>
    )
  };

  return (
    <li className='movieCardItem'>
      <Card
        style={cardStyle}
        bodyStyle={{
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <Flex>
          <Flex>
            <img
              alt='movie poster'
              src={url}
              style={imgStyle}
            />
          </Flex>
          <Flex
            vertical
            style={{
              paddingTop: 12,
              paddingLeft: 20,
              paddingRight: 7
            }}
          >
            <Flex
              vertical
              align='start'
              gap={7}
              style={{
                paddingBottom: 7
              }}
            >
              <Flex style={stylesTitleRatingBlock}>
                <Typography.Title
                  style={{
                    margin: 0
                  }}
                  level={5}
                >
                  {title}
                </Typography.Title>
                <Typography.Text style={ratingStyle}>
                  {worldRating()}
                </Typography.Text>
              </Flex>

              <Typography.Text>
                {newDate}
              </Typography.Text>

              <Flex
                gap={8}
                wrap='wrap'
              >
                {genresItem()}
              </Flex>
            </Flex>
            <Typography.Paragraph
              align='start'
              style={pStyle}
            >
              {newOverview}
            </Typography.Paragraph>
            <Rate
              value={myRating}
              onChange={(value) => onRatedMovie(movieId, value)}
              allowHalf
              // defaultValue={myRating}
              count={10}
              theme={{
                token: {
                  colorText: '#afaf'
                  /* here is your global tokens */
                },
              }}
            />
          </Flex>
        </Flex>
      </Card>
    </li>
  )
}

export default MovieCard;
