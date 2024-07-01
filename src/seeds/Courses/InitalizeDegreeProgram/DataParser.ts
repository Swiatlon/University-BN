import { FILE_PATH_BASE, FILES, MODULE_INDEX_IN_EXCEL, SUBJECT_INDEX_IN_EXCEL } from 'constants/seeders/seeder.Constants';
import ExcelJS from 'exceljs';
import { IDataParser, ParsedRowData } from 'interfaces/Courses/ICourses';
import path from 'path';

export class DataParser implements IDataParser {
    private filePathBase: string = path.resolve(FILE_PATH_BASE);
    private files: string[] = FILES;

    public async parseFiles(): Promise<ParsedRowData[]> {
        const parsedData: ParsedRowData[] = [];

        for (const file of this.files) {
            const filePath = path.join(this.filePathBase, file);
            const degreeCourseName = file.replace('.xlsx', '');

            try {
                const workbook = await this.loadWorkbook(filePath);
                const data = this.parseWorkbook(workbook, degreeCourseName);
                parsedData.push(...data);
            } catch (error) {
                console.error(`Failed to process file ${file}:`, error);
            }
        }

        return parsedData;
    }

    public async loadWorkbook(filePath: string): Promise<ExcelJS.Workbook> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        return workbook;
    }

    public parseWorkbook(workbook: ExcelJS.Workbook, degreeCourseName: string): ParsedRowData[] {
        const parsedData: ParsedRowData[] = [];

        workbook.eachSheet((worksheet) => {
            const degreePathName = worksheet.name;
            const data = this.parseWorksheet(worksheet, degreeCourseName, degreePathName);
            parsedData.push(...data);
        });

        return parsedData;
    }

    public parseWorksheet(worksheet: ExcelJS.Worksheet, degreeCourse: string, degreePath: string): ParsedRowData[] {
        const data: ParsedRowData[] = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                return;
            }

            const module = row.getCell(MODULE_INDEX_IN_EXCEL).value as string;
            const subject = row.getCell(SUBJECT_INDEX_IN_EXCEL).value as string;

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
