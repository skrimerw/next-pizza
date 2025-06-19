"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { User, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function ProfileButton() {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex items-center flex-col sm:flex-row gap-1 h-10 px-2 font-semibold bg-accent text-base sm:px-6 sm:py-3 border-none hover:bg-accent/80 sm:rounded-xl"
        >
          <User className="hidden sm:block" size={16} />
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[450px] w-full !rounded-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogClose>
          <X size={16} className="absolute top-3 right-3" />
        </DialogClose>
        {isSignin ? <SignInForm /> : <SignUpForm />}
        <p className="text-center" onClick={() => setIsSignin(!isSignin)}>
          {isSignin ? (
            <>
              Еще нет аккаунта?{" "}
              <span className="hover:text-accent-foreground underline-offset-4 underline cursor-pointer">
                Зарегистрироваться
              </span>
            </>
          ) : (
            <>
              Уже есть аккаунта?{" "}
              <span className="hover:text-accent-foreground underline-offset-4 underline cursor-pointer">
                Войти
              </span>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
}
