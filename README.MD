# Record Automation

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
