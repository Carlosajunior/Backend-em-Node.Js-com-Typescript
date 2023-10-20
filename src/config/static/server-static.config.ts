import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

export const serverStaticConfig: ServeStaticModuleOptions = {
  rootPath: join(__dirname, '..', '..', '..', 'src', 'resources'),
  serveRoot: '/files'
};
