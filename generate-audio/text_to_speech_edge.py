import edge_tts
import asyncio

sentences = [
    ("First, let's navigate to Google Forms to create our contact collection form.", "step_1.mp3"),
    ("Now, click on the Blank option to create a new form from scratch.", "step_2.mp3"),
    ("Let's set the form title to Contact Details and add a clear description.", "step_3.mp3"),
    ("Next, configure the first question to collect the user's name as a short text field.", "step_4.mp3"),
    ("Now, add a second question for email address and enable email validation to ensure proper format.", "step_5.mp3"),
    ("Add a third question for mobile number to collect the user's contact phone.", "step_6.mp3"),
    ("Finally, publish the form to make it available for collecting responses.", "step_7.mp3")
]

async def generate_audio(text, filename):
    communicate = edge_tts.Communicate(text, voice="en-US-JennyNeural")
    await communicate.save(filename)
    print(f"Audio saved to {filename}")

async def main():
    for text, filename in sentences:
        await generate_audio(text, filename)

asyncio.run(main())
