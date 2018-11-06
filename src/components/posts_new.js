import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title',
    name: 'title'
  },
  categories: {
    type: 'input',
    label: 'Category',
    name: 'categories'
  },
  content: {
    type: 'textarea',
    label: 'Post content',
    name: 'content'
  }
};

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <field.type
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  createField(field) {
    return (
      <Field
        label={field.label}
        name={field.name}
        type={field.type}
        component={this.renderField}
        key={field.name}
      />
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='beautiful-rect'>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          {_.map(FIELDS, this.createField.bind(this))}

          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className='btn btn-warning'>Cancel</Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    console.log(type);
    console.log(field)
    if (!values[field]) {
      errors[field] = `Please enter a ${field}`;
    }
  });

  return errors;
}

// validate <=> validate: validate
export default reduxForm({
  validate,
  fields: _.keys(FIELDS),
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
