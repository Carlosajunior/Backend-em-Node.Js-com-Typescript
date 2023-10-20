import { ElasticsearchService } from '@nestjs/elasticsearch';

export const elasticsearchConfig = {
  node: process.env.ELASTIC_HOST || 'http://localhost:9092',
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD
  }
}

export const elasticsearchService = new ElasticsearchService(elasticsearchConfig);


