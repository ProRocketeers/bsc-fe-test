import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import cs from "./translates/cs.json";
import en from "./translates/en.json";
import locale_cs from "react-intl/locale-data/cs";
import locale_en from "react-intl/locale-data/en";

export const DEFAULT_LOCALE = 'en';

interface ILocales {
  [T: string]: string;
}
export const LOCALES: ILocales = {
  'en': 'English',
  'cs': 'Česky',
}

const lsHandler = {
  language: 'language',

  setLocale: (locale: string): void => {
    localStorage.setItem(lsHandler.language, locale);
  },

  getLocale: (): string | null => {
    return localStorage.getItem(lsHandler.language);
  },
};

export const getLang = (): string => lsHandler.getLocale() || DEFAULT_LOCALE;

type Props = {
  children: React.ReactNode;
};

type ExtendedProps = Props & {
  locale?: string;
};

interface IMessages {
  [T: string]: object;
}
const messages: IMessages = {
  en,
  cs
};

addLocaleData([...locale_en, ...locale_cs]);

const Localizer = ({
  children,
  locale,
}: ExtendedProps): JSX.Element => {
  if (locale) {
    lsHandler.setLocale(locale);
  }
  const loc = locale || getLang();
  return (
    <IntlProvider
      locale={loc}
      messages={messages[loc]}
      textComponent={React.Fragment}
    >
      {children}
    </IntlProvider>
  );
};

export default Localizer;