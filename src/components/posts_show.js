import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
import { confirmAlert } from 'react-confirm-alert';


class PostsShow extends Component {
  componentDidMount() {
    // takes the id from the url
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  confirmDeletion = () => {
    confirmAlert({
      title: 'Warning',
      message: 'You are about to delete this post. Are you sure ?',
      buttons: [
        {
          label: 'Yes, delete it',
          onClick: () => this.onDeleteClick()
        },
        {
          label: 'No, cancel'
        }
      ]
    })
  };

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>

        <div className='beautiful-rect'>
          <h3 className='title'>{post.title}</h3>
          <h6 className='text-xs-right'>Category : {post.categories}</h6>
          <p>{post.content}</p>
        </div>

        <Link to='/' className='btn btn-info'>Back to Index</Link>
        <button
          className='btn btn-danger padded'
          onClick={ this.confirmDeletion }
        >
          Delete Post
        </button>

      </div>
    );
  };
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
