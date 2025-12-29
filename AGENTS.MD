This repo has been created primarily for agentic tutorial creation using playwright MCP. The agent has to get the instruction from the user. We need 1 root agent, and 4 subagents for this process. Each of those subagents should run one after the other. No parallel execution is needed. 

The root agent monitor and manage all the actions by the subagents. The additional work of root agent is to maintain a log. It should create a log file inside `logs/` folder with the name `log-run-2025-12-29-10-50-PM.txt` (log-run-{date}-{time}.txt) and write every log inside that file. Every action should be logged including but not limited to, starting/completed planning, recording agent spin up, playwright started, started recording step 1, completed step 1, generating audio, finding timestamp diff, merging audio with video, etc. The timestamp should also be recorded in each line. It should be comprehensive that if a user wants to debug anything, it should be enough for him to look at the log file. Every action, every trigger, every event should be logged. 

The planner subagent should think about the steps to do to achieve this. It should come up with a JSON describing the list of steps to do in video (similar to the one below). Write that to `PLAN.json` file in the project root. 

```json
{
  "goal": "Create and publish a Google Form",
  "prerequisites": ["User must be logged into Google"],
  "steps": [
    {
      "id": "step_1",
      "description": "Open Google Forms",
      "expected_ui": "Google Forms homepage"
    },
    {
      "id": "step_2",
      "description": "Create a blank form",
      "expected_ui": "Untitled form editor"
    }
  ]
}
```

The next (recording) subagent should open playwright (using MCP) with recording enabled. NEVER run `npx playwright test` to start the playwright. ALWAYS use playwright via MCP. Follow the steps and navigate as defined in the `PATH.json` file. The audio part will be done by another subagent. Start the playwright in the headed mode with recording enabled. Ensure to move the generated recording video file to this repo after all the steps are done. Every time a step is started, the current timestamp (`echo $(($(date +%s%N)/1000000))` in terminal) should be found and updated in each step as "timestamp" field in `PATH.json` file and saved immediately. This will be used in the future while attaching audio. 

The next (audio) subagent should focus on creating audio files. It should create a voice describing the actions being performed at each step from the `PATH.json` file. The python file to generate audio is available at `generate-audio/text_to_speech_edge.py`. Ensure to switch to `venv` virtual env before executing the python file. First of all generate the list of sentences to be spoken by referring the `PATH.json` file. Write those sentences in the `sentences` variable in `generate-audio/text_to_speech_edge.py` file. Run the file to generate the respective audio files. Here's an example. 

```python
sentences = [
    ("First, let's navigate to Google Forms to create our contact collection form.", "step_1.mp3"),
    ("Now, click on the Blank option to create a new form from scratch.", "step_2.mp3"),
    ("Let's set the form title to Contact Details Collection and add a clear description.", "step_3.mp3"),
    ("Next, configure the first question to collect the user's name as a short text field.", "step_4.mp3"),
    ("Now, add a second question for email address and enable email validation to ensure proper format.", "step_5.mp3"),
    ("Add a third question for mobile number to collect the user's contact phone.", "step_6.mp3"),
    ("Finally, preview the form to verify all three fields are correctly configured.", "step_7.mp3")
]
```

The next (composer) subagent should pick the video file and all the generated audio files and merge them together. Remember each step in `PATH.json` will contain the timestamp that the step was started. So you should find difference in timestamps between current and previous step, and each audio should be placed at their respective timing gap while attaching to the video file. The audio files has to be merged in a way that the respective audio should be placed at the respective section of the video. The actions in the video and audio should be in sync. The timestamp difference calculation will ensure that. The subagent can use the `ffmpeg` tool, which is already installed in this machine. 

After the above steps are done, the root agent should change the file name to `final_recording.mp4` and place it inside `final-output` folder. 
