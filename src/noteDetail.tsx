import * as React from 'react';
import { defaultFetchResponse, IUseFetch, useFetch } from './utils/useFetch';
import { INote } from './utils/types';
import { RouteChildrenProps } from 'react-router';
import { useState } from 'react';
import { getNoteDetail } from './utils/bscApi';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Spinner from './Spinner';
import Alert from './Alert';

export function NoteDetail({
  match,
  history,
}: RouteChildrenProps<{ id: string }>): JSX.Element {
  const [state, setState] = useState<IUseFetch<INote>>(defaultFetchResponse);

  const id: string = match ? match.params.id : '';

  useFetch({ state, setState, config: getNoteDetail(id) });

  const { loading, error, data } = state;
  if (error) {
    return (
      <Alert color="danger">
        <FormattedMessage {...messages.commonWentWrong} />
      </Alert>
    );
  }
  if (loading || !data) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            history.push(`/note/edit/${id}`);
          }}
        >
          <FormattedMessage {...messages.noteDetailEdit} />
        </button>
      </div>
    </div>
  );
}
