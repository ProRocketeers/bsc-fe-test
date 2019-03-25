import * as React from 'react';
import { defaultFetchResponse, IUseFetch, useFetch } from './utils/useFetch';
import { getNoteDetail, updateNote } from './utils/bscApi';
import { INote } from './utils/types';
import { RouteChildrenProps } from 'react-router';
import { ChangeEvent, useState } from 'react';
import { fetchHelper } from './utils/fetchHelper';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Spinner from './Spinner';
import Alert from './Alert';

export function NoteEditor({
  match,
}: RouteChildrenProps<{ id: string }>): JSX.Element {
  const noteId = match ? match.params.id : '';
  const [noteResponse, setNote] = useState<IUseFetch<INote>>(
    defaultFetchResponse
  );
  const [isUpdated, setIsUpdated] = useState(false);

  useFetch<INote>({
    config: getNoteDetail(noteId),
    state: noteResponse,
    setState: setNote,
  });

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (noteResponse.data) {
      setNote({
        ...noteResponse,
        data: { ...noteResponse.data, title: e.target.value },
      });
    }
  };

  const submitChange = ({ id, title }: INote) => {
    if (title.trim().length === 0) {
      return false;
    }
    setIsUpdated(true);
    fetchHelper({
      config: updateNote(`${id}`, { id, title }),
      state: noteResponse,
      setState: setNote,
    });
  };

  const { loading, data, error } = noteResponse;

  if ((loading && !isUpdated) || !data) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }
  if (error && !isUpdated) {
    return (
      <Alert color="danger">
        <FormattedMessage {...messages.commonWentWrong} />
      </Alert>
    );
  }

  return (
    <form>
      <h1>
        <FormattedMessage
          {...messages.noteEditorHeader}
          values={{ noteId: data.id }}
        />
      </h1>

      {isUpdated && error && (
        <Alert color="danger">
          <FormattedMessage {...messages.noteEditorError} />
        </Alert>
      )}
      {isUpdated && !loading && !error && (
        <Alert color="success">
          <FormattedMessage {...messages.noteEditorUpdated} />
        </Alert>
      )}
      <div className="form-group bsc-container">
        <label htmlFor="note">
          <FormattedMessage {...messages.noteEditorLabelNote} />
        </label>
        <input
          className="form-control"
          type="text"
          name="note"
          id="note"
          value={(data && data.title) || ''}
          onChange={changeTitleHandler}
        />
      </div>
      {isUpdated && loading ? (
        <Spinner />
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => submitChange(data)}
        >
          <FormattedMessage {...messages.noteEditorSave} />
        </button>
      )}
    </form>
  );
}
