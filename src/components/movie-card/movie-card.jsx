import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import { format } from 'date-fns'


import './movie-card.css';

const cardStyle = {
  width: 451,
  height: 279,
};
const imgStyle = {
  display: 'block',
  width: 183,
  height: 281
};
const pStyle = {
    width: 218,
    height: 157,
    overflow: 'hidden',
    // whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

function MovieCard(props) {
  const {title, date, overview, poster} = props;
  // console.log(props)
  const url = `https://image.tmdb.org/t/p/w500/${poster}`
  let newDate = date 
                    ? format (new Date(date), 'MMMM d, yyy') 
                    : 'Release date is not available';
  let newOverview = overview || 'Overview is not available';
  return (
    <li>
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
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20
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
            <Typography.Title
              style={{
                margin: 0
              }}
              level={5}
              >
                {title}
            </Typography.Title>

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
        </Flex>
      </Flex>
    </Card>
  </li>
  )
}

export default MovieCard;
