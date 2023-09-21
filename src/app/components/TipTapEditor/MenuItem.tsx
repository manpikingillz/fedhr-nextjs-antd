import './MenuItem.scss';

import React from 'react';
// import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';
import { BoldOutlined } from '@ant-design/icons';


const MenuItem = ({ icon, title, action, isActive = null }) => (
  <button
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    {/* <svg className="remix"> */}
      {/* <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
    </svg> */}
    {icon}
  </button>
);

export default MenuItem;
