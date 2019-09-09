import fs from "fs";
import { IFile } from "../shared/interfaces";
import { Command } from "./Command";

export class ReadFileCommand extends Command<string[], IFile[]> {
	public exec(filePaths: string[]): IFile[] {
		const files: IFile[] = [];

		for (const path of filePaths) {
			try {
				const buffer = fs.readFileSync(path);
				files.push({ path, buffer });
			} catch (e) {
				const buffer = null;
				files.push({ path, buffer });
			}
		}

		return files;
	}
}

export { IFile };
