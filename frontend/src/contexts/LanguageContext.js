"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Define translations
const translations = {
  en: {
    // Navigation
    home: "Home",
    categories: "Categories",
    ourStory: "Our Story",
    contactUs: "Contact Us",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    profile: "Profile",
    orders: "Orders",
    cart: "Cart",
    wishlist: "Wishlist",
    searchPlaceholder: "Search...",

    // Categories
    formalWear: "Formal Wear",
    casualWear: "Casual Wear",
    bridalCollection: "Bridal Collection",
    accessories: "Accessories",
    viewAllCategories: "View All Categories",

    // Product
    addToCart: "Add to Cart",
    addToWishlist: "Add to Wishlist",
    color: "Color",
    size: "Size",
    quantity: "Quantity",
    details: "Details",
    shipping: "Shipping",
    returns: "Returns",

    // Authentication
    welcomeBack: "Welcome Back",
    enterCredentials: "Please enter your credentials to continue",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    createAccount: "Create Account",
    joinUs: "Join us to explore the finest Pakistani fashion",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    loading: "Loading",

    // Footer
    quickLinks: "Quick Links",
    customerService: "Customer Service",
    shippingPolicy: "Shipping Policy",
    returnPolicy: "Return Policy",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    faq: "FAQ",
    stayConnected: "Stay Connected",
    newsletter: "Newsletter",
    subscribeToNewsletter: "Subscribe to our newsletter for updates",
    emailAddress: "Email Address",
    subscribe: "Subscribe",
    allRightsReserved: "All rights reserved.",

    // Misc
    lightMode: "Light Mode",
    darkMode: "Dark Mode",

    // Welcome Scene
    welcomeTitle: "Pakistani Fashion",
    welcomeSubtitle: "Discover Elegance",
    enterStore: "Enter Store",
  },
  ur: {
    // Navigation
    home: "ہوم",
    categories: "زمرہ جات",
    ourStory: "ہماری کہانی",
    contactUs: "رابطہ کریں",
    login: "لاگ ان",
    signup: "سائن اپ",
    logout: "لاگ آؤٹ",
    profile: "پروفائل",
    orders: "آرڈرز",
    cart: "کارٹ",
    wishlist: "مرغوب",
    searchPlaceholder: "تلاش کریں...",

    // Categories
    formalWear: "فارمل لباس",
    casualWear: "کیژول لباس",
    bridalCollection: "دلہن کا لباس",
    accessories: "اسیسریز",
    viewAllCategories: "تمام زمرہ جات دیکھیں",

    // Product
    addToCart: "کارٹ میں شامل کریں",
    addToWishlist: "مرغوب میں شامل کریں",
    color: "رنگ",
    size: "سائز",
    quantity: "مقدار",
    details: "تفصیلات",
    shipping: "شپنگ",
    returns: "واپسی",

    // Authentication
    welcomeBack: "خوش آمدید",
    enterCredentials: "جاری رکھنے کے لیے اپنی تفصیلات درج کریں",
    email: "ای میل",
    password: "پاس ورڈ",
    forgotPassword: "پاس ورڈ بھول گئے؟",
    createAccount: "اکاؤنٹ بنائیں",
    joinUs: "بہترین پاکستانی فیشن کی دنیا میں شامل ہوں",
    fullName: "پورا نام",
    confirmPassword: "پاس ورڈ کی تصدیق کریں",
    loading: "لوڈ ہو رہا ہے",

    // Footer
    quickLinks: "فوری لنکس",
    customerService: "کسٹمر سروس",
    shippingPolicy: "شپنگ پالیسی",
    returnPolicy: "واپسی کی پالیسی",
    privacyPolicy: "رازداری کی پالیسی",
    termsConditions: "شرائط و ضوابط",
    faq: "اکثر پوچھے گئے سوالات",
    stayConnected: "رابطے میں رہیں",
    newsletter: "نیوز لیٹر",
    subscribeToNewsletter: "تازہ ترین معلومات کے لیے ہمارے نیوز لیٹر کو سبسکرائب کریں",
    emailAddress: "ای میل ایڈریس",
    subscribe: "سبسکرائب",
    allRightsReserved: "جملہ حقوق محفوظ ہیں۔",

    // Misc
    lightMode: "لائٹ موڈ",
    darkMode: "ڈارک موڈ",

    // Welcome Scene
    welcomeTitle: "پاکستانی فیشن",
    welcomeSubtitle: "خوبصورتی دریافت کریں",
    enterStore: "سٹور میں داخل ہوں",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    categories: "الفئات",
    ourStory: "قصتنا",
    contactUs: "اتصل بنا",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "تسجيل الخروج",
    profile: "الملف الشخصي",
    orders: "الطلبات",
    cart: "سلة التسوق",
    wishlist: "المفضلة",
    searchPlaceholder: "بحث...",

    // Categories
    formalWear: "ملابس رسمية",
    casualWear: "ملابس عادية",
    bridalCollection: "مجموعة العروس",
    accessories: "إكسسوارات",
    viewAllCategories: "عرض جميع الفئات",

    // Product
    addToCart: "أضف إلى السلة",
    addToWishlist: "أضف إلى المفضلة",
    color: "اللون",
    size: "الحجم",
    quantity: "الكمية",
    details: "التفاصيل",
    shipping: "الشحن",
    returns: "الإرجاع",

    // Authentication
    welcomeBack: "مرحبًا بعودتك",
    enterCredentials: "الرجاء إدخال بيانات الاعتماد الخاصة بك للمتابعة",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب",
    joinUs: "انضم إلينا لاستكشاف أرقى الأزياء الباكستانية",
    fullName: "الاسم الكامل",
    confirmPassword: "تأكيد كلمة المرور",
    loading: "جاري التحميل",

    // Footer
    quickLinks: "روابط سريعة",
    customerService: "خدمة العملاء",
    shippingPolicy: "سياسة الشحن",
    returnPolicy: "سياسة الإرجاع",
    privacyPolicy: "سياسة الخصوصية",
    termsConditions: "الشروط والأحكام",
    faq: "الأسئلة الشائعة",
    stayConnected: "ابق على تواصل",
    newsletter: "النشرة الإخبارية",
    subscribeToNewsletter: "اشترك في نشرتنا الإخبارية للحصول على التحديثات",
    emailAddress: "عنوان البريد الإلكتروني",
    subscribe: "اشترك",
    allRightsReserved: "جميع الحقوق محفوظة.",

    // Misc
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",

    // Welcome Scene
    welcomeTitle: "أزياء باكستانية",
    welcomeSubtitle: "اكتشف الأناقة",
    enterStore: "دخول المتجر",
  },
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    return localStorage.getItem("language") || "en"
  })

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language)

    // Set direction attribute on document body
    document.documentElement.lang = language
    document.body.dir = language === "ar" || language === "ur" ? "rtl" : "ltr"

    // Add language class to body
    document.body.className = document.body.className.replace(/\blang-\w+\b/g, "").trim()
    document.body.classList.add(`lang-${language}`)

    // Add RTL class if needed
    if (language === "ar" || language === "ur") {
      document.body.classList.add("rtl")
    } else {
      document.body.classList.remove("rtl")
    }
  }, [language])

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
    }
  }

  // Function to get translation
  const t = (key) => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        translations: translations[language] || translations.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    console.warn("useLanguage must be used within a LanguageProvider")
    // Return a default object to prevent errors
    return {
      language: "en",
      changeLanguage: () => {},
      t: (key) => key,
      translations: translations.en,
    }
  }
  return context
}

export default LanguageContext

