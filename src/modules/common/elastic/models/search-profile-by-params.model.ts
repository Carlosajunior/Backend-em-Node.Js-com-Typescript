import { SearchProfilesByParamsDTO } from '../dtos/search-profiles.dto';

export class SearchProfileByParams {
  private readonly props: SearchProfilesByParamsDTO;

  private constructor(props: SearchProfilesByParamsDTO) {
    this.props = props;
  }

  public static create(
    props: SearchProfilesByParamsDTO
  ): SearchProfileByParams {
    const mappedProps = SearchProfileByParams.toMap(props);
    return new SearchProfileByParams(mappedProps);
  }

  public static toMap(
    props: SearchProfilesByParamsDTO
  ): SearchProfilesByParamsDTO {
    return {
      accept_contract: props?.accept_contract,
      categories: props?.categories,
      city: props?.city,
      from_claim: props?.from_claim,
      to_claim: props?.to_claim,
      home_office: props?.home_office,
      is_prevented: props?.is_prevented,
      is_verified: props?.is_verified,
      languages: props?.languages,
      office: props?.office,
      open_to_work: props?.open_to_work,
      origin: props?.origin,
      professional_title: props?.professional_title,
      state: props?.state,
      tags: props?.tags,
      uds: props?.uds,
      phone: props?.phone,
      email: props.email,
      contacted: props.contacted
    } as SearchProfilesByParamsDTO;
  }

  public isEmpty(): boolean {
    return !Object.keys(this.props)?.some((key) => {
      if (Array.isArray(this.props[key])) {
        return this.props[key]?.length > 0;
      }
      return !!this.props[key];
    });
  }
}
