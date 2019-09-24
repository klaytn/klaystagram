import React from 'react'
import UploadButton from 'components/UploadButton'
import Feed from 'components/Feed'

import './FeedPage.scss'

const FeedPage = () => (
  <main className="FeedPage">
    <Feed />
    <UploadButton />
  </main>
)

export default FeedPage
