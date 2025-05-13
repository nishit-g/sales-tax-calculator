#!/usr/bin/env node

console.log("Starting the Interactive Sales Tax Calculator...");

import("./src/interactive.js")
  .then((module) => {
    const InteractiveCLI = module.InteractiveCLI;
    const cli = new InteractiveCLI();
    console.log("Initializing CLI...");
    cli.start().catch((error) => {
      console.error("Error in interactive CLI:", error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("Failed to import interactive CLI module:", error);
    process.exit(1);
  });
