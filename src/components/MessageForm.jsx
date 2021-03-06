import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import routes from '../routes';
import { currentChannelIdSelector } from '../slices/channelsSlice';
import UserContext from '../Context';
import { submitMessageSchema } from '../validator';

const MessageForm = () => {
  const userName = React.useContext(UserContext);
  const currentChannelId = useSelector(currentChannelIdSelector);
  const channelUrl = routes.channelMessagesPath(currentChannelId);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: submitMessageSchema,
    validateOnChange: false,
    onSubmit: async (values, { setStatus }) => {
      const messageText = values.message;
      const attributes = {
        user: userName,
        text: messageText,
      };
      try {
        await axios.post(channelUrl, { data: { attributes } });
        formik.resetForm();
      } catch (err) {
        setStatus(t('statusNotifications.networkError'));
      }
    },
  });

  const messageInputRef = React.useRef(null);
  React.useEffect(() => {
    messageInputRef.current.focus();
  }, [currentChannelId, formik.values.message]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group form-row">
        <div className="col-9">
          <input
            type="text"
            id="message"
            className="form-control"
            placeholder={t('interfaceTexts.messageFormPlaceholder')}
            onChange={formik.handleChange}
            value={formik.values.message}
            ref={messageInputRef}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.errors.message && <div className="alert alert-danger mt-3" role="alert">{formik.errors.message}</div>}
          {formik.status && <div className="alert alert-danger mt-3" role="alert">{formik.status}</div>}
        </div>
        <div className="col-3">
          <button type="submit" className="btn btn-primary btn-block" disabled={formik.isSubmitting || !formik.dirty}>{t('interfaceTexts.submitButton')}</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
