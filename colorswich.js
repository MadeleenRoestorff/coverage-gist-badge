const message = '90.72%';

const percantage = Number(message.replace('%', ''));

console.log('percantage', percantage);

let color = 'green';

switch (true) {
  case percantage >= 90:
    content.color = 'brightgreen';
    break;
  case percantage >= 80:
    content.color = 'green';
    break;
  case percantage >= 70:
    content.color = 'yellowgreen';
    break;
  case percantage >= 60:
    content.color = 'yellow';
    break;
  case percantage >= 50:
    content.color = 'orange';
    break;
  case percantage < 50:
    content.color = 'red';
    break;
  default:
    content.color = 'pink';
    break;
}

if (percantage >= 90) {
  content.color = 'brightgreen';
} else if (percantage >= 80) {
  content.color = 'green';
} else if (percantage >= 70) {
  content.color = 'yellowgreen';
} else if (percantage >= 60) {
  content.color = 'yellow';
} else if (percantage >= 50) {
  content.color = 'orange';
} else {
  content.color = 'red';
}

console.log('color', color);
