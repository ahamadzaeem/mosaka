import shutil
import os
import subprocess

video_src = r"d:\mosaka\Luxury_bathroom_washbasin_film_p…_91eab59b.mp4"

# 1. Update public/hero_video.mp4
os.makedirs("public", exist_ok=True)
shutil.copy(video_src, "public/hero_video.mp4")
print("Copied video to public/hero_video.mp4")

# 2. Extract frames
os.makedirs("public/frames", exist_ok=True)
cmd = ["ffmpeg", "-y", "-i", video_src, "-q:v", "2", "public/frames/frame_%03d.jpg"]
print("Running ffmpeg...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("ffmpeg return code:", res.returncode)

# 3. Check extracted frames
frames = sorted([f for f in os.listdir("public/frames") if f.startswith("frame_") and f.endswith(".jpg")])
print(f"Total frames in public/frames: {len(frames)}")
if frames:
    print(f"First frame: {frames[0]} ({os.path.getsize(os.path.join('public/frames', frames[0]))} bytes)")
    print(f"Last frame: {frames[-1]} ({os.path.getsize(os.path.join('public/frames', frames[-1]))} bytes)")

