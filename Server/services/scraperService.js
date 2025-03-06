import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createDb } from "../controller/dbController.js";
import { addAllEvents } from "../controller/eventController.js";

// Fix "__dirname" in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export  const runScraper = async () => {
    return new Promise((resolve, reject) => {
        console.log("⏳ Running Python scraper...");

        const pythonProcess = spawn("python", ["-u",path.join(__dirname, "../../scripts/SupremeMaster.py")]);


        pythonProcess.stdout.on("data", (data) => {
            console.log(`📌 Python Output: ${data.toString()}`);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`⚠️ Python Error: ${data.toString()}`);
        });

        pythonProcess.on("close", (code) => {
            console.log(`✅ Python script finished with exit code ${code}`);
            // createDb();
            // addAllEvents();
            // resolve();
        });

        pythonProcess.on("error", (err) => {
            console.error("❌ Failed to start Python script:", err);
            reject(err);
        });
    });
 

};
