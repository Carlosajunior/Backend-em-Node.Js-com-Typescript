import graylog2 from 'graylog2';

export const logger = new graylog2.graylog({
  facility: 'Recruiter',
  servers: [
    { host: process.env.GRAYLOG_HOST, port: Number(process.env.GRAYLOG_PORT) }
  ]
});

logger.on('error', function (error) {
  console.error('Error while trying to write to graylog2:', error);
});
