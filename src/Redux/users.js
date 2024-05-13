import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
    "users/getUsers", async () => {
        return fetch('https://reqres.in/api/users?page=1').then(res => res.json()).then(result => result.data)
    }
)

export const updateUser = createAsyncThunk(
    "users/updateUser", async (id, userInfo) => {
        return fetch(`https://reqres.in/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json()).then(result => result.data)
    }
)

export const removeUser = createAsyncThunk(
    "users/removeUsers", async (id) => {
        return fetch(`https://reqres.in/api/users/${id}`, {
            method: "DELETE"
        }).then(res => res)
    }
)

export const createUser = createAsyncThunk(
    "users/createUsers", async (userInfo) => {
        return fetch('https://reqres.in/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        }).then(res => res)
    }
)

const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => action.payload),
            builder.addCase(removeUser.fulfilled, (state, action) => {
                const newUsers = state.filter(user => user.id !== action.meta.arg)
                return newUsers
            }),
            builder.addCase(createUser.fulfilled, (state, action) => {
                let newUser = {
                    "id": 0,
                    "email": "fake.user@reqres.in",
                    "first_name": action.meta.arg.name,
                    "last_name": "Lawson",
                    "avatar": "https://reqres.in/img/faces/9-image.jpg"
                }
                const newUsers = [newUser, ...state]
                return newUsers
            })
    }
})

export default slice.reducer 