"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface FormData {
  name: string;
  phone: string;
  street: string;
  landmark: string;
  city: string;
  taluka: string;
  district: string;
  pincode: string;
  qty: number;
  payment: string;
}

export default function OrderPage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    taluka: "",
    district: "",
    pincode: "",
    qty: 1,
    payment: "Prepaid",
  });
  const [status, setStatus] = useState("");
  const [product, setProduct] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setProduct(searchParams.get("product") || "");
    setImage(searchParams.get("image") || "");
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQty = (delta: number) => {
    setForm((f) => ({ ...f, qty: Math.max(1, Number(f.qty) + delta) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/send-order-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, product, image }),
    });
    if (res.ok) {
      setStatus("Order placed successfully!");
      setForm({
        name: "",
        phone: "",
        street: "",
        landmark: "",
        city: "",
        taluka: "",
        district: "",
        pincode: "",
        qty: 1,
        payment: "Prepaid",
      });
    } else {
      setStatus("Error sending order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/60 py-4">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative max-h-[85vh] overflow-y-auto">
        <h2 className="text-base font-bold text-amber-700 mb-1.5 text-center">
          Place Your Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-1.5">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-1.5 text-sm border border-amber-200 rounded"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Mobile No"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-amber-200 rounded"
          />
          <input
            name="street"
            type="text"
            placeholder="Road/Street Name"
            value={form.street}
            onChange={handleChange}
            className="w-full p-2 border border-amber-200 rounded"
          />
          <input
            name="landmark"
            type="text"
            placeholder="Landmark"
            value={form.landmark}
            onChange={handleChange}
            className="w-full p-2 border border-amber-200 rounded"
          />
          <input
            name="city"
            type="text"
            placeholder="Village/City Name"
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 border border-amber-200 rounded"
          />
          <input
            name="taluka"
            type="text"
            placeholder="Taluka"
            value={form.taluka}
            onChange={handleChange}
            className="w-full p-2 border border-amber-200 rounded"
          />
          <input
            name="district"
            type="text"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            className="w-full p-2 border border-amber-200 rounded"
          />
          <input
            name="pincode"
            type="text"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full p-2 border border-amber-200 rounded"
          />
          <div className="flex items-center gap-2">
            {image && (
              <Image
                src={image}
                alt={product || "Product image"}
                width={48}
                height={48}
                className="w-12 h-12 object-contain rounded"
              />
            )}
            <div>
              <div className="font-medium text-sm text-amber-800">
                {product}
              </div>
              <div className="flex items-center mt-1">
                <button
                  type="button"
                  onClick={() => handleQty(-1)}
                  className="px-1.5 py-0.5 text-sm bg-amber-200 rounded-l"
                >
                  -
                </button>
                <input
                  name="qty"
                  type="number"
                  min="1"
                  value={form.qty}
                  onChange={handleChange}
                  className="w-10 text-center text-sm border-t border-b border-amber-200"
                />
                <button
                  type="button"
                  onClick={() => handleQty(1)}
                  className="px-2 py-1 bg-amber-200 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <label className="flex items-center gap-1 text-sm text-black">
              <input
                type="radio"
                name="payment"
                value="Prepaid"
                checked={form.payment === "Prepaid"}
                onChange={handleChange}
              />{" "}
              Prepaid
            </label>
            <label className="flex items-center gap-1 text-sm text-black">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={form.payment === "COD"}
                onChange={handleChange}
              />{" "}
              Cash on Delivery
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-700 text-white font-medium text-sm py-1.5 rounded hover:bg-amber-800 transition"
          >
            Place Order
          </button>
        </form>
        {status && (
          <div className="mt-1.5 text-center text-xs text-amber-700">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
