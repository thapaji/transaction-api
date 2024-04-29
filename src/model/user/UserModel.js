import UserSchema from "./UserSchema.js";

/*CREATE*/
export const insertUser = (user) => {
    console.log(user)
    return BucListSchema(user).save();
}

/*READ*/
export const getUsers = () => {
    return UserSchema.find();
}

/*UPDATE*/
export const updateUser = (_id, listItem) => {
    console.log(listItem);
    return UserSchema.findByIdAndUpdate({ _id }, { ...users }, { new: true });
}

/*DELETE ONE or  MANY*/
export const deleteUser = (ids) => {
    return UserSchema.deleteMany({ _id: { $in: ids } });
}