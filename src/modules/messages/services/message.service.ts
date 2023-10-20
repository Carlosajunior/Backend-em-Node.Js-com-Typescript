import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant'
import { ListEntitiesModel } from '@/modules/common/shared/models'
import { ProfileModel } from '@/modules/professional-profiles/profiles/models'
import { Injectable, NotFoundException } from '@nestjs/common'
import { SearchDTO } from '../dtos'
import { MessagesRepository } from '../repositories'

@Injectable()
export class MessageService {
  constructor(
    private readonly messagesRepository: MessagesRepository
  ) { }

  async list({
    page = 1,
    records_per_page: recordsPerPage = 15,
    search = '',
    date_start,
    date_end
  }: SearchDTO, headers: Array<string>) {
    try {
      return await this.messagesRepository.findMessages({
        type_search: TypeSearch.PARAMS,
        page,
        records_per_page: recordsPerPage,
        search,
        date_start,
        date_end
      }, headers)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }



  async listMessages(request: SearchDTO) {
    switch (request.type_search) {
      case TypeSearch.SEARCH: {
        return await this.messagesRepository.paginateBySearch(request);
      }
      case TypeSearch.PARAMS: {
        return await this.messagesRepository.paginateByParams(request);
      }
      default:
        return null;
    }
  }

  async getRecipientsByMessageId({
    id,
    page = 1,
    records_per_page: recordsPerPage = 15,
    search = ''
  }): Promise<ListEntitiesModel<ProfileModel>> {
    try {
      return await this.messagesRepository.findRecipientsByMessageId(id, {
        page,
        type_search: TypeSearch.PARAMS,
        records_per_page: recordsPerPage,
        search
      })
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
