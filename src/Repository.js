import './Repository.css';

import React from 'react';

import withCommits from './withCommits';

function Repository(props) {
  const { commitList } = props;

  return (
    <table className="commit-table">
      <tbody>
        {commitList.length < 1 && <NoCommits />}
        {commitList.map(c => (
          <tr id={c.sha} key={c.sha}>
            <td>{c.author && <img style={{ width: '35px', height: '35px' }} src={c.author.avatar_url} alt="commit author" />}</td>
            <td className="commit-author"><span>{c.commit.author.name}</span></td>
            <td><span>{c.commit.message}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default withCommits(Repository);

const NoCommits = () => (
  <tr>
    <td>
      <span>No commits found in repository</span>
    </td>
  </tr>
);
