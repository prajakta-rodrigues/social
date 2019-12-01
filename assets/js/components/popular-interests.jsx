import React from 'react';
import { connect } from 'react-redux';
import {getPopularInterests} from "../ajax";
import store from '../store';
import { render } from 'react-dom';
import { TagCloud } from 'react-tagcloud'


const Pop = connect(({popularInterests}) =>
({popularInterests}))(({popularInterests, dispatch}) =>{
  console.log("in", popularInterests);

  return (<div>
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={popularInterests}
      />
  </div>);
});





class PopularInterests extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    this.state = {
      redirect: null,
      data: []
    };
    getPopularInterests();

  }

  render() {
    return (
      <div class="popular-interests" id="scroll">
        <Pop />
      </div>

    );
  }
}


export default PopularInterests;
