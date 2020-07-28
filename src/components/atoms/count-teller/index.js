import React from 'react';
import classNames from 'classnames';
import './style.scss';

export const CountTeller = ({
    tellerIcon,
    count,
    title,
    iconContainerStyle = {},
    tellerWrapperStyle = {}
}) => (

        <div className={classNames([
            'col-md-4',
            tellerWrapperStyle
        ])}>
            <div className="count-teller">
                <span className={classNames([
                    'teller-icon',
                    iconContainerStyle
                ])}>
                    <img
                        src={tellerIcon}
                        alt={'count-teller-icon'} />
                </span>
                <div className={classNames(['count-text-wrapper text-right'])}>
                    <h2>{count}</h2>
                    <span>{title}</span>
                </div>
            </div>
        </div>
    );

