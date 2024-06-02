"use client";

import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  useTransition,
  useCallback,
} from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader } from "./Loader";
import { saveKey } from "@/app/actions";
import { FaLock } from "react-icons/fa";

const Dialog = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  let [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const userKey = String(formData.get("userKey"));

      if (!userKey) {
        console.error("Missing data");
        toast.error("Missing data");
      } else {
        await saveKey(String(formData.get("userKey")));
        toast.success("API key saved successfully");
        window.location.reload();
      }
    },
    []
  );

  return (
    <>
      <button
        className="gap-3 w-full	text-white p-3 flex items-center justify-between rounded-md transition duration-100 ease hover:bg-[#2A2B32]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[13px] transition-opacity duration-150 ease-in-out delay-100">
          Add your API key
        </span>

        <FaLock className="text-lg w-[20px]" />
      </button>

      {open && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-10 backdrop-blur-md">
          <div
            ref={ref}
            className="px-6 py-10 w-full max-w-[400px] flex flex-col justify-between 
                        items-center gap-7 bg-[#202123] rounded text-white"
          >
            <h1 className="w-full text-2xl font-bold capitalize">
              Save your API key
            </h1>

            <div className="flex flex-col w-full gap-2 inner-section">
              <p className="text-sm">
                Your API key will be securely stored in your browser and no one
                but you will be able to access it.
              </p>
              <p className="text-sm">
                You can get your API Key{" "}
                <Link
                  href="https://platform.openai.com/api-keys"
                  className="font-semibold transition-all hover:underline"
                  target="_blank"
                >
                  here.
                </Link>
              </p>
            </div>

            <form
              onSubmit={(event) => {
                startTransition(() => handleSubmit(event));
              }}
              className="flex flex-col w-full gap-3"
            >
              <input
                type="text"
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                name="userKey"
                className="w-full h-8 border border-solid border-[#4D4D4F] py-1 px-2.5 rounded bg-[#2A2B32] text-xs focus:outline-none focus:border-[#4D4D4F]"
              />

              <button
                className="w-full bg-[#2A2B32] border border-solid border-[#4D4D4F] py-1.5 rounded
                                transition duration-150 ease hover:bg-[#202123] text-sm"
              >
                {isPending ? <Loader height={20} width={20} /> : "Submit key"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
