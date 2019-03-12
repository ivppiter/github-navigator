import axios from 'axios';
import React, { Component } from 'react';

function withCommits(ChildComponent) {
  return class GetCommitsForRepo extends Component {
    constructor(props){
      super(props);

      this.state = {
        commitList: []
      };

      this.getCommits = this.getCommits.bind(this);

      console.log('Constructor', props.url);
    }

    componentDidMount(){
      this.getCommits(`${this.props.url}/commits`);
    }

    componentWillReceiveProps(nextProps){
      console.log('called componentWillReceiveProps');
      this.getCommits(`${nextProps.url}/commits`)
    }

    render(){
      const { commitList } = this.state
      return <ChildComponent {...this.props} commitList={commitList}/>;
    }

    async getCommits(commitUrl){
      console.log('Using url ', commitUrl);
      try {
        const { data } = await axios.get(commitUrl);
        this.setState({ commitList: data });
      } catch {
        this.setState({ commitList: [] });
      }
    }
  }
}

export default withCommits;
