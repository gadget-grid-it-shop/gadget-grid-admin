import React, { ReactNode } from 'react';

type TProps = {
  title: string;
  subtitle?: string;
  buttons?: ReactNode;
};

const PageHeader = ({ title, subtitle, buttons }: TProps) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <div>
        <h4 className="page-title">{title}</h4>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      {buttons}
    </div>
  );
};

export default PageHeader;
