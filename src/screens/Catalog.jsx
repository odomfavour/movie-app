import React from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../layouts/PageWrapper';

const Catalog = () => {

  const {category} = useParams();
  console.log(category)
  return (
    <PageWrapper>
      Catalog
      </PageWrapper>
  )
}

export default Catalog