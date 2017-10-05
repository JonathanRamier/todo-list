export interface State {
    username: string;
    isAuthenticated: boolean;
}

export const initialState: State = null;


export function reducer(state = initialState, action: any): State {
    switch (action.type) {
        default:
            return state;
    }
}
