import React from 'react';
import { CustomButton } from '../custom-button';
import Linkify from 'react-linkify';
import classNames from 'classnames';
import './styles.scss';
export const MessagePopUp = ({
    messageTitle = 'Message Title',
    messageDescription = 'This is descriptive message.',
    leftButtonLabel = '',
    rightButtonLabel = '',
    leftButtonAction = () => { },
    rightButtonAction = () => { },
    children,
    pre = false,
    ...props
}) => {
    return (
        <div className='message-modal-wrap'>
            <div className="modal-dialog">
                <div className={classNames([
                    { 'message-wrap': !pre },
                    { 'message-pre-wrap': pre },
                ])}>
                    <h2>
                        {messageTitle}
                    </h2>
                    <span className='message-description-container'>
                        <p><Linkify>{messageDescription}</Linkify></p>
                    </span>
                    {children}
                    <div className='btn-container'>
                        {!!leftButtonLabel && <CustomButton
                            buttonStyle='cancel-btn'
                            buttonAction={leftButtonAction}
                        >
                            {leftButtonLabel}
                        </CustomButton>}
                        <CustomButton
                            buttonAction={rightButtonAction}
                            buttonStyle='ok-btn'
                        >
                            {rightButtonLabel}
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div >
    );
}


