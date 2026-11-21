import shutil
import os
import subprocess

mobile_video_src = r"d:\mosaka\Creating_luxury_bathroom_film_4013a8d6 (1).mp4"

# 1. Copy video to public/hero_video_mobile.mp4
os.makedirs("public", exist_ok=True)
shutil.copy(mobile_video_src, "public/hero_video_mobile.mp4")
print("Copied video to public/hero_video_mobile.mp4")

# 2. Extract 240 frames into public/frames_mobile/
out_dir = "public/frames_mobile"
os.makedirs(out_dir, exist_ok=True)
cmd = ["ffmpeg", "-y", "-i", mobile_video_src, "-q:v", "2", os.path.join(out_dir, "frame_%03d.jpg")]
print("Extracting mobile frames...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("ffmpeg return code:", res.returncode)

# 3. Check extracted frames
frames = sorted([f for f in os.listdir(out_dir) if f.startswith("frame_") and f.endswith(".jpg")])
print(f"Total frames in public/frames_mobile: {len(frames)}")
if frames:
    print(f"First frame: {frames[0]} ({os.path.getsize(os.path.join(out_dir, frames[0]))} bytes)")
    print(f"Last frame: {frames[-1]} ({os.path.getsize(os.path.join(out_dir, frames[-1]))} bytes)")

