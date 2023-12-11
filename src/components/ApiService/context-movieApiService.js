import React from 'react'

const {
  Provider : MoviesApiServiceProvider,
  Consumer : MoviesApiServiceConsumer
} = React.createContext();

export { MoviesApiServiceProvider, MoviesApiServiceConsumer}