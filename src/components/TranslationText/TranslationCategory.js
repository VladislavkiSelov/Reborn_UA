export default function translationCategory (category) {
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
      default:
        return '';
    }
  };