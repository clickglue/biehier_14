 import { connect } from 'react-redux';
import { signInUser, clearState } from '../../modules/auth';
import {drinkersListRequest} from '../../modules/drinkers'
import React, { Component, PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { Container, Input, Button, Item, Spinner } from '../../components/common';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password } = props;
    this.props.signInUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>

        <Item>
          <Field
            name="email"
            component={Input}
            placeholder="Email"
          />
        </Item>

        <Item>
          <Field
            name="password"
            component={Input}
            secureTextEntry
            placeholder="Password"
          />
        </Item>

        {this.props.authError
          ?
            <Text style={styles.error}>
              {this.props.authError}
            </Text>
          :
            <View />}

        {this.props.loading
          ?
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          :
            <Item>
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Log in</Button>
            </Item>}
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;
};

//Signin.propTypes = propTypes;
Signin = reduxForm({ form: 'signin', validate })(Signin);

//
const styles = {
    error: {
      fontSize: 20,
      alignSelf: 'center',
      color: '#e62117',
      paddingTop: 20,
      paddingBottom: 10,
    },
    loadingContainer: {
      paddingTop: 20,
      paddingBottom: 10,
    },
    questionContainer: {
      flex: 1,
      marginTop: 10,
      marginBottom: 10,
    },
    questionText: {
      textAlign: 'center',
      color: '#4d4d4d',
    },
  };

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps, { signInUser, clearState, drinkersListRequest })(Signin);
