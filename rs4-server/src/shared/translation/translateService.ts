import { Injectable } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { I18nTranslations } from '../i18n/i18n.generated';

@Injectable()
export class TranslateService {
  constructor(private i18nService: I18nService<I18nTranslations>) {}

  public t(jsonProp: PathImpl2<I18nTranslations>, args?, local?) {
    return <string>this.i18nService.t(jsonProp, {
      args,
      lang: local ? local : I18nContext.current().lang,
    });
  }
}
