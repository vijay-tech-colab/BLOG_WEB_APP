
import React, { useEffect } from 'react'
import BlogHero from './Home'

import BlogLanding from './BlogLanding'

function BlogPage({children}) {
  useEffect(() => {
    window.document.title = "Blog App"
},[]);
  return (
    <>
      
      <BlogLanding/>
    </>
  )
}

export default BlogPage