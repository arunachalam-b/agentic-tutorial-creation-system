# Agentic Tutorial Creation System

An agentic tutorial creation system that automatically generates video tutorials with synchronized voice narration using Playwright MCP and AI-powered text-to-speech.

## Overview

This project automates the creation of video tutorials by:

1. **Planning** - Breaking down tutorial goals into structured steps
2. **Recording** - Capturing browser interactions using Playwright MCP
3. **Audio Generation** - Creating voice narration for each step using Edge TTS
4. **Composing** - Merging video and audio with precise synchronization

## Architecture

The system uses a multi-agent architecture:

| Agent | Responsibility |
|-------|----------------|
| **Root Agent** | Monitors and manages all subagent actions |
| **Planner Subagent** | Creates a structured plan (`PLAN.json`) with steps to achieve the goal |
| **Recording Subagent** | Executes steps in headed Playwright browser via MCP and records the session |
| **Audio Subagent** | Generates voice narration for each step using text-to-speech |
| **Composer Subagent** | Merges video and audio files with proper timestamp synchronization |

## Prerequisites

- Node.js and pnpm
- Python 3.x with virtual environment (`venv`)
- FFmpeg (for video/audio composition)
- Playwright MCP server
- OpenCode CLI

## First-Time Setup

Before using this project, complete the following one-time setup steps:

### 1. Configure Playwright MCP for OpenCode

Add the Playwright MCP server to your OpenCode configuration. Open (or create) the config file at `~/.config/opencode/opencode.json` and add the following:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "playwright": {
      "type": "local",
      "command": [
        "npx",
        "@playwright/mcp@latest",
        "--user-data-dir=/home/<your_user_name>/opencode-playwright-storage/",
        "--save-video=1024x768",
        "--output-dir=/home/<your_user_name>/Projects/record-automation/recordings/"
      ],
      "enabled": true
    }
  }
}
```

> **Note:** Adjust the paths in `--user-data-dir` and `--output-dir` to match your environment if needed. You may also change the resolution of video capture using `--save-video` param. 

### 2. Install the Click Feedback Extension

The click feedback extension provides visual feedback during recordings. You need to install it in the Playwright browser:

1. Start OpenCode and trigger the Playwright browser to open (e.g., ask the agent to navigate to any URL)
2. Once the browser opens, navigate to `chrome://extensions/`
3. Enable **Developer mode** using the toggle in the top-right corner
4. Click **Load unpacked**
5. Navigate to and select the `click-feedback-extension` folder in this project directory
6. The extension should now appear in your extensions list and will be active for all recordings

> **Important:** Since the extension is loaded in the Playwright user data directory, it will persist across sessions.

### 3. Pre-authenticate for Protected Pages

If your tutorial involves pages that require login (e.g., Google Forms, GitHub, etc.), you must authenticate beforehand:

1. Start OpenCode and ask the agent to open the Playwright browser (e.g., "Open the browser and navigate to https://google.com")
2. Manually log in to any services you'll need during recording
3. Close the browser properly through the agent (e.g., "Close the browser")
4. Your authentication cookies will be saved in the `--user-data-dir` location and persist for future sessions

> **Tip:** You only need to do this once per service, as long as the session doesn't expire.

## Project Structure

```
record-automation/
├── generate-audio/
│   └── text_to_speech_edge.py    # TTS script for generating audio
├── recordings/                    # Auto-generated video recordings
├── final-output/                  # Final composed videos
├── scripts/
│   └── save-auth.ts              # Authentication helper
├── click-feedback-extension/      # Browser extension for click feedback
├── PLAN.json                      # Generated plan file
├── AGENTS.MD                      # Detailed agent instructions
└── README.MD                      # This file
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd record-automation
   ```

2. Install Node.js dependencies:
   ```bash
   pnpm install
   ```

3. Set up Python virtual environment:
   ```bash
   cd generate-audio
   python -m venv venv
   source venv/bin/activate
   pip install edge-tts
   ```

## Usage

Provide instructions to the root agent describing what tutorial you want to create. The system will automatically:

1. Generate a step-by-step plan in `PLAN.json`
2. Record the browser session to `recordings/recording-{timestamp}.webm`
3. Generate audio files for each step in `generate-audio/`
4. Compose the final video with synchronized audio to `final-output/final_recording.mp4`

## Example

Here's an example prompt to create a tutorial:

> Refer @AGENTS.MD file and follow all the instructions mentioned there. I want to make a tutorial about creating and publishing a simple contact details collection using google form. As part of this tutorial, collect name, email, and mobile number of the user. Don't preview the form and don't change any sharing/access related settings. Directly publish it.

This will generate a complete video tutorial showing how to create a Google Form for collecting contact details, with voice narration explaining each step.

## How It Works

### Step 1: Planning
The planner agent creates a JSON structure defining each step:

```json
{
  "goal": "Create and publish a Google Form",
  "steps": [
    {
      "id": "step_1",
      "description": "Open Google Forms"
    },
    {
      "id": "step_2",
      "description": "Create a blank form"
    }
  ]
}
```

### Step 2: Recording
The recording agent executes each step using Playwright MCP in headed mode, capturing timestamps for audio synchronization.

### Step 3: Audio Generation
The audio agent generates narration using Edge TTS:

```python
sentences = [
    ("First, let's navigate to Google Forms.", "step_1.mp3"),
    ("Now, click on Blank to create a new form.", "step_2.mp3"),
]
```

### Step 4: Composition
The composer agent uses FFmpeg to merge video and audio with calculated delay offsets for perfect synchronization.

## Configuration

- Recordings are saved in the `recordings/` directory
- Audio files are generated in the `generate-audio/` directory
- Final output is placed in `final-output/final_recording.mp4`

## Notes

- Always use Playwright via MCP, not `npx playwright test`
- The recording agent captures timestamps at the start of each step for audio sync
- Audio delays are calculated relative to video start with a 2-second offset adjustment for steps after the first

## License

MIT
