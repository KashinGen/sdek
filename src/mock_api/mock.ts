/* eslint-disable */
const { v4: uuidv4 } = require('uuid');

// Функция для случайного пропуска ключей
const maybe = (value: any, probability = 0.5) =>
  Math.random() < probability ? value : null;

// Генерация случайных чисел в диапазоне
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
function getRandomStatuses() {
  const statuses = [
    {
      code: 'CREATED',
      name: 'Создан',
      date_time: getRandomDate(),
      city: 'Офис СДЭК',
    },
    {
      code: 'ACCEPTED',
      name: 'Принят',
      date_time: getRandomDate(),
      city: 'Офис СДЭК',
    },
    {
      code: 'IN_WORK',
      name: 'В пути',
      date_time: getRandomDate(),
      city: 'Офис СДЭК',
    },
    {
      code: 'DELIVERED',
      name: 'Доставлен',
      date_time: getRandomDate(),
      city: 'Офис СДЭК',
    },
  ];

  // Выбираем случайный индекс статуса (всегда включительно от 0 до последнего элемента массива)
  const randomIndex = Math.floor(Math.random() * statuses.length);

  // Возвращаем "обрезанный" массив до выбранного статуса включительно
  return statuses.slice(0, randomIndex + 1);
}
// Генерация случайной даты
const getRandomDate = () => {
  const start = new Date(2025, 0, 1).getTime();
  const end = new Date(2025, 11, 31).getTime();
  return new Date(getRandomNumber(start, end)).toISOString();
};

// Генерация данных с учётом необязательных ключей
export const generateData = () => {
  const uuid = uuidv4();
  return {
    uuid: uuid,
    type: getRandomNumber(1, 3),
    is_return: Math.random() < 0.5,
    is_reverse: Math.random() < 0.5,
    cdek_number: uuid.slice(0, 10),
    number: uuid,
    tariff_code: getRandomNumber(100, 200),
    comment: maybe('Комментарий отправителя', 0.8), // Может отсутствовать с вероятностью 20%
    shipment_point: 'LFG1',
    delivery_point: 'LFG1',
    items_cost_currency: 'RUB',
    recipient_currency: 'RUB',
    delivery_recipient_cost: {
      value: getRandomNumber(0, 1000),
      vat_sum: getRandomNumber(0, 100),
    },
    sender: {
      company: `ООО "Компания ${getRandomNumber(1, 100)}"`,
      name: `Иван Иванович`,
      contragent_type: 'LEGAL_ENTITY',
      passport_requirements_satisfied: maybe(false, 0.7), // Может отсутствовать с вероятностью 30%
    },
    seller: maybe({ name: `Петр Петрович` }, 0.9), // Пропуск 10%
    recipient: {
      company: maybe(`ООО "Получатель ${getRandomNumber(1, 100)}"`, 0.8), // Пропуск 20%
      name: `Семен Семенович`,
      phones: maybe(
        [
          {
            number: `7${getRandomNumber(9000000000, 9999999999)}`,
          },
        ],
        0.95,
      ), // Пропуск 5%
      passport_requirements_satisfied: maybe(false, 0.6), // Пропуск 40%
    },
    from_location: {
      code: getRandomNumber(1000, 2000),
      city_uuid: uuidv4(),
      city: 'Краснодар',
      country_code: 'RU',
      country: 'Россия',
      region: 'Московская область',
      region_code: getRandomNumber(1, 10),
      longitude: +(39 + Math.random()).toFixed(6),
      latitude: +(46 + Math.random()).toFixed(6),
      address: 'Россия, Москва, ул. Примерная',
      postal_code: '123456',
    },
    to_location: {
      code: getRandomNumber(1000, 2000),
      city_uuid: uuidv4(),
      city: 'Краснодар',
      country_code: 'RU',
      country: 'Россия',
      region: 'Краснодарский край',
      region_code: getRandomNumber(1, 10),
      longitude: +(38 + Math.random()).toFixed(6),
      latitude: +(45 + Math.random()).toFixed(6),
      address: maybe('Россия, Краснодар, ул. Тихая 7', 0.9), // Пропуск 10%
      postal_code: '654321',
    },
    services: maybe(
      [
        {
          code: 'INSURANCE',
          parameter: '300.00',
          sum: +(Math.random() * 10).toFixed(2),
          total_sum: +(Math.random() * 10 + 10).toFixed(2),
          discount_percent: 0,
          discount_sum: 0,
          vat_rate: 5,
          vat_sum: +Math.random().toFixed(2),
        },
      ],
      0.85,
    ), // Пропуск 15%
    packages: maybe(
      [
        {
          number: '1',
          barcode: `BAR${getRandomNumber(100000, 999999)}`,
          weight: getRandomNumber(100, 1000),
          length: getRandomNumber(10, 100),
          width: getRandomNumber(10, 100),
          weight_volume: getRandomNumber(10, 100),
          height: getRandomNumber(1, 50),
          comment: 'Описание вложения',
          items: maybe(
            [
              {
                name: 'Книга',
                ware_key: `BOOK${getRandomNumber(1, 1000)}`,
                payment: {
                  value: 300,
                  vat_sum: 0,
                },
                weight: getRandomNumber(100, 300),
                weight_gross: getRandomNumber(100, 300),
                amount: 1,
                delivery_amount: 0,
                excise: false,
                cost: 300,
              },
            ],
            0.9,
          ), // Пропуск 10%
          package_id: uuidv4(),
        },
      ],
      0.95,
    ), // Пропуск 5%
    statuses: getRandomStatuses(),
    is_client_return: Math.random() < 0.5,
    delivery_mode: '3',
    delivery_detail: {
      delivery_sum: +(Math.random() * 1000).toFixed(2), // Генерация суммы доставки
      total_sum: +(Math.random() * 1100).toFixed(2), // Итоговая сумма доставки
      payment_info: [],
      delivery_vat_rate: 5,
      delivery_vat_sum: +(Math.random() * 100).toFixed(2), // Сумма НДС
      delivery_discount_percent: 0,
      delivery_discount_sum: 0,
    },
    calls: {},
    requests: maybe(
      Array.from({ length: 5 }, () => ({
        request_uuid: uuidv4(),
        type: 'UPDATE',
        date_time: getRandomDate(),
        state: Math.random() < 0.5 ? 'SUCCESSFUL' : 'INVALID', // Результат запроса
        errors:
          Math.random() < 0.5
            ? [
                {
                  code: 'v2_recipient_location_not_recognized',
                  message: 'Recipient location is not recognized',
                },
              ]
            : [],
      })),
      0.9,
    ), // Пропуск массива запросов с вероятностью 10%
    related_entities: [],
  };
};
