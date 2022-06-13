import React from 'react';
import {css} from '@emotion/react';
import RingLoader from 'react-spinners/MoonLoader';

//Css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingComponent = () => {
  return  <RingLoader color='red' loading={true} css={override} />;
};

export default LoadingComponent;
