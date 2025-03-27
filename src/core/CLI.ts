// A utility file to create modules via CLI

/**
 * @description A utility file to create modules via CLI
 * @param {string} moduleName - The name of the module to be created
 * @returns {void}
 */

// Steps
// 1. Create a folder in src with the module name
// 2. Create service, controller, model, and routes files with the module name
// 3. Register the routes in the app.ts file
// 4. Add the module to the index.ts file

import fs from "fs";
import path from "path";
import { capitalize } from "../utils/utils";

const createModule = (moduleName: string) => {
  // 0. Check if the modules folder already exists
  const modulesPath = path.join(__dirname, `../../src/modules/`);
  if (!fs.existsSync(modulesPath)) {
    fs.mkdirSync(modulesPath);
  }

  // 1. Create a folder in src/modules with the module name
  const modulePath = path.join(__dirname, `../../src/modules/${moduleName}`);

  const moduleNames = moduleName.split("-");
  if (moduleNames.length > 1) {
    moduleName = moduleNames.map((name) => capitalize(name)).join("");
  }

  fs.mkdirSync(modulePath);

  // 2. Create service, controller, model, and routes files with the module name
  fs.writeFileSync(
    `${modulePath}/${moduleName}.service.ts`,
    `export class ${moduleName}Service {}`
  );

  fs.writeFileSync(
    `${modulePath}/${moduleName}.controller.ts`,
    `export class ${moduleName}Controller {}`
  );

  fs.writeFileSync(`${modulePath}/${moduleName}.validation.ts`, ``);

  fs.writeFileSync(
    `${modulePath}/${moduleName}.model.ts`,
    `export class ${moduleName}
    {
        constructor() {}
    }`
  );

  fs.writeFileSync(
    `${modulePath}/${moduleName}.routes.ts`,
    `import { Router } from "express";
 import { ${moduleName}Controller } from "./${moduleName}.controller";

 const ${moduleName.toLowerCase()}Router = Router();
 const ${moduleName.toLowerCase()}Controller = new ${moduleName}Controller();

 export { ${moduleName.toLowerCase()}Router };`
  );

  fs.writeFileSync(
    `${modulePath}/${moduleName}.test.ts`,
    `
    import { ${moduleName}Service } from "./${moduleName}.service";`
  );

  // 3. Register the routes in the app.ts file
  const appPath = path.join(__dirname, `../../src/core/app.ts`);
  const appFile = fs.readFileSync(appPath, "utf-8");

  const newAppFile = appFile.replace(
    `// Routes`,
    `import { ${moduleName.toLowerCase()}Router } from "../modules/${moduleName.toLowerCase()}/${moduleName}.routes";
    // Routes`
  );

  fs.writeFileSync(appPath, newAppFile);
};

// Now the main usage of the CLI from the terminal
createModule(process.argv[2]);
