import React from 'react';
import ReactLoading from 'react-loading';
import './styles.scss';

export const Loader = () => {
    return (
        <div className='loader-wrap'>
            <ReactLoading type={'spinningBubbles'} color={'red'} height={'50px'} width={'50px'} />
        </div>
    )
}