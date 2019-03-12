import React, { Component } from 'react';
import axios from 'axios';

const GITHUB_BASE_URL="https://api.github.com"

function withOrganizationRepos(ChildComponent){
  return class GetRepositoriesFromGithub extends Component {
    constructor(props){
      super(props);

      this.state = {
        organization: '',
        repositoryList: [],
        isValid: undefined
      };

      this.getRepositoryList = this.getRepositoryList.bind(this);
      this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    }

    render(){
      return (
        <ChildComponent {...this.state} onChange={this.handleOrganizationChange}/>
      )
    } 

    async getRepositoryList(){
      this.setState({ isValid: undefined });
      try {
        const { data } = await axios.get(`${GITHUB_BASE_URL}/orgs/${this.state.organization}/repos`);
        this.setState({ repositoryList: data, isValid: true });
      } catch (error) {
        this.setState({ isValid: false, repositoryList:[] });
      }
    }

    handleOrganizationChange(organization){
      if(this.state.pendingQuery){ 
        clearTimeout(this.state.pendingQuery); 
      }
      const pendingQuery = setTimeout(this.getRepositoryList, 500);
      this.setState({ organization, pendingQuery, isValid: false });
    }
  }
}

export default withOrganizationRepos;
