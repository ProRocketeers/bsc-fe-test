import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { IUseFetch, useFetch } from './utils/useFetch';
import { INote } from './utils/types';
import { getAllNotes, removeNote } from './utils/bscApi';
import { fetchRequest } from './utils/fetchHelper';
import messages from './messages';
import Spinner from './Spinner';
import Alert from './Alert';

function NoteListComponent({
  history,
  intl: { formatMessage },
}: RouteComponentProps<{}> & InjectedIntlProps): JSX.Element {
  const [state, setState] = useState<IUseFetch<INote[], INote[]>>({
    error: null,
    data: [],
    loading: false,
  });

  useFetch<INote[], INote[]>({
    config: getAllNotes(),
    state,
    setState,
  });

  const [removeData, setRemoveData] = useState<{
    loading: boolean;
    error: string | null;
    id: string | null;
  }>({ loading: false, error: null, id: null });

  const deleteNote = (id: string) => async () => {
    setRemoveData({ loading: true, error: null, id });
    try {
      await fetchRequest(removeNote(id));

      const newData = state.data.filter(note => note.id !== id);
      setRemoveData({ loading: false, error: null, id: null });

      setState({ ...state, data: newData });
    } catch (e) {
      setRemoveData({
        loading: false,
        error: formatMessage(messages.noteListDeleteError, { nodeId: id }),
        id,
      });
    }
  };

  const { error, loading, data } = state;

  return (
    <div className=" table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <FormattedMessage {...messages.noteListNote} />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={3} className="text-center">
                <Spinner />
              </td>
            </tr>
          )}
          {(error || !data) && !loading && (
            <tr>
              <td className="text-center" colSpan={3}>
                <Alert color="danger">
                  <FormattedMessage {...messages.commonWentWrong} />
                </Alert>
              </td>
            </tr>
          )}
          {data &&
            data.map(({ id, title }) => (
              <tr key={id}>
                {`${removeData.id}` === `${id}` ? (
                  <td colSpan={3} className="text-center">
                    {removeData.loading && <Spinner />}
                    {removeData.error && !removeData.loading && (
                      <Alert color="danger">
                        {removeData.error}
                      </Alert>
                    )}
                  </td>
                ) : (
                  <>
                    <td>{id}</td>
                    <td>
                      <Link to={`/note/detail/${id}`}>{title}</Link>
                    </td>
                    <td className="text-right">
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => history.push(`/note/edit/${id}`)}
                        >
                          <FormattedMessage {...messages.noteListEdit} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={deleteNote(id)}
                        >
                          <FormattedMessage {...messages.noteListDelete} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export const NoteList = injectIntl(NoteListComponent);
