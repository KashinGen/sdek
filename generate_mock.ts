import { generateData } from '@/mock_api';

const fs = require('fs');
const path = require('path');

const generateJSONFile = (fileName: string, count: number) => {
  const data = { items: Array.from({ length: count }, () => generateData()) };
  const outputPath = path.join(__dirname, 'public', fileName);

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8'); // Записываем данные в файл
  console.log(`Файл ${fileName} успешно создан с ${count} записями.`);
};

// Вызываем функцию для генерации файла
generateJSONFile('generated_data.json', 1000);
