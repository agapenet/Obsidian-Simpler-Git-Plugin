import { Plugin } from "obsidian";

const tag: string = "seamless-git:"

export default class SeamlessGit extends Plugin{
	onload(): void {
		console.log("Seamless Git Loading..")

		// STAGE 0: PULL CHANGES
		console.log("Pulling Changes")
		this.runThisCommand("obsidian-git:pull")

		this.addCommand({
			id: tag+"save-commit-push",
			name: 'Save file, Commit Changes, then Push',
			callback: () => {

				// STAGE 1: SAVE FILE
				this.runThisCommand("editor:save-file")

				// STAGE 2: COMMIT CHANGES
				// STAGE 3: PUSH CHANGES TO REMOTE
				this.runThisCommand("obsidian-git:push")
      		},
    	});
	}

	private runThisCommand(inputId: string): void {
		const commandId = inputId;
		const commands = (this.app as any).commands;
		const commandExist = commands.listCommands().some((cmd: any) => cmd.id === commandId);

		if(!commandExist){
			console.log(tag, "could not find command \"", inputId, "\"")
			return;
		}

		console.log(tag, "attempting to execute command \"", commandId, "\"")
		commands.executeCommandById(commandId);
	}
}