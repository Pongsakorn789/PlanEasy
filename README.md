# 📱 Planeasy – Your Daily Planner App

**Planeasy** เป็นแอปพลิเคชันมือถือที่ช่วยผู้ใช้จัดการแผนประจำวันได้อย่างง่ายดาย พัฒนาด้วย **React Native** และ **Expo** ผู้ใช้สามารถเพิ่ม, แก้ไข, ลบแผน, ตั้งแจ้งเตือน และดูสถิติความคืบหน้าของแผนต่าง ๆ ได้

---

## 👨‍🎓 ข้อมูลนักศึกษา

- **ชื่อ - นามสกุล:** Pongsakorn Chaikittiporn  
- **รหัสนักศึกษา:** 6631503114  
- **ชื่อแอป:** Planeasy  
- **Framework ที่ใช้:** React Native (กับ Expo)  
- **ลิงก์ GitHub Repository:** https://github.com/Pongsakorn789/PlanEasy.git  
- **ลิงก์ไฟล์ติดตั้ง (APK):** [ดาวน์โหลดที่นี่](https://expo.dev/artifacts/eas/v7sMDHxFRvp4WZVLUTL54D.apk)
- (https://expo.dev/artifacts/eas/v7sMDHxFRvp4WZVLUTL54D.apk)

---

## 🧩 1. การออกแบบแอป | App Concept and Design (2 คะแนน / 2 pts)

### 👥 1.1 ผู้ใช้งานเป้าหมาย | User Personas

#### ผู้ใช้งาน 1:
- **ชื่อ:** ไอริน  
- **อายุ:** 20 ปี  
- **อาชีพ:** นักศึกษาปี 2  
- **ความต้องการ:** ช่วยวางแผนการเรียนและกิจกรรมส่วนตัว พร้อมแจ้งเตือน

#### ผู้ใช้งาน 2:
- **ชื่อ:** พี  
- **อายุ:** 23 ปี  
- **อาชีพ:** พนักงานออฟฟิศ  
- **ความต้องการ:** จัดการงานประจำวันและดูสถิติงานที่สำเร็จ

---

### 🎯 1.2 เป้าหมายของแอป | App Goals

- จัดการแผนประจำวัน: เพิ่ม / แก้ไข / ลบ  
- แจ้งเตือนเมื่อถึงเวลาของแผน  
- แสดงแดชบอร์ดของแผนวันนี้และทั้งหมด  
- วิเคราะห์ความคืบหน้าผ่านสถิติแบบกราฟ

---

### 🖼 1.3 โครงร่างหน้าจอ | Mockup

#### หน้าหลัก:
- **แดชบอร์ด:** แผนของวันนี้, แสดงชื่อ, เวลา, หมวดหมู่, ป้ายสี  
- **รายการแผน:** จัดกลุ่มตามวันที่, กรองหมวดหมู่, ปุ่มแก้ไข/ลบ  
- **เพิ่ม/แก้ไขแผน:** ฟอร์มกรอกชื่อ, วันที่, เวลา, หมวดหมู่, บันทึก

> 📌 หมายเหตุ: ภาพหน้าจอสามารถดูได้ในหัวข้อ 2.3 หรือจาก APK

---

### 🔄 1.4 การไหลของผู้ใช้งาน | User Flow

1. เปิดแอป → เข้าสู่หน้าแดชบอร์ด  
2. กด "เพิ่มแผน" → กรอกข้อมูล → บันทึก  
3. แผนแสดงในแดชบอร์ด / รายการแผน  
4. แตะเพื่อดู/แก้ไข → กลับ  
5. เข้าแท็บ “สถิติ” → ดูกราฟและข้อมูลการใช้งาน

---

## 🛠️ การพัฒนาแอป | App Implementation (4 คะแนน / 4 pts)

### ⚙️ 2.1 รายละเอียดการพัฒนา | Development Details

- **ภาษา/เครื่องมือ:** React Native 0.74 + Expo SDK 51, JavaScript  
- **Build Tools:** Expo CLI, EAS CLI  
- **แพคเกจที่ใช้หลัก:**  
  - `@react-navigation/native` และ Stack/Tab  
  - `@react-native-async-storage/async-storage`  
  - `expo-notifications`  
  - `react-native-chart-kit`  
  - `@react-native-community/datetimepicker`  
  - `@expo/vector-icons`

---

### 📦 2.2 ฟังก์ชันที่พัฒนา | Features Implemented

- [x] เพิ่ม / แก้ไข / ลบแผน (ชื่อ, วัน, เวลา, หมวดหมู่)  
- [x] แจ้งเตือนผ่าน `expo-notifications`  
- [x] แดชบอร์ด: แผนวันนี้ + ป้ายหมวดหมู่  
- [x] รายการแผนแบบจัดกลุ่มและกรอง  
- [x] เปลี่ยนสถานะแผน (สำเร็จ/ไม่สำเร็จ)  
- [x] กราฟสถิติ (แท่ง + วงกลม)  
- [ ] ซิงก์กับปฏิทินภายนอก** (Google Calendar)

---

### 🖼️ ภาพหน้าจอแอป | App Screenshots

- ![แดชบอร์ด](https://i.pinimg.com/736x/da/ce/a6/dacea6d1543b48fd44ce38f835937485.jpg)
- ![รายการแผน](https://i.pinimg.com/736x/e9/da/69/e9da69cb28f8fe6a970f7ffbb31d516c.jpg)
- ![เพิ่มแผน](https://i.pinimg.com/736x/b1/9b/eb/b19beb4d7e0ae10d95ad9de10a7c106d.jpg)
- ![Stats](https://i.pinimg.com/736x/11/44/4d/11444d96d9e47515fd2d7dd562f36bc4.jpg)

---

## 📦 3. การ Build และติดตั้งแอป (2 คะแนน)

### 🛠 3.1 ประเภท Build

- [x] Debug  
- [ ] Release

### 📱 3.2 แพลตฟอร์มที่ทดสอบ

- [x] Android  
- [ ] iOS 

### 📥 3.3 วิธีติดตั้ง

1. ดาวน์โหลด APK: [ลิงก์นี้](https://expo.dev/artifacts/eas/v7sMDHxFRvp4WZVLUTL54D.apk)
(https://expo.dev/artifacts/eas/v7sMDHxFRvp4WZVLUTL54D.apk)  
2. เปิดการติดตั้งจากแหล่งที่ไม่รู้จัก (Settings > Security)  
3. ใช้ File Manager ติดตั้ง APK  
4. เปิดแอปและอนุญาตการแจ้งเตือน

---

## 🧠 4. การสะท้อนผลลัพธ์ (2 คะแนน)

### ⚠️ ปัญหาที่พบ

- expo-notifications ไม่ทำงาน (แก้โดยเพิ่ม permission ใน `app.json`)  
- ปรับสไตล์แถบนำทาง (Bottom Tabs) ให้ดูดีขึ้น  
- Build ล้มเหลวเพราะไม่มี `notification-icon.png` และไม่มี `profile` ใน `eas.json`

### ✅ สิ่งที่เรียนรู้

- ใช้งาน React Navigation และการจัดการ state  
- ความสำคัญของหมวดหมู่ที่สอดคล้องทุกหน้า  
- การ Build APK ด้วย EAS CLI และการอ่าน Build Logs

### 🔧 สิ่งที่จะปรับปรุง

- เพิ่มฟีเจอร์ “แผนแบบซ้ำ” (รายวัน/รายสัปดาห์)  
- เพิ่มโหมดมืด (Dark Mode) ด้วย React Context  
- ซิงก์แผนกับ Google Calendar ได้มากขึ้น

---

## 🤖 5. การใช้ AI ช่วยพัฒนา (โบนัส)

ใช้ AI (Grok จาก xAI) เพื่อช่วยในการ Build, แก้ไขข้อผิดพลาด และขั้นตอนการ Deploy แอป โดยมีรายละเอียดดังนี้:

---

### 🧠 5.1 การคิดไอเดีย (Idea Generation)

#### ❓ Prompt 1:
> “ฉันควรทำแอพอะไรดีที่ไม่ยุ่งยากและน่าสนใจ ขอแค่ไอเดียแอพก่อนเป็นภาษาไทยนะ”

**ผลลัพธ์:**  
แนวคิดแอพ: PlanEasy
คำอธิบาย: แอพที่ช่วยให้ผู้ใช้จดแผนการทำกิจกรรมประจำวันหรือรายสัปดาห์ เช่น การเรียน งาน หรือเป้าหมายส่วนตัว พร้อมระบบเตือนและสรุปความคืบหน้า เพื่อให้จัดการชีวิตได้ง่ายและมีระเบียบมากขึ้น

ทำไมน่าสนใจ:

ใช้งานง่าย เหมาะกับนักศึกษาหรือคนที่ต้องการจัดระเบียบชีวิต
สามารถพัฒนาฟีเจอร์พื้นฐานได้เร็ว และเพิ่มฟีเจอร์เสริมได้ถ้ามีเวลา
ใช้เทคโนโลยีพื้นฐาน เช่น ListView, Notification API, และ Local Storage
Framework แนะนำ: Flutter (เพราะใช้งานง่ายและมีแพ็กเกจพร้อม เช่น flutter_local_notifications สำหรับแจ้งเตือน)

---

### 🧩 5.2 การออกแบบ UI (UI Layout Prompt)

- ❌ ไม่ได้ใช้ AI โดยตรง  
- ✅ ออกแบบ UI จากตัวอย่างใน React Native และปรับตามสไตล์ส่วนตัว

---

### 🧑‍💻 5.3 การเขียนโค้ด (Code Writing Prompt)

- ❌ ไม่ได้ใช้ AI เขียนโค้ด  
- ✅ เขียนโค้ดเองโดยอ้างอิงจากเอกสาร React Native และ Expo

---

### 🐞 5.4 การดีบั๊ก (Debug Prompt)

#### ❓ Prompt 1:
> “I got an error when running `eas build --platform android`: Missing build profile in `eas.json`: production. Here's my eas.json: [shared file]. How do I fix this?”

**ผลลัพธ์:**  
AI แนะนำให้ระบุ `--profile` ที่มีอยู่ เช่น `preview` หรือเพิ่ม profile `production` ใน `eas.json`  
✅ แก้ปัญหาโดยเพิ่ม `production` profile และสั่ง build ด้วย `--profile preview`

---

#### ❓ Prompt 2:
> “My Build failed with error: `yarn expo prebuild --no-install --platform android` exited with non-zero code: 1. The Prebuild log shows: ERROR: ENOENT: no such file or directory, open './assets/notification-icon.png'. How do I fix this?”

**ผลลัพธ์:**  
AI ระบุว่าไฟล์ `notification-icon.png` หายไป  
✅ สร้างไอคอนขนาด 96x96 px (พื้นหลังโปร่งใส สีขาว) แล้วใส่ไว้ในโฟลเดอร์ `assets` เพื่อให้ Build ผ่าน

---

### 🚀 5.5 การ Deploy (Deployment Prompt)

#### ❓ Prompt:
> “How do I build an APK for my React Native Expo app to get a link for submission?”

**ผลลัพธ์:**  
AI แนะนำขั้นตอนดังนี้:

1. ติดตั้ง EAS CLI: `npm install -g eas-cli`  
2. อัปเดต `app.json` ให้มี `package` และ `permissions`  
3. สร้าง `eas.json` พร้อม profile: `preview` และ `release`  
4. สั่ง Build: `eas build --platform android --profile preview`  
✅ ทำตามขั้นตอนนี้ได้ลิงก์ APK สำหรับส่งอาจารย์เรียบร้อย

---

### ✅ Final Checklist

- [x] กรอกข้อมูลครบทุกส่วนตามเทมเพลต  
- [x] มีลิงก์ GitHub Repository หรือจะส่ง .zip  
- [x] แนบลิงก์ไฟล์ APK แล้ว  
- [x] สะท้อนกระบวนการพัฒนา + ระบุการใช้งาน AI

---
