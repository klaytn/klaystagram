import React from 'react'

import './Loading.scss'

const Loading = () => (
  <div className="Loading">
    <img
      src="/images/loading.png"
      className="Loading__spinner"
      alt="loading"
    />
  </div>
);

export default Loading;
