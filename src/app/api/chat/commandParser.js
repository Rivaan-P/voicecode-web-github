const fs = require('fs').promises;
const path = require('path');

export const parseCommands = (text) => {
  const commandPattern = /'''File Management\n\n(.*?)\n\n'''/gs;
  const match = commandPattern.exec(text);

  if (!match) return [];

  const commandsText = match[1];
  const commands = commandsText.split('\n').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);

  return commands;
};

export const executeCommands = async (commands, currentDirectory) => {
  let cwd = currentDirectory;
  
  for (const command of commands) {
    const [action, args] = parseCommand(command);

    switch (action) {
      case 'createFile':
        await createFile(args[0], cwd);
        break;
      case 'setWriteFocus':
        // This would be implemented if the AI needs to write content to the file later.
        break;
      case 'renameFile':
        await renameFile(args[0], args[1], cwd);
        break;
      case 'switchDirectory':
        cwd = await switchDirectory(args[0], cwd);
        break;
      default:
        console.warn(`Unknown command: ${action}`);
    }
  }
};

const parseCommand = (command) => {
  const actionPattern = /(\w+)\((.*?)\)/;
  const match = command.match(actionPattern);

  if (!match) throw new Error(`Invalid command format: ${command}`);

  const action = match[1];
  const args = match[2].split(',').map(arg => arg.trim().replace(/^['"]|['"]$/g, ''));

  return [action, args];
};

const createFile = async (filename, directory) => {
  const filePath = path.join(directory, filename);
  await fs.writeFile(filePath, '');
  console.log(`Created file: ${filePath}`);
};

const renameFile = async (oldFilename, newFilename, directory) => {
  const oldFilePath = path.join(directory, oldFilename);
  const newFilePath = path.join(directory, newFilename);
  await fs.rename(oldFilePath, newFilePath);
  console.log(`Renamed file from ${oldFilePath} to ${newFilePath}`);
};

const switchDirectory = async (newDirectory, currentDirectory) => {
  const targetDirectory = path.resolve(currentDirectory, newDirectory);

  // Check if the new directory is within the project scope
  const projectRoot = path.resolve(currentDirectory, '../../'); // Adjust according to your project structure
  if (!targetDirectory.startsWith(projectRoot)) {
    throw new Error(`Directory ${newDirectory} is out of project scope.`);
  }

  // Check if the directory exists
  const stat = await fs.stat(targetDirectory);
  if (!stat.isDirectory()) {
    throw new Error(`${newDirectory} is not a valid directory.`);
  }

  console.log(`Switched to directory: ${targetDirectory}`);
  return targetDirectory;
};
