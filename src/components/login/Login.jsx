import React from "react";
import { reduxForm } from "redux-form";
import { Input } from "../common/formsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redax/auth-reducer"
import { Redirect } from "react-router-dom";
import style from "../../components/common/formsControls/FormsControls.module.css"
import { createField } from "../../components/common/formsControls/FormsControls"

const LoginForm = ({ handleSubmit, _error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} action="">
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, { type: "password" })}
            <div className="globolColorText">
                {createField("rememberMe", "rememberMe", null, Input, { type: "checkbox" }, "remember me")}
            </div>
            {captchaUrl && <img src={captchaUrl} alt={"captcha"} />}
            {captchaUrl && createField("antibot symbols", "captcha", [required], Input, {})}
            {_error && <div className={style.formSummaryError}>{_error}</div>}
            <div><button className={"button"}><svg className={"button__svg"}><rect className={"button__rect"}></rect></svg>Login</button></div>

        </form>)
}


const ReduxLoginForm = reduxForm({
    form: "login"
})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (<div>
        <h1 className={"globolColorText"}>Login</h1>
        <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captcha} />
    </div>)
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captchaUrl,
})
export default connect(mapStateToProps, { login, })(Login)