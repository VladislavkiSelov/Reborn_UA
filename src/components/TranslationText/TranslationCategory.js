export default function translationCategory(category) {
  switch (category) {
    case 'FURNITURE':
      return 'Меблі';
      break;
    case 'CLOTHE':
      return 'Одяг';
      break;
    case 'ELECTRONIC':
      return 'Техніка';
      break;
    case 'HOSE':
      return 'Все для дому';
      break;
    case 'CHILDREN':
      return 'Дитячий світ';
      break;
    case 'PETS':
      return 'Наші улюбленці';
      break;
    case 'Меблі':
      return 'FURNITURE';
      break;
    case 'Одяг':
      return 'CLOTHE';
      break;
    case 'Техніка':
      return 'ELECTRONIC';
      break;
    case 'Все для дому':
      return 'HOSE';
      break;
    case 'Дитячий світ':
      return 'CHILDREN';
      break;
    case 'Наші улюбленці':
      return 'PETS';
      break;

    default:
      return '';
  }
}
