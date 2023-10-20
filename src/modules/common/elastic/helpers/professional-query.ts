import { BooleanStatus } from '@/modules/professional-profiles/profiles/contansts';
import { Origins } from '../constants/origin-profile.constants';
import { SearchProfilesDTO } from '../dtos/search-profiles.dto';

export class ProfessionalQuery {

  public static containsSingleOrigin(origin: Origins): string {
    switch (origin) {
      case 'Cadastro interno':
        return 'NOT created_by:(Linkedin OR "Portal de vagas")';
      case 'Importação':
        return 'created_by:Linkedin';
      case 'Portal de vagas':
        return 'created_by:"Portal de vagas"';
      default:
        break;
    }
  }

  public static containsMultipleOrigin(origins: Origins[]): string {
    if (origins.length === 2) {
      if (
        origins.includes(Origins.INTERNAL_REGISTRATION) &&
        origins.includes(Origins.IMPORT)
      ) {
        return 'NOT created_by:"Portal de vagas"';
      }

      if (
        origins.includes(Origins.INTERNAL_REGISTRATION) &&
        origins.includes(Origins.JOB_PORTAL)
      ) {
        return 'NOT created_by:Linkedin';
      }

      return 'created_by:(Linkedin OR "Portal de vagas")';
    }

    return '';
  }

  private static getAcceptContractQuery(value: string): string {
    return `accept_contract: ${value}`;
  }

  private static getRangeClaimQuery(from?: number, to?: number): string {
    return `( clt_claim:[${from || '*'} TO ${to || '*'}] OR pj_claim:[${from || '*'
      } TO ${to || '*'}])`;
  }

  private static getClaimQuery(accept_contract?: string, from?: number, to?: number): string {
    if (accept_contract == "PJ") {
      return `(pj_claim:[${from || '*'} TO ${to || '*'}])`;
    }
    else if (accept_contract == "CLT") {
      return `(clt_claim:[${from || '*'} TO ${to || '*'}])`;
    }
  }

  private static getHomeOfficeQuery(value?: BooleanStatus): string {
    if (value === BooleanStatus.True) {
      return 'homeoffice:true';
    }

    return '(NOT homeoffice:true)';
  }

  private static getIsPreventedQuery(value?: BooleanStatus): string {
    if (value === BooleanStatus.True) {
      return 'impedido:true';
    }

    return 'impedido:false';
  }

  private static getIsVerifiedQuery(value?: BooleanStatus): string {
    if (value === BooleanStatus.True) {
      return 'verified:true';
    }

    return '(NOT verified:true)';
  }

  public static getOriginQuery(origins: string[]): string {
    if (origins.length === 1) {
      return this.containsSingleOrigin(origins[0] as Origins);
    }

    return this.containsMultipleOrigin(origins as Origins[]);
  }

  private static getOfficeQuery(value: string): string {
    return `(experiences.description:${value?.trim()} OR experiences.offices.description:${value?.trim()})`;
  }

  private static getOpenToWorkQuery(value?: BooleanStatus): string {
    if (value === BooleanStatus.True) {
      return 'open_to_work:true';
    }

    return '(NOT open_to_work:true)';
  }

  private static getStateQuery(value: string): string {
    return `state: "${value.trim()}"`;
  }

  private static getUDSQuery(value?: BooleanStatus): string {
    if (value === BooleanStatus.True) {
      return 'uds:true';
    }

    return 'uds:false';
  }

  private static setAndConditional(value: string): string {
    if (value) return ' AND ';
    return '';
  }

  public static getQuery(
    data: SearchProfilesDTO,
    // categories?: Categories[]
  ) {
    let query = '';
    let fields: Array<string> = []

    if (data?.open_to_work) {
      query +=
        this.setAndConditional(query) +
        this.getOpenToWorkQuery(data?.open_to_work);
      fields.push("open_to_work")
    }

    if (data?.origin) {
      if (this.getOriginQuery(data?.origin))
        query +=
          this.setAndConditional(query) + this.getOriginQuery(data?.origin);
      fields.push("origin")
    }

    if (data?.home_office) {
      query +=
        this.setAndConditional(query) +
        this.getHomeOfficeQuery(data?.home_office);
      fields.push("origin")
    }

    if (data?.state) {
      query += this.setAndConditional(query) + this.getStateQuery(data.state);
      fields.push("state")
    }

    if (data?.accept_contract && (!data?.from_claim || !data?.to_claim)) {
      query +=
        this.setAndConditional(query) +
        this.getAcceptContractQuery(data.accept_contract);
      fields.push("accept_contract")
    }

    if ((data?.from_claim || data?.to_claim) && (!data?.accept_contract || data.accept_contract == "CLT e PJ")) {
      query +=
        this.setAndConditional(query) +
        this.getRangeClaimQuery(data?.from_claim, data?.to_claim);
      fields.push("pj_claim", "clt_claim")
    }

    if ((data?.from_claim || data?.to_claim) && (data?.accept_contract && data.accept_contract != "CLT e PJ")) {
      if (data.from_claim) {
        query +=
          this.setAndConditional(query) +
          this.getClaimQuery(data?.accept_contract, data?.from_claim, data?.to_claim);
        fields.push(data?.accept_contract)
      }
    }

    if (data?.is_prevented) {
      query +=
        this.setAndConditional(query) +
        this.getIsPreventedQuery(data?.is_prevented);
      fields.push("is_prevented")
    }

    if (data?.uds) {
      query += this.setAndConditional(query) + this.getUDSQuery(data?.uds);
      fields.push("uds")
    }

    if (data?.is_verified) {
      query +=
        this.setAndConditional(query) +
        this.getIsVerifiedQuery(data?.is_verified);
      fields.push("is_verified")
    }

    if (data?.office) {
      query += this.setAndConditional(query) + this.getOfficeQuery(data.office);
      fields.push("office")
    }
    return { query, fields };
  }
}
