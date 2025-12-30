This repo has been created primarily for agentic tutorial creation using playwright MCP. The agent has to get the instruction from the user. We need 1 root agent, and 4 subagents for this process. Each of those subagents should run one after the other. No parallel execution is needed. 

The root agent monitor and manage all the actions by the subagents. 

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

The next (recording) subagent should open playwright (using MCP). NEVER run `npx playwright test` to start the playwright. ALWAYS use playwright via MCP. Follow the steps and navigate as defined in the `PATH.json` file. The audio part will be done by another subagent. Start the playwright in the headed mode. After all the steps are done, close the playwright MCP browser. This will create the recording video file at `recordings/` folder in the project root with the name `recording-{timestamp}.webm`. BEFORE STARTING TO EXECUTE EVERY STEP (MOST IMPORTANT), the current timestamp (`echo $(($(date +%s%N)/1000000))` in terminal) should be found and updated in each step as "timestamp" field in `PATH.json` file and saved immediately. This will be used in the future while attaching audio. 

The next (audio) subagent should focus on creating audio files. It should create a voice describing the actions being performed at each step from the `PATH.json` file. The python file to generate audio is available at `generate-audio/text_to_speech_edge.py`. Ensure to switch to `venv` virtual env before executing the python file. First of all generate the list of sentences to be spoken by referring the `PATH.json` file. Write those sentences in the `sentences` variable in `generate-audio/text_to_speech_edge.py` file. Run the file to generate the respective audio files. Here's an example. 

```python
sentences = [
    ("First, let's navigate to Google Forms to create our contact collection form.", "step_1.mp3"),
    ("Now, click on the Blank option to create a new form from scratch.", "step_2.mp3"),
]
```

The next (composer) subagent should pick the video file (file with latest timestamp in recordings/ folder) and all the generated audio files and merge them together. Remember each step in PATH.json will contain the absolute wall-clock timestamp at which the step was started during recording. So you should first identify the earliest step timestamp as the video start time, and for each step find the difference between the step timestamp and the video start timestamp, and place each audio at that relative offset while attaching it to the video file. Each audio should be placed at its respective section of the video using this computed offset. The audio and video actions should be in sync, and converting absolute timestamps to relative offsets from the video start will ensure correct alignment. The subagent can use the ffmpeg tool, which is already installed in this machine. Here's an example command. 

```bash
ffmpeg -y -i google-form-tutorial.webm \
  -i generate-audio/step_1.mp3 -i generate-audio/step_2.mp3 -i generate-audio/step_3.mp3 \
  -i generate-audio/step_4.mp3 -i generate-audio/step_5.mp3 -i generate-audio/step_6.mp3 \
  -i generate-audio/step_7.mp3 \
  -filter_complex "[1:a]adelay=0|0[audio1];[2:a]adelay=10023|10023[audio2];[3:a]adelay=68610|68610[audio3];[4:a]adelay=113773|113773[audio4];[5:a]adelay=145311|145311[audio5];[6:a]adelay=227416|227416[audio6];[7:a]adelay=276734|276734[audio7];[audio1][audio2][audio3][audio4][audio5][audio6][audio7]amix=inputs=7:duration=longest[audioout]" \
  -map 0:v -map "[audioout]" -c:v libx264 -preset ultrafast -crf 23 -c:a aac -b:a 192k final-output/final_recording.mp4 2>&1 | tail -20
```

REMEMBER: The duration parameter should be set as "longest" in the above command to include all the audio files. Otherwise only the first audio is coming in the video. 

After the above steps are done, the root agent should change the file name to `final_recording.mp4` and place it inside `final-output` folder. 
