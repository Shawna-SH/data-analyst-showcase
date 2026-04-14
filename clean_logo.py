import cv2
import numpy as np

# Load image
img = cv2.imread('client/public/favicon.png', cv2.IMREAD_UNCHANGED)
if img is None:
    print("Could not read image")
    exit(1)

# Ensure it has alpha channel or convert to BGR
if len(img.shape) == 3 and img.shape[2] == 4:
    # Make background white where transparent
    alpha = img[:, :, 3] / 255.0
    for c in range(3):
        img[:, :, c] = img[:, :, c] * alpha + 255 * (1 - alpha)
    img = img[:, :, :3]

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

if not contours:
    print("No contours found")
    exit(1)

# Sort contours by area
contours = sorted(contours, key=cv2.contourArea, reverse=True)

# The largest is the logo.
x, y, w, h = cv2.boundingRect(contours[0])

# Crop
padding = 20
x1 = max(0, x - padding)
y1 = max(0, y - padding)
x2 = min(img.shape[1], x + w + padding)
y2 = min(img.shape[0], y + h + padding)

cropped = img[y1:y2, x1:x2]

# Create square white background
size = max(cropped.shape[0], cropped.shape[1])
final_size = size + 80
result = np.ones((final_size, final_size, 3), dtype=np.uint8) * 255

# Center it
y_offset = (final_size - cropped.shape[0]) // 2
x_offset = (final_size - cropped.shape[1]) // 2
result[y_offset:y_offset+cropped.shape[0], x_offset:x_offset+cropped.shape[1]] = cropped

cv2.imwrite('client/public/favicon.png', result)
print("Successfully cleaned and cropped logo")
