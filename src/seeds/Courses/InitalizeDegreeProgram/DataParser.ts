import ExcelJS from 'exceljs';
import path from 'path';

export interface ParsedRowData {
    degreeCourse: string;
    degreePath: string;
    module: string;
    subject: string;
}

const moduleIndexInExcel = 2;
const subjectIndexInExcel = 1;

export class DataParser {
    private filePathBase: string = path.resolve('src/data/CoursesPrograms');
    private files: string[] = ['Banking.xlsx', 'Financials.xlsx', 'Informatyka Stosowana.xlsx'];

    public async parseFiles(): Promise<ParsedRowData[]> {
        const parsedData: ParsedRowData[] = [];
        for (const file of this.files) {
            const filePath = path.join(this.filePathBase, file);
            const degreeCourseName = file.replace('.xlsx', '');
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);

            const sheetNames = workbook.worksheets.map((sheet) => sheet.name);

            for (const sheetName of sheetNames) {
                const worksheet = workbook.getWorksheet(sheetName);

                if (!worksheet) {
                    console.warn(`Worksheet ${sheetName} not found in ${file}`);
                    continue;
                }

                const degreePathName = sheetName;
                const data = this.parseWorksheet(worksheet, degreeCourseName, degreePathName);
                parsedData.push(...data);
            }
        }

        return parsedData;
    }

    private parseWorksheet(worksheet: ExcelJS.Worksheet, degreeCourse: string, degreePath: string): ParsedRowData[] {
        const data: ParsedRowData[] = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                return;
            }

            const module = row.getCell(moduleIndexInExcel).value as string;
            const subject = row.getCell(subjectIndexInExcel).value as string;

            if (!module || !subject) {
                return;
            }

            const rowData: ParsedRowData = {
                degreeCourse,
                degreePath,
                module,
                subject,
            };

            data.push(rowData);
        });

        return data;
    }
}
