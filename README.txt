الملفات الجاهزة للتشغيل

1) index.html
2) zone.geojson
3) zones.csv
4) firebase-config.js

ملاحظات:
- تم تحويل الخريطة الجديدة ArcGIS JSON إلى GeoJSON جاهز باسم zone.geojson
- تم تحويل ملف الإكسل الجديد إلى ملف CSV جاهز باسم zones.csv
- تم توحيد الحقول لتعمل مع الكود الحالي:
  zone_code / Work_ID / Area_Code / Gov / Name / Address
- تم تعديل index.html ليتعامل أيضاً مع الملفات الجديدة إذا رفعتها لاحقاً

طريقة التشغيل:
- ضع الملفات كلها في نفس المجلد على الاستضافة أو السيرفر المحلي
- افتح index.html عبر سيرفر محلي أو استضافة
- إذا أردت تشغيل محلي سريع:
  python -m http.server 8000
  ثم افتح:
  http://localhost:8000/
