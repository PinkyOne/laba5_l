import React, { Component } from 'react';
import {
  Control,
  Errors,
  Form as ReduxForm,
  actions,
} from 'react-redux-form';

export default class Form extends Component {
  constructor() {
    super();

    this.commonStyles = {
      marginBottom: '20px',
    };

    this.formStyles = {
      display: 'flex',
      flexDirection: 'column',
    };

    this.buttonStyles = {
      width: '150px',
    };
  }

  render() {
    const {
      onSubmit,
      label = '',
      submitText = 'Подтвердить',
      model,
      disabled,
    } = this.props;

    return (
      <ReduxForm
        model={ model }
        onSubmit={ model => onSubmit && onSubmit(model) }
        style={ Object.assign(this.formStyles, this.commonStyles) }
      >
        <label
          style={ this.commonStyles }
          htmlFor='.amount'
        >
          {label}
        </label>
        <Control.text
          type='number'
          model='.amount'
          id='.amount'
          placeholder='Cумма'
          style={ this.commonStyles }
        />
        <button style={ this.buttonStyles } type='submit' disabled={ disabled }>
          {submitText}
        </button>
      </ReduxForm>
    );
  }
}
