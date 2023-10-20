import { elasticsearchService } from '@/config/elasticseach';
import {
  CustomerRoutes,
  ElasticSearchIndex,
  FunnelsRoutes,
  ProfileRoutes,
  TemplateRoutes,
  VacancyRoutes
} from '@/modules/common/elastic/constants';

type Routes =
  | ProfileRoutes
  | VacancyRoutes
  | CustomerRoutes
  | FunnelsRoutes
  | TemplateRoutes;

type Data = Record<string, any>;

const handleGetIndexByRoute = (route) => {
  if (route === ProfileRoutes.create || route === ProfileRoutes.update)
    return ElasticSearchIndex.profile;

  if (
    route === VacancyRoutes.create ||
    route === VacancyRoutes.update ||
    route === VacancyRoutes.status
  )
    return ElasticSearchIndex.vacancies;

  if (route === CustomerRoutes.create || route === CustomerRoutes.update)
    return ElasticSearchIndex.customer;

  if (route === FunnelsRoutes.create || route === FunnelsRoutes.update)
    return ElasticSearchIndex.funnel;

  if (
    route === TemplateRoutes.create ||
    route === TemplateRoutes.update ||
    route === TemplateRoutes.status
  )
    return ElasticSearchIndex.template;
};

const handleTransformDataByRoute = (route: Routes, data: Data) => {
  if (route === CustomerRoutes.create || route === CustomerRoutes.update) {
    data.contacts = data.contacts?.filter((contact) => Boolean(contact)) || [];
  }
  return data;
};

export const handleStorageElasticSearch = async (route: Routes, data: Data) => {
  if (
    data?.id &&
    route !== ProfileRoutes.create &&
    route !== ProfileRoutes.update &&
    route !== VacancyRoutes.create &&
    route !== VacancyRoutes.update
  ) {
    data = handleTransformDataByRoute(route, data);
    await elasticsearchService.index({
      index: handleGetIndexByRoute(route),
      id: data.id,
      document: data
    });
  }
};
