import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

// ----------------------------------------------------------------------------------
// ---------------------------------- LOAD SPINNER ----------------------------------
// ----------------------------------------------------------------------------------

const LoadSpinner = ({ loading }) => {
  const color = '#FFFF00';
  const override = css`
    display: flex;
    justify: center;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <>
      <PacmanLoader color={color} loading={loading} css={override} size={14} />
    </>
  );
}

export default LoadSpinner;