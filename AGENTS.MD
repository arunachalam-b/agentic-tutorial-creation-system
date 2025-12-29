This repo has been created primarily for agentic tutorial creation using playwright MCP. The agent has to get the instruction from the user. We need 1 root agent, and 3 subagents for this process. 

The root agent monitor and manage all the actions by the subagents. 

One subagent should open playwright and navigate and observe the code needs to be written to automate the flow using playwright. Write the code to automate in the `recorder/recorder.spec.ts` file. Ensure to add enough gap between each action so the audio can be added respectively. The audio part will be done by another subagent. Start the playwright in the headed mode with recording enabled. Ensure to move the generated recording video file to this repo at the end. 

The 2nd subagent should focus on creating audio files. It should create a voice describing the actions being performed on the browser. The python file to generate audio is available at `generate-audio/text_to_speech_edge.py`. Ensure to switch to `venv` virtual env before executing the python file. First of all generate the list of sentences to be spoken by referring the `recorder/recorder.spec.ts` file. Write those sentences in the `generate-audio/AUDIO_SENTENCES.MD` file for future reference. For each sentence, update the "TEXT" and "AUDIO_FILE" fields in the file, run the file, to generate the respective audio files. 

The 3rd subagent should pick the video file and all the generated audio files and merge them together. The audio files has to be merged in a way that the respective audio should be placed at the respective section of the video. The actions in the video and audio should be in sync. The subagent can use the `ffmpeg` tool is already installed in this machine. 

After everything is done, the root agent should change the file name to `final_recording.mp4` and place it inside `final-output` folder. 
