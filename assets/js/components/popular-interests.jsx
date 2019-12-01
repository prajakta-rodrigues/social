import React from 'react';
import { connect } from 'react-redux';
import ReactWordcloud from 'react-wordcloud';
import word from './word';
import {getPopularInterests} from "../ajax";
import store from '../store';


class PopularInterests extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    this.state = {
      redirect: null,
    };
    getPopularInterests();
  }

  render() {
    //just random words for now need to populate actual interests after seeding

    let Pop = connect(({popularInterests}) =>
    ({popularInterests}))(({popularInterests, dispatch}) =>{
      console.log("in", popularInterests);
      let interests = [];
      // if(flag == 0){
      //   get_recommended_users();
      //   flag = 1;
      // }
      if(popularInterests.length < 30) {
        return (
          <h2>No Popular Interests available</h2>);
      }
      return <ReactWordcloud words={popularInterests} />;

    });



    return (
      <div style={{height: 400, width: 600}}>
          <Pop />
        </div>

);
  }
}


export default PopularInterests;
