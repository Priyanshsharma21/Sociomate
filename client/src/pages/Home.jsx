import React from 'react'
import withContainer from '../hof/Hof';
import {Row, Col} from 'antd'
import { UserCard,Feed,NewsCard } from '../components'



const Home = () => {
  return (
    <div className="home w-full">
      <Row>
        <Col xl={6} lg={6} md={24} sm={24} xs={24}>
          <UserCard />
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <Feed />
        </Col>
        <Col xl={6} lg={6} md={24} sm={24} xs={24}>
          <NewsCard />
        </Col>
      </Row>
    </div>
  )
}

export default withContainer(Home);



// https://source.unsplash.com/1600x900/?nature,photography,technology