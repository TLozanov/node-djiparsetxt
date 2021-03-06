import { expect } from "chai";
import fs from "fs";
import path from "path";
import { get_header, parse_file } from "../src/node-djiparsetxt";

describe("Mavic 2 Log Tests", () => {
	const filesDir = path.join(__dirname, "../assets/flight_logs/mavic2");
	createTestFromDir(filesDir);
});

describe("Phantom 3 Log Tests", () => {
	const filesDir = path.join(__dirname, "../assets/flight_logs/phantom3");
	createTestFromDir(filesDir);
});

describe("Phantom 4 Log Tests", () => {
	const filesDir = path.join(__dirname, "../assets/flight_logs/phantom4");
	createTestFromDir(filesDir);
});

describe("Spark Log Tests", () => {
	const filesDir = path.join(__dirname, "../assets/flight_logs/spark");
	createTestFromDir(filesDir);
});

function createTestFromDir(filePath: string) {
	const fileList = fs.readdirSync(filePath);

	for (let fileName of fileList) {
		it(`should parse file '${fileName}'`, () => {
			fileName = path.join(filePath, fileName);
			const buffer = fs.readFileSync(fileName);
			const header = get_header(buffer);
			console.log(`    version = ${header.version}`);
			const rows = parse_file(buffer);

			expect(rows).to.be.an("array");
			expect(rows.length).to.be.greaterThan(0);
			for (const row of rows) {
				expect(row).to.have.property("OSD");
			}
		});
	}
}