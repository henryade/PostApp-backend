import { hash, compare } from 'bcryptjs';
import { UserInputError, AuthenticationError } from 'apollo-server';
import { User } from '../../models';
import { validateRegisterInput, validateLoginInput, generateToken } from '../../utils';

export default {
  Mutation: {
    async login(parent, { loginInput: { username, password } }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User Not Found";
        throw new UserInputError('User Not Found', { errors });
      }
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        errors.general = "Wrong Credentials";
        throw new AuthenticationError('Wrong Credentials', { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      parent,
      { registerInput: { username, password, email, confirmPassword } },
      context,
      info
    ) {
      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ $or: [{ email }, { username }] });

      if (user) {
        if (user.email === email) {
          throw new UserInputError('Email is taken', {
            errors: {
              email: 'This email is taken'
            }
          });
        } else {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'This username is taken'
            }
          });
        }
      }

      password = await hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};
