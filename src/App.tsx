import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './App.css';
import { NoteList } from './noteList';
import { NoteDetail } from './noteDetail';
import { NoteEditor } from './noteEditor';
import Localizer, { getLang, LOCALES } from './Localizer';
import messages from './messages';
import { NoteCreator } from './noteCreator';

// since we deploy to github pages, router basename must be set

const routeBasename = process.env.PUBLIC_URL || '';

const App = (): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const [ddOpened, setDdOpened] = useState(false);
  const [lang, setLang] = useState(getLang());
  return (
    <Localizer locale={lang}>
      <Router basename={routeBasename}>
        <>
          <Route
            path="*"
            render={({ history }) => (
              <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
                <a
                  href="/"
                  className="navbar-brand"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    history.push('/');
                  }}
                >
                  <FormattedMessage {...messages.appbarAppName} />
                </a>
                <button
                  type="button"
                  className="navbar-toggler"
                  onClick={() => {
                    setOpened(open => !open);
                  }}
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className={`${opened ? '' : 'collapse'} navbar-collapse`}>
                  <ul className="ml-auto navbar-nav">
                    <li className="nav-item">
                      <a
                        href="/"
                        className="nav-link"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          history.push('/');
                        }}
                      >
                        <FormattedMessage {...messages.appbarNoteList} />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/"
                        className="nav-link"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          history.push('/create-note');
                        }}
                      >
                        <b>
                          <FormattedMessage {...messages.appbarNoteNew} />
                        </b>
                      </a>
                    </li>
                    <li className="dropdown nav-item">
                      <a
                        aria-haspopup="true"
                        href="/"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          setDdOpened(ddOpen => !ddOpen);
                        }}
                        className="dropdown-toggle nav-link"
                        aria-expanded={ddOpened}
                      >
                        {LOCALES[lang]}
                      </a>
                      <div
                        tabIndex={-1}
                        role="menu"
                        aria-hidden={!ddOpened}
                        className={`dropdown-menu dropdown-menu-right ${ddOpened &&
                          'show'}`}
                      >
                        {Object.keys(LOCALES).map((locale, index) => (
                          <button
                            type="button"
                            disabled={lang === locale}
                            key={locale}
                            tabIndex={index - 1}
                            className={`${lang === locale &&
                              'disabled'} dropdown-item`}
                            onClick={() => {
                              setLang(locale);
                              setDdOpened(false);
                            }}
                          >
                            {LOCALES[locale]}
                          </button>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            )}
          />
          <div className="container bsc-container">
            <div className="row">
              <div className="col">
                <Route
                  exact
                  path="/"
                  render={props => <NoteList {...props} />}
                />
                <Route
                  path="/note/detail/:id"
                  render={props => <NoteDetail {...props} />}
                />
                <Route
                  path="/note/edit/:id"
                  render={props => <NoteEditor {...props} />}
                />
                <Route path="/create-note" render={() => <NoteCreator />} />
              </div>
            </div>
          </div>
        </>
      </Router>
    </Localizer>
  );
};

export default App;
