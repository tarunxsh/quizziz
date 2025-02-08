import user from '../models/user.model';

export const getUser = async ({username}: any) => {
    return await user.findOne({ username });
}

export const createUser = async ({username, email, password}: any) => {
    return await user.create({ username, email, password });
}