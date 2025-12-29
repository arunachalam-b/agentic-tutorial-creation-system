import edge_tts
import asyncio

sentences = [
    ("First, let's go to Google Forms and create a new blank form to collect contact details.", "audio_01.mp3"),
    ("Now I'll add the first question for collecting the user's name.", "audio_02.mp3"),
    ("Next, I'll add a question to collect the user's email address.", "audio_03.mp3"),
    ("Then I'll add a question for collecting the mobile number.", "audio_04.mp3"),
    ("Finally, let's preview our form to make sure everything looks correct.", "audio_05.mp3")
]

async def generate_audio(text, filename):
    communicate = edge_tts.Communicate(text, voice="en-US-JennyNeural")
    await communicate.save(filename)
    print(f"Audio saved to {filename}")

async def main():
    for text, filename in sentences:
        await generate_audio(text, filename)

asyncio.run(main())
