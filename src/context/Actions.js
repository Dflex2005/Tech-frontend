export const LoginStart = (userC) =>({
    type: "login_start"
})

export const LoginSuccess = (user) =>({
    type: "login_success",
    payload: user,
})

export const LoginFailure = () =>({
    type: "login_failure"
});

export const LoginOut = () =>({
    type: "logout",
});

export const updateStart = (userC) =>({
    type: "update_start"
})

export const updateSuccess = (user) =>({
    type: "update_success",
    payload: user,
})

export const updateFailure = () =>({
    type: "update_failure"
});

