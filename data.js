import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export let ticketData = [{
    'name': 'Kendrick Lamar',
    'img': '/img/kendrick.jpg',
    'description': 'Live hip hop concert in Cologne',
    'price': 39.99,
    'uuid': ''
  },
  {
    'name': 'Bicep',
    'img': '/img/bicep.jpg',
    'description': 'Live techno concert in Berlin',
    'price': 30.00,
    'uuid': ''
  },
  {
    'name': 'Ice Hockey Match',
    'img': '/img/icehockey.jpg',
    'description': 'Live ice hockey match in Hanover',
    'price': 14.95,
    'uuid': ''
  }]

  ticketData.forEach(ticket => { ticket.uuid = uuidv4() } )