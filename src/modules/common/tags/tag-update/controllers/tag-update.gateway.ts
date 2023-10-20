import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { TagUpdateService } from '../services/tag-update.service';
import { UpdateTagUpdateDto } from '../dto/update-tag-update.dto';
import { BadRequestException } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TagUpdateGateway {
  constructor(private readonly tagUpdateService: TagUpdateService) { }

  @WebSocketServer() server: Server;

  @SubscribeMessage('update-professional-tags')
  async updateProfileTags(@MessageBody() data: UpdateTagUpdateDto) {
    try {
      const retorno = await this.tagUpdateService.updateProfessionalTags(data)
      return { event: "UpdateProfileTagsResult", data: retorno }
    } catch (error) {
      return { event: "UpdateProfileTagsResult", data: new BadRequestException }
    }
  }

  @SubscribeMessage('update-database-tags')
  async updateDatabaseProfilesTags() {
    try {
      const retorno = await this.tagUpdateService.updateDatabaseProfessionalTags()
      return { event: "UpdateDatabaseTagsResult", data: retorno }
    } catch (error) {
      return { event: "UpdateDatabaseTagsResult", data: new BadRequestException }
    }
  }

}
