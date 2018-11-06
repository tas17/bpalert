import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
          <Link to={`posts/${post.id}`} className='classical-rect' key={post.id}>
            <li className='list-group-item'>
              {post.title}
            </li>
          </Link>
      );
    })
  }

  render() {
    return (
      <div>
        <div className='beautiful-rect'>
          <div className='title'>
            <h3>Articles</h3>
          </div>
          <ul className='list-group'>
            {this.renderPosts()}
          </ul>
        </div>
        <div className='text-xs-right'>
          <Link className='btn btn-secondary' to='/posts/new'>
            Add a Post
          </Link>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
