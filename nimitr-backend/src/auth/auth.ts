
import config from 'config'

import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
export const checkAuth = async (next: any, s: any, a: any, c: any, i: any) => {

  // console.log(c)
  const authHeader = c?.token;
  if (!`${authHeader}`?.startsWith('Bearer '))
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      }
    });
  const token = `${authHeader}`?.split(' ')[1];
  // console.log('token in check', token, authHeader)
  jwt.verify(
    token,
    config.get('jwt.secret'),
    (err, decoded) => {
      if (err)
        throw new GraphQLError('Token is Invalid', {
          extensions: {
            code: 'TOKENISINVALID',
            http: { status: 403 },
          }
        });
      if (decoded) {
        console.log(decoded);

        return next(s, a, c, i)
      }
    }
  );
  return next(s, a, c, i)

}
