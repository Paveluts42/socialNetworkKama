import React from "react";
import s from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/formsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redax/auth-reducer"
import { Redirect } from "react-router-dom";
import style from "../../components/common/formsControls/FormsControls.module.css"

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="">
            <div><Field placeholder={"Email"} name={"email"} validate={[required]} component={Input} /></div>
            <div><Field placeholder={"Password"} name={"password"} type={"password"} validate={[required]} component={Input} /></div>
            <div className={"globolColorText"} ><Field name={"rememberMe"} component={Input} type={"checkbox"} /> remember me</div>
            {props.error && <div className={style.formSummaryError}>{props.error}</div>}
            <div><button className={s.button}><svg className={s.button__svg}><rect className={s.button__rect}></rect></svg>Login</button></div>

        </form>)
}


const ReduxLoginForm = reduxForm({
    form: "login"
})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (<div>
        <h1 className={"globolColorText"}>Login</h1>
        <ReduxLoginForm onSubmit={onSubmit} />
    </div>)
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login, })(Login)