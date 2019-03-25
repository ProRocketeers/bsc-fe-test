import React, { ReactChild } from 'react';

type AlertTypes =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

const Alert = ({
  color,
  children,
}: {
  color?: AlertTypes;
  children: ReactChild;
}): JSX.Element => (
  <div className={`alert alert-${color || 'primary'}`} role="alert">
    {children}
  </div>
);

export default Alert;
