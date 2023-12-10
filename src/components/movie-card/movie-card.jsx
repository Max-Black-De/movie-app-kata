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
  const { title, date, overview, poster, rating } = props;
  const url = `https://image.tmdb.org/t/p/w500/${poster}`
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
  }

  return (
    <li className='movieCardItem'>
      <Card
        hoverable
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
              <Flex
                style={stylesTitleRatingBlock}
              >
                <Typography.Title
                  style={{
                    margin: 0
                  }}
                  level={5}
                >
                  {title}
                </Typography.Title>
                <Typography.Text style={ratingStyle}>
                  {rating.toFixed(1)}
                </Typography.Text>
              </Flex>

              <Typography.Text>
                {newDate}
              </Typography.Text>

              <Flex
                gap={8}
              >
                <Button size='small' href="https://ant.design" target="_blank">
                  Action
                </Button>
                <Button size='small' href="https://ant.design" target="_blank">
                  Drama
                </Button>
              </Flex>
            </Flex>
            <Typography.Paragraph
              align="start"
              style={pStyle}
            >
              {newOverview}
            </Typography.Paragraph>
            <Rate theme={{
              token: {
                /* here is your global tokens */
                colorText: 'rgba(255, 0, 0, 1)',
                fontSize: 17,
                marginXS: 18
              },
            }}
              allowHalf defaultValue={0} count={10} />
          </Flex>
        </Flex>
      </Card>
    </li>
  )
}

export default MovieCard;
