// src/components/OrderForm.tsx
"use client";

import { useState, useMemo, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  HomeIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

type Lang = "en" | "mr";

interface FormData {
  name: string;
  phone: string;
  street: string;
  landmark: string;
  city: string;
  taluka: string;
  district: string;
  state: string;
  pincode: string;
  qty: number;
  payment: "COD" | "UPI" | "Card" | "Wallet";
  chaiVariant: string;
}

export interface ChaiOption {
  id: string;
  label: string;
  price: number;
  description?: string;
  weight?: string;
}

interface OrderFormProps {
  product: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  weight?: string;
  isOpen: boolean;
  onClose: () => void;
  variants?: ChaiOption[];
  initialVariant?: string;
  initialQty?: number;
}

const getDefaultOptions = (
  product: string,
  price: number,
  weight?: string,
): ChaiOption[] => [
  {
    id: "selected-product",
    label: product,
    price: price,
    description: "Selected Product",
    weight: weight || "500g",
  },
];

const T = {
  en: {
    checkout: "Product Order / उत्पादन ऑर्डर",
    popularProduct: "महाराष्ट्रातील सर्वात लोकप्रिय उत्पादन!",
    orderInstruction: "ऑर्डर करण्यासाठी आपली संपूर्ण माहिती भरा",
    inStock: "In Stock / स्टॉकमध्ये",
    deliveryAddress: "Address / पत्ता",
    paymentMethod: "Payment / पेमेंट",
    orderSummary: "Order Summary / ऑर्डर सारांश",
    productCharges: "Product Charges / उत्पादन शुल्क",
    total: "Total / एकूण",
    placeOrder: "Place Order / ऑर्डर द्या",
    processing: "Processing... / प्रक्रिया...",
    product: "Product / उत्पादन",
    fullName: "Full Name / संपूर्ण नाव",
    mobileNo: "Mobile No / मोबाईल नंबर",
    roadStreet: "Road/Street Name / रस्ता / गल्ली नाव",
    landmark: "Landmark / जवळील ठिकाण",
    cityVillage: "Village/City Name / गावाचे किंवा शहराचे नाव",
    taluka: "Taluka / तालुका",
    district: "District / जिल्हा",
    pincode: "Pincode / पिनकोड",
    nameReq: "Name required / नाव आवश्यक",
    phoneValid: "Valid 10-digit mobile / वैध १० अंकी मोबाइल",
    addrReq: "Address required / पत्ता आवश्यक",
    cityReq: "City required / शहर आवश्यक",
    distReq: "District required / जिल्हा आवश्यक",
    pinValid: "Valid 6-digit pincode / वैध ६ अंकी पिनकोड",
    talukaReq: "Taluka required / तालुका आवश्यक",
  },
  mr: {
    checkout: "उत्पादन ऑर्डर",
    popularProduct: "महाराष्ट्रातील सर्वात लोकप्रिय उत्पादन!",
    orderInstruction: "ऑर्डर करण्यासाठी आपली संपूर्ण माहिती भरा",
    inStock: "स्टॉकमध्ये",
    deliveryAddress: "पत्ता",
    paymentMethod: "पेमेंट",
    orderSummary: "ऑर्डर सारांश",
    productCharges: "उत्पादन शुल्क",
    total: "एकूण",
    placeOrder: "ऑर्डर द्या",
    processing: "प्रक्रिया...",
    product: "उत्पादन",
    fullName: "संपूर्ण नाव",
    mobileNo: "मोबाईल नंबर",
    roadStreet: "रस्ता / गल्ली नाव",
    landmark: "जवळील ठिकाण",
    cityVillage: "गावाचे किंवा शहराचे नाव",
    taluka: "तालुका",
    district: "जिल्हा",
    pincode: "पिनकोड",
    nameReq: "नाव आवश्यक",
    phoneValid: "वैध १० अंकी मोबाइल",
    addrReq: "पत्ता आवश्यक",
    cityReq: "शहर आवश्यक",
    distReq: "जिल्हा आवश्यक",
    pinValid: "वैध ६ अंकी पिनकोड",
    talukaReq: "तालुका आवश्यक",
  },
};

const amber = {
  bg: "bg-orange-600",
};

export default function OrderForm({
  product,
  image,
  price = 250,
  originalPrice,
  weight,
  isOpen,
  onClose,
  variants,
  initialVariant,
  initialQty,
}: OrderFormProps) {
  const variantList = variants ?? getDefaultOptions(product, price, weight);

  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    taluka: "",
    district: "",
    state: "Maharashtra",
    pincode: "",
    qty: initialQty ?? 1,
    payment: "COD",
    chaiVariant: initialVariant ?? variantList[0].id,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [step, setStep] = useState<"addr" | "pay">("addr");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false);

  const selectedProduct =
    variantList.find((c) => c.id === form.chaiVariant) ?? variantList[0];
  const currentPrice = selectedProduct?.price ?? price;

  const breakdown = useMemo(
    () => ({ total: currentPrice * form.qty }),
    [form.qty, currentPrice],
  );

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "qty" ? +value : value }));
    if (errors[name as keyof FormData])
      setErrors((err) => ({ ...err, [name]: undefined }));
  };

  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({
        ...f,
        chaiVariant: initialVariant ?? variantList[0].id,
        qty: initialQty ?? 1,
      }));
      setErrors({});
      setStep("addr");
      setSuccess(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, initialVariant, initialQty, variantList]);

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = t.nameReq;
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = t.phoneValid;
    if (!form.street.trim()) e.street = t.addrReq;
    if (!form.city.trim()) e.city = t.cityReq;
    if (!form.taluka.trim()) e.taluka = t.talukaReq;
    if (!form.district.trim()) e.district = t.distReq;
    if (!/^[1-9]\d{5}$/.test(form.pincode)) e.pincode = t.pinValid;
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return setStep("addr");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("🎉 Order Placed Successfully! We'll contact you within 24 hours.");
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Order submission failed:", error);
      alert("❌ Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    if (loading) return;
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setStep("addr");
      setForm((f) => ({ ...f, qty: 1, chaiVariant: variantList[0].id }));
      setErrors({});
    }, 200);
  };

  const QuantityCounter = () => (
    <div className="flex items-center border rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
      <button
        onClick={() => setForm((f) => ({ ...f, qty: Math.max(1, f.qty - 1) }))}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors text-orange-600 font-bold"
        disabled={form.qty === 1}
        type="button"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-semibold border-x dark:border-gray-600">
        {form.qty}
      </span>
      <button
        onClick={() => setForm((f) => ({ ...f, qty: Math.min(10, f.qty + 1) }))}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors text-orange-600 font-bold"
        disabled={form.qty === 10}
        type="button"
        aria-label="Increase quantity"
      >
        <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );

  const TabBtn = ({
    id,
    Icon,
    label,
  }: {
    id: "addr" | "pay";
    Icon: typeof HomeIcon;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() => setStep(id)}
      className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-1 text-xs font-semibold transition ${
        step === id
          ? `${amber.bg} text-white shadow`
          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
      <span className="truncate">{label}</span>
    </button>
  );

  const ProductCard = () => (
    <div className="space-y-2 sm:space-y-3">
      <div className="text-center bg-gradient-to-r from-orange-100 via-red-100 to-orange-50 dark:from-orange-900/30 dark:to-red-900/20 p-2 sm:p-3 rounded-lg border border-orange-200/50">
        <h3 className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200 mb-1">
          {t.popularProduct}
        </h3>
        <p className="text-xs text-orange-700 dark:text-orange-300 leading-tight">
          {t.orderInstruction}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 sm:p-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-12 h-16 sm:w-16 sm:h-20 flex-shrink-0 bg-gradient-to-br from-orange-100 to-red-100 rounded-md flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={product}
                width={48}
                height={64}
                className="object-contain rounded w-full h-full"
                sizes="(max-width: 640px) 48px, 64px"
              />
            ) : (
              <CubeIcon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">
            <h4 className="font-bold text-xs sm:text-sm text-gray-800 dark:text-white truncate">
              {t.product}
            </h4>
            <div className="text-xs font-semibold text-orange-800 dark:text-orange-200 truncate">
              {product}
            </div>
            {weight && (
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Weight: {weight}
              </div>
            )}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-orange-600">
                ₹{currentPrice.toLocaleString()}
              </span>
              {originalPrice && originalPrice > currentPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                {t.inStock}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <QuantityCounter />
          </div>
        </div>
        <input type="hidden" name="chaiVariant" value={form.chaiVariant} />
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-auto bg-black bg-opacity-60 backdrop-blur-sm px-2 sm:px-4 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-[80px] sm:pb-[100px] md:pb-[120px]"
        >
          <motion.div
            aria-hidden="true"
            className="fixed inset-0"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          />

          {/* Container wrapper for responsive max-width */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10">
                <h2 className="text-sm sm:text-base font-bold text-orange-700 dark:text-orange-300 truncate">
                  {t.checkout}
                </h2>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  {(["en", "mr"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-bold transition ${
                        lang === l
                          ? amber.bg + " text-white shadow"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => setLang(l)}
                    >
                      {l === "en" ? "EN" : "मर"}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    onClick={close}
                    aria-label="Close"
                    disabled={loading}
                  >
                    <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                <ProductCard />

                <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5">
                  <TabBtn id="addr" Icon={HomeIcon} label={t.deliveryAddress} />
                  <TabBtn
                    id="pay"
                    Icon={CreditCardIcon}
                    label={t.paymentMethod}
                  />
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-2 sm:p-3 min-h-[200px] sm:min-h-[220px] overflow-y-auto">
                  {step === "addr" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {[
                        {
                          name: "name",
                          label: t.fullName,
                          required: true,
                          type: "text",
                          span: "sm:col-span-2",
                        },
                        {
                          name: "phone",
                          label: t.mobileNo,
                          required: true,
                          type: "tel",
                          span: "sm:col-span-2",
                        },
                        {
                          name: "street",
                          label: t.roadStreet,
                          required: true,
                          type: "text",
                          span: "sm:col-span-2",
                        },
                        {
                          name: "landmark",
                          label: t.landmark,
                          required: false,
                          type: "text",
                          span: "sm:col-span-2",
                        },
                        {
                          name: "city",
                          label: t.cityVillage,
                          required: true,
                          type: "text",
                          span: "",
                        },
                        {
                          name: "taluka",
                          label: t.taluka,
                          required: true,
                          type: "text",
                          span: "",
                        },
                        {
                          name: "district",
                          label: t.district,
                          required: true,
                          type: "text",
                          span: "",
                        },
                        {
                          name: "pincode",
                          label: t.pincode,
                          required: true,
                          type: "tel",
                          span: "",
                        },
                      ].map(({ name, label, required, type, span }) => (
                        <div key={name} className={span}>
                          <label className="block text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {label}{" "}
                            {required && (
                              <span className="text-red-600">*</span>
                            )}
                          </label>
                          <input
                            name={name}
                            type={type}
                            value={form[name as keyof FormData]}
                            onChange={change}
                            disabled={loading}
                            className={`w-full rounded-md border-2 p-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition disabled:opacity-50 disabled:cursor-not-allowed ${
                              errors[name as keyof FormData]
                                ? "border-red-600 focus:ring-red-600"
                                : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                            }`}
                            required={required}
                            maxLength={
                              name === "pincode"
                                ? 6
                                : name === "phone"
                                  ? 10
                                  : undefined
                            }
                            minLength={name === "phone" ? 10 : undefined}
                            autoComplete={
                              name === "name"
                                ? "name"
                                : name === "phone"
                                  ? "tel"
                                  : name === "street"
                                    ? "street-address"
                                    : name === "city"
                                      ? "address-level2"
                                      : name === "pincode"
                                        ? "postal-code"
                                        : "off"
                            }
                          />
                          {errors[name as keyof FormData] && (
                            <p className="text-red-600 mt-1 text-xs">
                              {errors[name as keyof FormData]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          {
                            id: "COD",
                            label: "Cash On Delivery",
                            shortLabel: "COD",
                            icon: "💰",
                          },
                          {
                            id: "UPI",
                            label: "UPI Payment",
                            shortLabel: "UPI",
                            icon: "📱",
                          },
                          {
                            id: "Card",
                            label: "Debit/Credit Card",
                            shortLabel: "Card",
                            icon: "💳",
                          },
                          {
                            id: "Wallet",
                            label: "Digital Wallets",
                            shortLabel: "Wallet",
                            icon: "👛",
                          },
                        ].map(({ id, label, shortLabel, icon }) => (
                          <label
                            key={id}
                            htmlFor={`payment-${id}`}
                            className={`flex items-center gap-2 p-2 sm:p-3 rounded-md cursor-pointer border-2 transition ${
                              form.payment === id
                                ? "border-orange-600 bg-orange-50 shadow-md"
                                : "border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            <input
                              type="radio"
                              id={`payment-${id}`}
                              name="payment"
                              value={id}
                              checked={form.payment === id}
                              onChange={change}
                              disabled={loading}
                              className="sr-only"
                            />
                            <span className="text-lg flex-shrink-0">
                              {icon}
                            </span>
                            <span className="font-semibold text-xs sm:text-sm">
                              <span className="hidden sm:inline">{label}</span>
                              <span className="sm:hidden">{shortLabel}</span>
                            </span>
                          </label>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 bg-green-100 text-green-700 rounded-md p-2 mt-3">
                        <ShieldCheckIcon className="w-4 h-4" />
                        <span className="text-xs">
                          100% Secure Payment / १००% सुरक्षित पेमेंट
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-2 sm:p-3 space-y-2 sm:space-y-3">
                  <h3 className="text-sm font-bold text-orange-700 dark:text-orange-300">
                    {t.orderSummary}
                  </h3>
                  <div className="flex justify-between items-center py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <span>{t.productCharges}</span>
                    <span className="font-semibold">
                      ₹{(currentPrice * form.qty).toLocaleString()}
                    </span>
                  </div>
                  <hr className="border-gray-300 dark:border-gray-600" />
                  <div className="flex justify-between items-center font-bold text-sm sm:text-base text-orange-700 dark:text-orange-400">
                    <span>{t.total}</span>
                    <span>₹{breakdown.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 sm:py-3 rounded-lg font-bold text-white text-sm transition-all duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${amber.bg} flex items-center justify-center gap-2 min-h-[42px]`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>{t.processing}</span>
                    </>
                  ) : (
                    <span>{t.placeOrder}</span>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
