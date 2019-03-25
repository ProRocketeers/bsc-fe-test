import * as React from 'react';
import { createNote } from './utils/bscApi';
import { fetchRequest } from './utils/fetchHelper';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import messages from './messages';
import Spinner from './Spinner';
import Alert from './Alert';

function NoteCreatorComponent({
  intl: { formatMessage },
}: InjectedIntlProps): JSX.Element {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const statuses = {
    SAVING: 'SAVING',
    CREATED: formatMessage(messages.noteCreatorCreated),
    ERROR: formatMessage(messages.noteCreatorError),
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const submitChange = (title: string) => async () => {
    if (title.trim().length === 0) {
      return false;
    }
    setMessage(statuses.SAVING);
    try {
      await fetchRequest(createNote({ title }));
      setMessage(statuses.CREATED);
    } catch (e) {
      setMessage(statuses.ERROR);
    }
  };

  return (
    <form>
      <h1>
        <FormattedMessage {...messages.noteCreatorNew} />
      </h1>
      {message === statuses.SAVING ? (
        <Spinner />
      ) : (
        <>
          {message === statuses.ERROR && (
            <Alert color="danger">
              {message}
            </Alert>
          )}
          {message === statuses.CREATED && (
            <Alert color="success">
              {message}
            </Alert>
          )}
          <div className="form-group bsc-container">
            <label htmlFor="note">
              <FormattedMessage {...messages.noteCreatorLabelNote} />
            </label>
            <input
              className="form-control"
              type="text"
              name="note"
              id="note"
              value={title}
              onChange={changeTitleHandler}
              disabled={message === statuses.CREATED}
            />
          </div>
          {message !== statuses.CREATED && (
            <button
              type="button"
              onClick={submitChange(title)}
              className="btn btn-primary"
            >
              <FormattedMessage {...messages.noteCreatorSave} />
            </button>
          )}
        </>
      )}
    </form>
  );
}

export const NoteCreator = injectIntl(NoteCreatorComponent);
