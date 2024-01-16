export default function translationState(value) {
  switch (value) {
    case 'USED':
      return 'б.в.';
      break;
    case 'NEW':
      return 'Новий';
      break;
    case 'DAMAGED':
      return 'ПОШКОДЖЕНИЙ';
      break;
    default:
      return '';
  }
}
