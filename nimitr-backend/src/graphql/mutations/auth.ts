import { GraphQLError } from 'graphql';

import { Resolver, schemaComposer } from "graphql-compose";

import { UserModel } from "../../models";
import { jwtSign } from "../../../config/util";
import { comparePassword } from "../../libs/hash-password";
interface Args {
  username: string;
  password: string;
}
const loginResolver = new Resolver<any, any, Args, any>(
  {
    name: "login",
    type: "String",
    args: {
      username: "String!",
      password: "String!",
    },
    resolve: async ({ args }) => {
      const { username, password } = args;
      const user = await UserModel.findOne({ username });
      // console.log(user)
      if (!user) {
        throw new GraphQLError(`Username ${username} not found`);
      }
      const valid = await comparePassword(password, `${user.password}`);
      if (!valid) {
        throw new GraphQLError("Incorrect password");
      }
      if (user.role === "TEACHER") {
        await UserModel.findOneAndUpdate({ username }, { isTeacher: true });
      }
      return jwtSign(
        {
          _id: user._id,
          role: user.role,
          rank: user.rank,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          mobile: user.mobile,
        },
        "3d"
      );
    },
  },
  schemaComposer
);

const authMutations = {
  login: loginResolver,
};

export default authMutations;
