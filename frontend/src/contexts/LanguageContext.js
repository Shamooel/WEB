"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the language context
const LanguageContext = createContext()

// Translations for different languages
const translationsData = {
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    collections: "Collections",
    newArrivals: "New Arrivals",
    ourStory: "Our Story",
    contact: "Contact Us",
    login: "Login",
    signup: "Sign Up",
    myAccount: "My Account",
    myOrders: "My Orders",
    logout: "Logout",
    categories: "Categories",

    // Product related
    addToCart: "Add to Cart",
    addToWishlist: "Add to Wishlist",
    viewDetails: "View Details",
    price: "Price",
    quantity: "Quantity",
    color: "Color",
    size: "Size",
    details: "Details",
    shipping: "Shipping",
    returns: "Returns",

    // Home page
    discoverCollection: "Discover Our Collection",
    exploreSelection:
      "Explore our curated selection of premium Pakistani fashion, designed for the modern individual who values tradition and elegance.",

    // Welcome page
    luxuryFashion: "Luxury Pakistani Fashion",
    experienceElegance: "Experience traditional elegance in a new dimension",
    exploreCollection: "Explore Collection",

    // Footer
    newsletter: "Newsletter",
    subscribeUpdates: "Subscribe to receive updates on our latest collections and exclusive offers.",
    subscribe: "Subscribe",
    allRightsReserved: "All rights reserved.",

    // Auth
    welcomeBack: "Welcome Back",
    enterCredentials: "Enter your credentials to access your account",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    createAccount: "Create Account",
    joinUs: "Join us to explore exclusive Pakistani fashion",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",

    // Cart & Wishlist
    yourCart: "Your Shopping Cart",
    yourWishlist: "Your Wishlist",
    emptyCart: "Your cart is empty",
    emptyWishlist: "Your wishlist is empty",
    continueShopping: "Continue Shopping",
    product: "Product",
    total: "Total",
    subtotal: "Subtotal",
    orderSummary: "Order Summary",
    proceedToCheckout: "Proceed to Checkout",

    // Contact
    contactUs: "Contact Us",
    contactMessage:
      "We'd love to hear from you. Please fill out the form below or reach out to us using the contact information.",
    yourName: "Your Name",
    emailAddress: "Email Address",
    subject: "Subject",
    yourMessage: "Your Message",
    sendMessage: "Send Message",
    getInTouch: "Get in Touch",
    ourLocation: "Our Location",
    phoneNumber: "Phone Number",
    workingHours: "Working Hours",
    followUs: "Follow Us",

    // Misc
    loading: "Loading",
    error: "Error",
    pageNotFound: "Page Not Found",
    pageNotFoundMessage:
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    returnToHome: "Return to Home",
  },
  ur: {
    // Navigation
    home: "ہوم",
    products: "پروڈکٹس",
    collections: "کلیکشنز",
    newArrivals: "نئی آمد",
    ourStory: "ہماری کہانی",
    contact: "رابطہ کریں",
    login: "لاگ ان",
    signup: "سائن اپ",
    myAccount: "میرا اکاؤنٹ",
    myOrders: "میرے آرڈرز",
    logout: "لاگ آؤٹ",
    categories: "اقسام",

    // Product related
    addToCart: "کارٹ میں شامل کریں",
    addToWishlist: "خواہش کی فہرست میں شامل کریں",
    viewDetails: "تفصیلات دیکھیں",
    price: "قیمت",
    quantity: "مقدار",
    color: "رنگ",
    size: "سائز",
    details: "تفصیلات",
    shipping: "شپنگ",
    returns: "واپسی",

    // Home page
    discoverCollection: "ہمارا کلیکشن دریافت کریں",
    exploreSelection:
      "ہمارے منتخب پاکستانی فیشن کا انتخاب دریافت کریں، جو جدید افراد کے لیے ڈیزائن کیا گیا ہے جو روایت اور شائستگی کو قدر کرتے ہیں۔",

    // Welcome page
    luxuryFashion: "لگژری پاکستانی فیشن",
    experienceElegance: "روایتی شائستگی کو ایک نئے طریقے سے تجربہ کریں",
    exploreCollection: "کلیکشن دیکھیں",

    // Footer
    newsletter: "نیوز لیٹر",
    subscribeUpdates: "ہمارے تازہ ترین کلیکشنز اور خصوصی آفرز کے بارے میں اپڈیٹس حاصل کرنے کے لیے سبسکرائب کریں۔",
    subscribe: "سبسکرائب",
    allRightsReserved: "جملہ حقوق محفوظ ہیں۔",

    // Auth
    welcomeBack: "خوش آمدید",
    enterCredentials: "اپنے اکاؤنٹ تک رسائی کے لیے اپنی تفصیلات درج کریں",
    email: "ای میل",
    password: "پاس ورڈ",
    forgotPassword: "پاس ورڈ بھول گئے؟",
    createAccount: "اکاؤنٹ بنائیں",
    joinUs: "خصوصی پاکستانی فیشن کو دریافت کرنے کے لیے ہمارے ساتھ شامل ہوں",
    fullName: "پورا نام",
    confirmPassword: "پاس ورڈ کی تصدیق کریں",

    // Cart & Wishlist
    yourCart: "آپ کی شاپنگ کارٹ",
    yourWishlist: "آپ کی خواہش کی فہرست",
    emptyCart: "آپ کی کارٹ خالی ہے",
    emptyWishlist: "آپ کی خواہش کی فہرست خالی ہے",
    continueShopping: "شاپنگ جاری رکھیں",
    product: "پروڈکٹ",
    total: "کل",
    subtotal: "سب ٹوٹل",
    orderSummary: "آرڈر کا خلاصہ",
    proceedToCheckout: "چیک آؤٹ کریں",

    // Contact
    contactUs: "ہم سے رابطہ کریں",
    contactMessage:
      "ہم آپ سے سننا پسند کریں گے۔ براہ کرم نیچے دیا گیا فارم پُر کریں یا رابطہ کی معلومات کا استعمال کرتے ہوئے ہم سے رابطہ کریں۔",
    yourName: "آپ کا نام",
    emailAddress: "ای میل ایڈریس",
    subject: "موضوع",
    yourMessage: "آپ کا پیغام",
    sendMessage: "پیغام بھیجیں",
    getInTouch: "رابطے میں رہیں",
    ourLocation: "ہماری لوکیشن",
    phoneNumber: "فون نمبر",
    workingHours: "کام کے اوقات",
    followUs: "ہمیں فالو کریں",

    // Misc
    loading: "لوڈ ہو رہا ہے",
    error: "خرابی",
    pageNotFound: "صفحہ نہیں ملا",
    pageNotFoundMessage:
      "جس صفحے کی آپ تلاش کر رہے ہیں وہ ہٹا دیا گیا ہو، اس کا نام تبدیل کیا گیا ہو، یا عارضی طور پر دستیاب نہیں ہے۔",
    returnToHome: "ہوم پر واپس جائیں",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    collections: "المجموعات",
    newArrivals: "وصل حديثاً",
    ourStory: "قصتنا",
    contact: "اتصل بنا",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    myAccount: "حسابي",
    myOrders: "طلباتي",
    logout: "تسجيل الخروج",
    categories: "الفئات",

    // Product related
    addToCart: "أضف إلى السلة",
    addToWishlist: "أضف إلى المفضلة",
    viewDetails: "عرض التفاصيل",
    price: "السعر",
    quantity: "الكمية",
    color: "اللون",
    size: "المقاس",
    details: "التفاصيل",
    shipping: "الشحن",
    returns: "الإرجاع",

    // Home page
    discoverCollection: "اكتشف مجموعتنا",
    exploreSelection:
      "استكشف مجموعتنا المختارة من الأزياء الباكستانية الفاخرة، المصممة للفرد العصري الذي يقدر التقاليد والأناقة.",

    // Welcome page
    luxuryFashion: "أزياء باكستانية فاخرة",
    experienceElegance: "جرب الأناقة التقليدية في بعد جديد",
    exploreCollection: "استكشف المجموعة",

    // Footer
    newsletter: "النشرة الإخبارية",
    subscribeUpdates: "اشترك للحصول على تحديثات حول أحدث مجموعاتنا والعروض الحصرية.",
    subscribe: "اشترك",
    allRightsReserved: "جميع الحقوق محفوظة.",

    // Auth
    welcomeBack: "مرحبًا بعودتك",
    enterCredentials: "أدخل بيانات اعتماد للوصول إلى حسابك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب",
    joinUs: "انضم إلينا لاستكشاف الأزياء الباكستانية الحصرية",
    fullName: "الاسم الكامل",
    confirmPassword: "تأكيد كلمة المرور",

    // Cart & Wishlist
    yourCart: "سلة التسوق الخاصة بك",
    yourWishlist: "قائمة المفضلة",
    emptyCart: "سلة التسوق فارغة",
    emptyWishlist: "قائمة المفضلة فارغة",
    continueShopping: "مواصلة التسوق",
    product: "المنتج",
    total: "المجموع",
    subtotal: "المجموع الفرعي",
    orderSummary: "ملخص الطلب",
    proceedToCheckout: "إتمام الشراء",

    // Contact
    contactUs: "اتصل بنا",
    contactMessage: "نحن نحب أن نسمع منك. يرجى ملء النموذج أدناه أو التواصل معنا باستخدام معلومات الاتصال.",
    yourName: "اسمك",
    emailAddress: "البريد الإلكتروني",
    subject: "الموضوع",
    yourMessage: "رسالتك",
    sendMessage: "إرسال الرسالة",
    getInTouch: "ابق على تواصل",
    ourLocation: "موقعنا",
    phoneNumber: "رقم الهاتف",
    workingHours: "ساعات العمل",
    followUs: "تابعنا",

    // Misc
    loading: "جاري التحميل",
    error: "خطأ",
    pageNotFound: "الصفحة غير موجودة",
    pageNotFoundMessage: "الصفحة التي تبحث عنها قد تمت إزالتها، أو تغير اسمها، أو غير متوفرة مؤقتًا.",
    returnToHome: "العودة إلى الرئيسية",
  },
}

// Language provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")
  const [translations, setTranslations] = useState(translationsData.en)

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    // Update translations when language changes
    setTranslations(translationsData[language] || translationsData.en)

    // Save language preference
    localStorage.setItem("language", language)

    // Set HTML dir attribute for RTL languages
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

    // Add language-specific class to body
    document.body.className = document.body.className.replace(/\blang-\w+\b/g, "").trim() + ` lang-${language}`
  }, [language])

  // Translate a key
  const t = (key) => {
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}

