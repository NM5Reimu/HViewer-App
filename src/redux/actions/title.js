export function titleHasErrored(bool) {
    return {
        type: 'TITLE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function titleIsLoading(bool) {
    return {
        type: 'TITLE_IS_LOADING',
        isLoading: bool
    };
}

export function titleFetchDataSuccess(title) {
    return {
        type: 'TITLE_FETCH_DATA_SUCCESS',
        title
    };
}