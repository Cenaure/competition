import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MarsCharacteristicsTable() {
  return (
    <Table className="w-max md:w-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Категорія</TableHead>
          <TableHead className="font-bold">Деталі</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>Розмір і відстань</TableCell>
          <TableCell>
            Діаметр: 6790 км
            <br />
            Відстань до Сонця: 228 млн км (1,5 АО)
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Орбіта і обертання</TableCell>
          <TableCell>
            День (сол): 24,6 години
            <br />
            Рік: 687 земних днів
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Структура</TableCell>
          <TableCell>
            Ядро: залізо, нікель, сірка
            <br />
            Мантія: кам’яниста
            <br />
            Кора: 10–50 км, залізо, магній тощо
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Поверхня</TableCell>
          <TableCell>
            Колір: червоний через окислення заліза
            <br />
            Веллес Марінеріс, Олімп Монс
            <br />
            Наявність води в минулому
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Атмосфера</TableCell>
          <TableCell>
            Склад: 95% CO2, 2,85% N2, 2% Ar
            <br />
            Тиск: 600 Па
            <br />
            Темп.: -143°C до 21°C
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Магнітосфера</TableCell>
          <TableCell>
            Немає глобального поля
            <br />
            Залишки 4 млрд років тому
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Місяці</TableCell>
          <TableCell>
            Фобос і Деймос, можливо, захоплені астероїди
            <br />
            Фобос наближається, може зіткнутися через 50 млн років
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
