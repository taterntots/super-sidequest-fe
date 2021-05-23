import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

// ----------------------------------------------------------------------------------
// ---------------------------------- LOAD SPINNER ----------------------------------
// ----------------------------------------------------------------------------------

const LoadingSpinner = ({ loading }) => {
  const color = '#FFFF00';
  const override = css`
  position: absolute;
  top: 50%;
  left: 44%;
`;

  return (
    <>
      <PacmanLoader color={color} loading={loading} css={override} size={50} />
    </>
  );
}

export default LoadingSpinner;