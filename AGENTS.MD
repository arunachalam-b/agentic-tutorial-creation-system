This repo has been created primarily for agentic tutorial creation using playwright MCP. The agent has to get the instruction from the user. We need 1 root agent, and 2 subagents for this process. Each of those subagents should run one after the other. No parallel execution is needed. To achieve the user request, the agent needs to use 2 MCP servers. They are, 
1. Playwright MCP
2. PyautoGUI MCP

The root agent monitor and manage all the actions by the subagents. 

The subagents are, 
1. Planner
2. Execution

The overall process in a nutshell is that the planner agent will try to replicate the user's request by spinning up a Playwright browser via MCP and record it's observations. These observations are then shared to the execution agent with complete guide for execution. 

The Planner subagent should understand the user's intent and create a plan to achieve it. It should open the Playwright browser via MCP and try to do the action requested by the user. During this process, it should capture (every click and type) everything it does along with the browser co-ordinates (if it's click). These browser co-ordinates should then be converted into screen co-ordinates. So basically, it should record every click, keyboard type, and shortcut press with their screen co-ordiantes. It should record everything to the `PLAN.json` file as and when it observes. Write that to `PLAN.json` file in the project root. Here's a small example. 

```json
{
  "goal": "Create and publish a Google Form",
  "steps": [
    {
      "id": "step_1",
      "description": "Navigate to forms.google.com",
      "type": "keyboard", 
      "text": "forms.google.com",
    },
    {
      "id": "step_2",
      "description": "Press enter",
      "type": "Hot key", 
      "key_combination": "Enter",
    },
    {
      "id": "step_3",
      "description": "Create a blank form by clicking on Create Form button",
      "type": "click", 
      "x_coordinate": 100, 
      "y_coordinate": 150
    }
  ]
}
```

The exection agent has to read the `PATH.json` file and execute all the steps created by the planner agent. Use Google Chrome browser for performing the actions. It should follow the steps one by one. Along with that it should describe the action it's performing in a sentence for the user to understand. It can make use of the `edge-tts` to achieve this. Basically, it should enable the `venv` from the project root and use the `edge-playback` command to create and play the audio. Here's an example command, 

```bash
(sleep 1 && edge-playback --text "Hello, world") &
```

Replace "Hello, world" with the sentence of the action it's performing. The most important thing is, the above command should run in the asynchronous (background) mode with a delay of 1 second. It should not block the actual action or switch windows to do this. 

There is a pre-requisite step for execution agent. If the agent is run on a Mac machine, it should start the "Tella" app and start recording. No need to describe that you're starting the Tella app. It should stop the recording after performing all the actions. 

There are few pointers to keep in mind while performing the actions or speaking out the audio. 

1. The execution agents actions will be recorded. So make sure it's professional
2. Every sentence it speaks out will also be recorded, so ensure the audio output is also professional. If user requests some other audio tone (eg., casual) in the prompt, make sure to follow that
3. Use pyautogui MCP server to move the cursor, type, and press hot key combinations
4. Ensure to take a screenshot and verify the cursor pointer before clicking anywhere (Eg. If you want to start recording with Tella, open the Tella app, you'll shown the record icon at the bottom right corner of the screen. Move the cursor over the record icon. Take screenshot and verify the cursor pointer is at the right position before clicking on the record icon)
5. You should only play the audio (about the action being executed) only after verifying the cursor pointer/focus is at the right position
6. Ensure to play the audio in the background
7. All the actions should be done using the pyautogui MCP server except playing the audio (which must be done in background and asynchronously)
8. If you encounter any missing steps or issues, feel free to add a step yourself (no need to update in `PLAN.json` file). Make sure to describe the action via audio before you execute it, so that the user understands the context

All the MCP tools, and command line tools are already configured and tested for the agents to use. 
