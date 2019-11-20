import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./Dialogitem/Dialogsitem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form"
const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component="textarea" name="newMessageBody" placeholder={"enter you message"} />
      </div>
      <div>
        <button className={s.button} ><svg className={s.button__svg}> <rect className={s.button__rect}></rect></svg>send</button>
      </div>
    </form>)
}
const MessageForm = reduxForm({ form: "dialog" })(AddMessageForm)


const Dialogs = props => {
  let dialogsElements = props.dialogsData.map(d => {
    return <DialogItem key={d.id} name={d.name} id={d.id} />;
  });

  let messagesElement = props.dialogsMessages.map(m => {
    return <Message key={m.id} message={m.message} id={m.id} />;
  });


  let AddNewMessage = (values) => {
    props.addMessing(values.newMessageBody);
  }
  if (!props.isAuth) {
    return <Redirect to={"/login"} />
  }
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItem}>{dialogsElements}</div>
      <div className={s.messages}>
        <div> {messagesElement}</div>
        <div>
          <MessageForm onSubmit={AddNewMessage} />
        </div>
      </div>
    </div>
  );
};
export default Dialogs;
