import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { validate, UserContext } from '../utils';
import routes from '../routes';

const MessageForm = ({ currentChannelId }) => {
  const userName = React.useContext(UserContext);
  const channelUrl = routes.channelMessagesPath(currentChannelId);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      const messageText = values.message;
      const attributes = {
        user: userName,
        text: messageText,
      };
      try {
        await axios.post(channelUrl, { data: { attributes } });
        formik.resetForm();
        setSubmitting(false);
      } catch (err) {
        setFieldError('message', err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='form-group form-row'>
        <div className='col-10'>
          <input
            type='text'
            id='message'
            className='form-control'
            placeholder='Type message'
            {...formik.getFieldProps('message')}
          />
          {formik.errors.message ? (<div className="alert alert-danger" role="alert">{formik.errors.message}</div>) : null}
        </div>
        <div className='col-2'>
          <button type='submit' className='btn btn-primary btn-block' disabled={formik.isSubmitting}>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
