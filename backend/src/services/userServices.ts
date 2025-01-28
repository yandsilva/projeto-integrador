import prismaClient from "../prisma/prisma";
import { CreateUserProps, LoginUserProps } from "../types/userTypes";
import { compare } from "bcrypt";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

class UserServices {
  async createUser({ name, email, password }: CreateUserProps) {
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const passwordCrypt = await hash(password, 8);
    await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordCrypt,
      },
    });
    return { dados: "Cadastro Efetuado com Sucesso" };
  }

  async loginUser({ email, password }: LoginUserProps) {
    const login = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    // console.log(login);

    const passwordCrypt = await compare(password, login.password);
    if (!passwordCrypt) {
      throw new Error("Usuario ou Senha Incorretos");
    }

    const secretKey = process.env.JWT_SECRETO || "defaultSecretKey";

    const token = jwt.sign(
      {
        id: login.id,
        name: login.name,
        email: login.email,
      },
      secretKey,
      {
        subject: login.id,
        expiresIn: "8h",
      }
    );
    return {
      id: login.id,
      nome: login.name,
      email: login.email,
      token: token,
    };
  }

  async verificaToken(id: string) {
    const resposta = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return resposta;
  }

  async findUserByEmail(email: string) {
    const user = await prismaClient.user.findFirst({ where: { email } });
    return user;
  }
}

export { UserServices };
