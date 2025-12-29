import edge_tts
import asyncio

sentences = [
    ("Navigate to Google Forms website", "audio_01.mp3"),
    ("Click Blank form", "audio_02.mp3"),
    ("Click form title and type Contact Details Form", "audio_03.mp3"),
    ("Type Name as first question", "audio_04.mp3"),
    ("Click Add question and type Email", "audio_05.mp3"),
    ("Click Add question and type Mobile Number", "audio_06.mp3"),
    ("Add description, type digits only", "audio_07.mp3"),
    ("Form completed", "audio_08.mp3")
]

async def generate_audio(text, filename):
    communicate = edge_tts.Communicate(text, voice="en-US-JennyNeural")
    await communicate.save(filename)
    print(f"Audio saved to {filename}")

async def main():
    for text, filename in sentences:
        await generate_audio(text, filename)

asyncio.run(main())
