import I18n from 'react-native-i18n';
import en from './locales/en';
import vn from './locales/vn';  
import jp from './locales/jp';  
import fr from './locales/fr';  

I18n.fallbacks = true;

I18n.translations = {
  en,
  vn,
  jp,
  fr
};

export default I18n; 