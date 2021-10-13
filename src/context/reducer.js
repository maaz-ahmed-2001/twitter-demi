export let data = {
    authUser: "abc",
    users:{},
    style:"sidebar"


}

export function reducer(state,action){

    switch(action.type){
        case "AUTH_USER": {
            return {
                ...state,
                authUser: action.payload
            }
        }
        case "REGISTER":{
            let usersClone = state.users.slice(0);
            usersClone.push(action.payload);
            return {
                ...state,
                users: usersClone
            }
        }
        case "LOGIN":{
            return{
                ...state,
                auth: action.payload

            }
        }
        case "STYLE":{
            return{
                ...state,
                style: action.payload

            }
        }

        default: 
            return state;
    }

}