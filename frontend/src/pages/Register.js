import React, { useContext, useState } from "react";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

function Register(props) {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Message
        attached
        header="Register"
        content="Fill out the form below to sign-up for a new account"
      />
      <Form
        onSubmit={onSubmit}
        noValidate
        className={
          loading ? "loading attached fluid segment" : "attached fluid segment"
        }
      >
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
        <Form.Checkbox required label="I agree to the Terms and Conditions" />
        <Button type="submit" secondary>
          Register
        </Button>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Already signed up?&nbsp;<Link to="/login">Login here</Link>
        &nbsp;instead.
      </Message>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
