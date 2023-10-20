import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import CognitoExpress from 'cognito-express'
import { NextFunction, Request, Response } from 'express'
import * as cls from 'cls-hooked'
import { RequestContext } from './request.context'
import { getRepository } from 'typeorm'
import { User } from '@/modules/users/entities/user.entity'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  cognitoExpress = new CognitoExpress({
    region: process.env.COGNITO_REGION || 'us-east-1',
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID || 'us-east-1_nMcXTaKZV',
    tokenUse: 'id',
    tokenExpiration: '1d'
  })
  async use (req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1]
      this.cognitoExpress.validate(token, async (err: any, response: any) => {
        if (err) {
          res.status(401).send(err)
        } else {
          const user = await getRepository(User).findOne({
            where: { email: response.email}
          })
          if (!user) {
            throw new BadRequestException('Usuário não foi encontrado.');
          }
          req.user = {...user, sub: response.sub, ip: String(req.headers.ip)}

          const requestContext = new RequestContext(req, res)
          const session = cls.getNamespace(RequestContext.nsid) || cls.createNamespace(RequestContext.nsid)

          session.run(async () => {
            session.set(RequestContext.name, requestContext)
            next()
          })
        }
      })
    } else {
      throw new UnauthorizedException('JWT token is missing.')
    }
  }
}
