export const START_LOADER = 'START_LOADER';
export const STOP_LOADER = 'STOP_LOADER';

export const startLoader = () => {
    return {
        type: START_LOADER,
    };
}

export const stopLoader = () => {
    return {
        type: STOP_LOADER,
    };
}