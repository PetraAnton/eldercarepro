
# Posture Screening – Medical Narrative Ruleset (Markdown Input)

This document defines **medical-style narrative outputs** for posture screening reports.
It is designed to be used as **input for code generation (vibe code)** to automatically produce
human-readable, clinical-style assessment text from posture metrics.

> ⚠️ This posture screen provides **functional assessment**, not medical diagnosis.

---

## GENERAL REPORTING PRINCIPLES

- Use descriptive, non-diagnostic language
- Avoid disease labels (e.g. scoliosis, disc herniation)
- Emphasize tendency, alignment, and potential functional impact
- Sentence structure:
  **Observation → Functional meaning → Gentle recommendation (optional)**

---

# 1. FRONT VIEW (Coronal Plane – Anterior)

### Purpose
Evaluate left–right symmetry of head, shoulders, ribcage, pelvis, and lower limbs.

---

## FRONT VIEW – NORMAL / BALANCED

**Trigger conditions**
- Head shift ≤ 0.5 in
- Shoulder tilt ≤ 3°
- Hip tilt ≤ 2–3°

**Narrative**
> The report indicates that both shoulders and the pelvic structure are nearly parallel, suggesting good frontal-plane balance. Head and trunk alignment appear stable. Maintaining this posture is recommended.

---

## FRONT VIEW – MILD ASYMMETRY

**Trigger conditions**
- Head shift 0.5–1.0 in OR
- Shoulder tilt 3–7° OR
- Hip tilt 3–5°

**Narrative**
> The analysis shows a mild left–right asymmetry involving the head, shoulders, or pelvis. This pattern often reflects habitual posture or daily activity-related imbalance.

---

## FRONT VIEW – SIGNIFICANT IMBALANCE

**Trigger conditions**
- Shoulder or hip tilt > 7°
- Consistent lateral shift across multiple segments

**Narrative**
> The report identifies a noticeable imbalance between the left and right sides of the body, particularly at the shoulders and pelvis. Prolonged maintenance of this posture may increase uneven loading on the spine.

---

# 2. BACK VIEW (Coronal Plane – Posterior)

### Purpose
Assess segmental spinal alignment and compensatory patterns from a posterior perspective.

---

## BACK VIEW – SYMMETRICAL ALIGNMENT

**Trigger conditions**
- Low total posterior tilt
- No consistent directional bias across spinal segments

**Narrative**
> Posterior observation shows relatively symmetrical alignment of the spine and pelvis, with no marked lateral deviation. This suggests effective postural control from the back view.

---

## BACK VIEW – FUNCTIONAL COMPENSATION

**Trigger conditions**
- Multiple spinal segments tilted in alternating directions

**Narrative**
> The report reveals compensatory lateral adjustments across different spinal segments, indicating that the body is adapting to maintain overall balance. Such patterns are commonly associated with functional posture habits.

---

## BACK VIEW – MULTI-SEGMENT LATERAL DEVIATION

**Trigger conditions**
- Two or more adjacent spinal segments tilted in the same direction
- High total posterior tilt value

**Narrative**
> The posterior view highlights a consistent lateral deviation across multiple spinal segments. Sustaining this alignment over time may contribute to asymmetric muscular loading.

---

# 3. SIDE VIEW – RIGHT / LEFT (Sagittal Plane)

### Purpose
Evaluate forward/backward alignment, spinal curves, and cervical loading.

---

## SIDE VIEW – NEUTRAL SAGITTAL ALIGNMENT

**Trigger conditions**
- Craniovertebral angle (CVA) ≥ 50°
- Head forward shift < 1 in
- Effective head weight within normal range

**Narrative**
> From the side view, head and neck alignment appear well balanced over the torso, with cervical loading within a normal physiological range. This posture supports efficient load distribution along the spine.

---

## SIDE VIEW – MILD FORWARD HEAD POSTURE

**Trigger conditions**
- CVA 43–50°
- Head forward shift 1–2.5 in

**Narrative**
> The assessment indicates a mild forward positioning of the head, resulting in increased demand on the cervical musculature. Over time, this posture may be associated with neck and shoulder fatigue.

---

## SIDE VIEW – SIGNIFICANT FORWARD HEAD & HIGH CERVICAL LOAD

**Trigger conditions**
- CVA < 43°
- Head forward shift > 2.5 in
- Effective head weight > 25 lbs

**Narrative**
> The report shows a pronounced forward head posture with substantially increased loading on the cervical spine. Maintaining this alignment for extended periods may be associated with neck discomfort, shoulder strain, and muscular fatigue.

---

## SIDE VIEW – GLOBAL ANTERIOR COMPENSATION

**Trigger conditions**
- Head, shoulders, hips, and knees all shifted anteriorly

**Narrative**
> The side view demonstrates a global forward-shifted posture involving the head, trunk, and lower extremities. This pattern suggests an anterior-chain compensation strategy that may reduce postural efficiency.

---

# 4. OVERALL SUMMARY TEMPLATE

**Auto-generated summary example**
> Overall posture assessment indicates generally balanced alignment in the frontal plane, with compensatory patterns observed posteriorly. The sagittal analysis reveals forward head positioning associated with increased cervical load. Postural awareness and adjustment are recommended to reduce long-term strain.

---

## DISCLAIMER

This posture screening report is intended for educational and functional assessment purposes only and does not replace clinical diagnosis or professional medical evaluation.

---

**End of Medical Narrative Ruleset**

## Knee Flexion (膝の曲がり – Knee Curvature)

### Meaning
This metric evaluates the **flexion or hyperextension of the knee joint** in the sagittal plane while standing.

### Calculation (Vector-based)
- Identify the **knee joint center**
- Construct two vectors:
  - **Femur vector**: from Knee → Femur point (hip direction)
  - **Tibia vector**: from Knee → Tibia point (ankle direction)
- Compute the angle between the two vectors:


- ≈ 180° → neutral knee extension  
- < 180° → knee flexion  
- > 180° → knee hyperextension  

---

### Assessment – Normal

**Trigger conditions**
- Knee angle between 175°–185°
- No significant anterior knee shift

**Narrative**
> The knee maintains a near-neutral extension, indicating appropriate load distribution across the knee joint during standing.

---

### Assessment – Knee Flexion Detected

**Trigger conditions**
- Knee angle < 170°
- Knee joint positioned anterior to the ankle

**Narrative**
> **Độ cong của Đầu gối (膝の曲がり):**  
> Tư thế này cho thấy đầu gối bị cong khi đứng. Nếu tình trạng này kéo dài, có thể làm tăng gánh nặng lên khớp gối, đồng thời ảnh hưởng đến chuỗi vận động phía sau, làm tăng nguy cơ đau khớp gối hoặc đau thắt lưng.

---

### Assessment – Knee Hyperextension

**Trigger conditions**
- Knee angle > 185°

**Narrative**
> Báo cáo ghi nhận xu hướng duỗi quá mức tại khớp gối. Nếu duy trì trong thời gian dài, tình trạng này có thể làm tăng áp lực lên dây chằng và cấu trúc quanh khớp gối.

---

## Neck Inclination (首の傾き – Neck Tilt / Inclination)

### Meaning
This metric assesses the **inclination of the cervical spine** relative to the body’s vertical axis in the sagittal plane.

### Calculation (Vector-based)
- Identify:
  - **Neck base point** (C7 or shoulder midpoint)
  - **Head reference point** (Ear / Tragus)
- Construct the **neck vector**:
  - C7 → Ear
- Compare against the **true vertical axis**:

- ≈ 180° → neutral knee extension  
- < 180° → knee flexion  
- > 180° → knee hyperextension  

---

### Assessment – Normal

**Trigger conditions**
- Knee angle between 175°–185°
- No significant anterior knee shift

**Narrative**
> The knee maintains a near-neutral extension, indicating appropriate load distribution across the knee joint during standing.

---

### Assessment – Knee Flexion Detected

**Trigger conditions**
- Knee angle < 170°
- Knee joint positioned anterior to the ankle

**Narrative**
> **Độ cong của Đầu gối (膝の曲がり):**  
> Tư thế này cho thấy đầu gối bị cong khi đứng. Nếu tình trạng này kéo dài, có thể làm tăng gánh nặng lên khớp gối, đồng thời ảnh hưởng đến chuỗi vận động phía sau, làm tăng nguy cơ đau khớp gối hoặc đau thắt lưng.

---

### Assessment – Knee Hyperextension

**Trigger conditions**
- Knee angle > 185°

**Narrative**
> Báo cáo ghi nhận xu hướng duỗi quá mức tại khớp gối. Nếu duy trì trong thời gian dài, tình trạng này có thể làm tăng áp lực lên dây chằng và cấu trúc quanh khớp gối.

---

## Neck Inclination (首の傾き – Neck Tilt / Inclination)

### Meaning
This metric assesses the **inclination of the cervical spine** relative to the body’s vertical axis in the sagittal plane.

### Calculation (Vector-based)
- Identify:
  - **Neck base point** (C7 or shoulder midpoint)
  - **Head reference point** (Ear / Tragus)
- Construct the **neck vector**:
  - C7 → Ear
- Compare against the **true vertical axis**:


- Small angle → neutral cervical alignment  
- Larger angle (anterior direction) → forward neck inclination  

---

### Assessment – Neutral Neck Alignment

**Trigger conditions**
- Neck inclination ≤ 5–7°
- CVA within normal range

**Narrative**
> The neck remains relatively upright with respect to the body’s vertical axis, indicating physiologically appropriate cervical loading.

---

### Assessment – Forward Neck Inclination

**Trigger conditions**
- Neck inclination > 7–10°
- Associated forward head translation

**Narrative**
> **Độ nghiêng của Cổ (首の傾き):**  
> Cổ có xu hướng nghiêng và nhô về phía trước, làm gia tăng áp lực lên vùng cổ. Nếu tình trạng này kéo dài, có khả năng gây cứng cổ, đau cổ và mỏi vùng vai gáy.

---

## Implementation Notes (for Rule Engine)

```text
IF knee_angle < 170°:
  → Knee flexion narrative

IF knee_angle > 185°:
  → Knee hyperextension narrative

IF neck_inclination > threshold:
  → Forward neck inclination narrative


---

# 5. LEG ALIGNMENT (X/O LEGS)

### Purpose
Evaluate the alignment of the lower limbs in the frontal plane (Genu Valgum/Varum).

---

## LEG ALIGNMENT – NORMAL

**Trigger conditions**
- Distance between knees ≤ 2.0 in (when ankles touching)
- Distance between ankles ≤ 2.0 in (when knees touching)

**Narrative**
> **Hình dáng Chân (脚の形):**
> Hai chân tương đối thẳng, không có dấu hiệu cong vòng kiềng (O-Legs) hay chụm đầu gối (X-Legs). Trục xương đùi và xương chày nằm trên một đường thẳng sinh lý.

---

## LEG ALIGNMENT – O-LEGS (Genu Varum)

**Trigger conditions**
- Distance between knees > 2.0 in (approx) when ankles are aligned/close
- Knee center is lateral to the Hip-Ankle line

**Narrative**
> **Hình dáng Chân (脚の形):**
> Báo cáo ghi nhận khoảng cách giữa hai đầu gối rộng hơn bình thường khi đứng thẳng (Chân vòng kiềng/O-Legs). Điều này có thể làm tăng áp lực lên khoang trong khớp gối và gây mòn sụn khớp theo thời gian.

---

## LEG ALIGNMENT – X-LEGS (Genu Valgum)

**Trigger conditions**
- Distance between ankles > 2.0 in (approx) when knees are aligned/close
- Knee center is medial to the Hip-Ankle line

**Narrative**
> **Hình dáng Chân (脚の形):**
> Báo cáo ghi nhận hai đầu gối có xu hướng chụm vào nhau trong khi hai mắt cá chân cách xa (Chân chữ X/X-Legs). Tư thế này có thể làm tăng căng thẳng lên dây chằng bên trong và mặt ngoài khớp gối.

---
