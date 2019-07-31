import React, { Component } from "react";
import { string, func, bool } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import "./Form.css";
import { formattedText } from "../../translations";
import MailInput from "./components/MailInput";
import PasswordInput from "./components/PasswordInput";
import { signInForm } from "./selectors";
import { setIsLoading, clearForm } from "./actions";
import { HOME } from "../../Routes";

class Form extends Component {
  validateForm = () => {
    const { mail, password } = this.props;
    return mail.length > 0 && password.length > 0;
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { 
      mail, password, setIsLoading, signIn, clearForm, history 
    } = this.props;

    setIsLoading(true)
    
    try {
      await signIn(mail, password);
      clearForm();
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        history.push(HOME);
        clearForm();
      } else { 
        alert(err.message);
      }
    }
    
    setIsLoading(false);
  };

  render () {
    const { isLoading  } = this.props;
    return (
      <BootstrapForm  onSubmit={this.handleSubmit} className="SignIn">
        <MailInput />
        <PasswordInput />
        <Button variant="success"
                type="submit"
                size="lg"
                disabled={ !this.validateForm() || isLoading }>
          { !isLoading
              ? formattedText("signIn.login")
              : formattedText("signIn.loginIn") }
        </Button>
      </BootstrapForm>
    );
  }
}

Form.propTypes = {
  mail: string,
  password: string,
  isLoading: bool,
  setIsLoading: func.isRequired,
  signIn: func.isRequired,
  clearForm: func.isRequired,
};

Form.defaultProps = {
  mail: '',
  password: '',
  isLoading : false,
};

const mapStateToProps = (state) => {
  const { mail, password, isLoading } = signInForm(state);
  return { mail, password, isLoading };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setIsLoading, clearForm }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
