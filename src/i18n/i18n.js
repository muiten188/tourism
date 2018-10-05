import I18n from 'react-native-i18n';
import en from './locales/en';
import vn from './locales/vn';  
import jp from './locales/jp';  

I18n.fallbacks = true;

I18n.translations = {
  en,
  vn,
  jp
};

export default I18n; 